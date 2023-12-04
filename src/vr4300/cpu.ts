import fs from 'fs'
import {Memory} from './memory'
import {Elf_decoder, ElfFile, ProgramHeaderEntryType} from './elf_decoder'
import {decode_single_binary_instructions} from './cpu_instructions'
import {
  float32,
  float64, FuncInstr,
  I_Type_Instruction,
  Instruction, int64,
  Lui_Instruction,
  OpInstr,
  R_Type_Instruction, RegimmInstr, Some_Branch_Coprocessor_Instruction,
  Some_Instruction, Some_Regimm_Instruction, Some_Special_Instruction
} from './instruction_types'
import {notExhaustiveSwitch} from "../helpers";


//mode can be set to 32 or 64 bit
//see page 169
export enum BitMode {
  Bit32 = 32,
  Bit64 = 64
}

//TODO double word stuff...
//TODo some instructions have different execution depending on 32 or 64 bit mode and kernel r user mode or supervisor mode

export class Cpu {

  //page 37 provides a list of registers

  mem: Memory = new Memory();
  //TODO 64 bit
  /**
   * 32 general purpose registers (GPRs)
   */
  registers: int64[] = new Array(32).fill(0)
  /**
   * 32 floating point registers (FPRs)
   */
  float_registers: float64[] = new Array(32).fill(0)

  /**
   * program counter
   */
  pc: int64 = 0

  /**
   * integer multiply and divide high-order doubleword result
   */
  reg_hi: int64 = 0
  /**
   * integer multiply and divide low-order doubleword result
   */
  reg_lo: int64 = 0

  /**
   * Load/Link LLBit register
   */
  llbit: number = 0 | 1

  /**
   * ﬂoating-point Implementation/Revision register
   */
  fcr0: float32 = 0
  /**
   * ﬂoating-point Control/Status register
   */
  fcr31: float32 = 0

  //CPU0 is for exception processing and address management

  bitMode: BitMode = BitMode.Bit32

  redoStack: Array<() => void> = []
  undoStack: Array<() => void> = []

  constructor() {
    this.mem.reset()
  }


  public execute_elf(elfFile: ElfFile) {

    //TODO load elf file into memory

    const segmentsToLoad = elfFile.programHeaders.filter(p => p.p_type === ProgramHeaderEntryType.PT_LOAD)

    this.mem.memory = new Uint8Array(0x800000)
    this.mem.view = new DataView(this.mem.memory.buffer)

    //allocate memory for each segment
    for (let i = 0; i < segmentsToLoad.length; i++) {
      const segment = segmentsToLoad[i]

      const segmentStart = segment.p_vaddr
      const segmentSize = segment.p_memsz
      const segmentEnd = segmentStart + segment.p_memsz

      const segmentData = segment.segmentData

      this.mem.memory.set(segmentData, segmentStart)

      const needsPadding = segment.p_filesz > segment.p_memsz

      if (needsPadding) {
        const padding = new Uint8Array(segment.p_memsz - segment.p_filesz) //all 0s
        this.mem.memory.set(padding, segment.p_vaddr + segment.p_filesz)
      }

      //TODO alignment??
      //p_offset mod p_align = p_vaddr mod p_align

    }

    const entry_pc = elfFile.header.e_entry
    console.log(`entry_pc: ${entry_pc.toString(16)}`)

    const totalToExecute = 10

    for (let i = 0; i < totalToExecute; i++) {
      const instr_bytes = this.mem.view.getUint32(i * 4 + entry_pc, elfFile.header._isLittleEndian)
      const instr = decode_single_binary_instructions(instr_bytes)

      if (!instr) {
        throw new Error(`Invalid instruction at ${i * 4 + entry_pc}`)
      }

      console.log(instr.debug_view)
      // console.log()
    }

    for (let i = 0; i < totalToExecute; i++) {
      const instr_bytes = this.mem.view.getUint32(i * 4 + entry_pc, elfFile.header._isLittleEndian)
      const instr = decode_single_binary_instructions(instr_bytes)

      this.execute_instruction(instr)
      console.log()
    }

  }

  //TODO create hierarchical instructions to use switch statement
  private execute_instruction(instr: Some_Instruction) {

    switch (instr.op) {
      case OpInstr.reserved:
        break;
      case OpInstr.special: {
        this.execute_special_instruction(instr)
        break;
      }
      case OpInstr.cache:
        break;
      case OpInstr.regimm: {
        this.execute_regimm_instruction(instr)
        break;
      }
      case OpInstr.beq:
        break;
      case OpInstr.bne:
        break;
      case OpInstr.blez:
        break;
      case OpInstr.bgtz:
        break;
      case OpInstr.beql:
        break;
      case OpInstr.bnel:
        break;
      case OpInstr.blezl:
        break;
      case OpInstr.bgtzl:
        break;
      case OpInstr.addi: {

        const result = this.registers[instr.rs] + instr.immediate << 16

        this.__check_integer_overflow(result)

        this.__set_reg_value(instr.rt, result)
        break;
      }
      case OpInstr.addiu: {

        const result = this.registers[instr.rs] + instr.immediate << 16

        this.__set_reg_value(instr.rt, result)
        break;
      }
      case OpInstr.slti: {

        let result = this.registers[instr.rs] < (instr.immediate << 16) ? 1 : 0

        this.__set_reg_value(instr.rt, result)
        break;
      }
      case OpInstr.sltiu: {

        //make rs, rt unsigned
        const unsigned_rs = this.registers[instr.rs] >>> 0
        const unsigned_rt = this.registers[instr.rt] >>> 0

        let result = unsigned_rs < (instr.immediate << 16) ? 1 : 0

        this.__set_reg_value(instr.rt, result)
        break;
      }
      case OpInstr.andi: {

        let result = this.registers[instr.rs] & instr.immediate << 16

        this.__set_reg_value(instr.rt, result)
        break;
      }
      case OpInstr.ori: {

        let result = this.registers[instr.rs] | instr.immediate << 16

        this.__set_reg_value(instr.rt, result)
        break;
      }
      case OpInstr.xori: {

        let result = this.registers[instr.rs] ^ instr.immediate << 16

        this.__set_reg_value(instr.rt, result)
        break;
      }
      case OpInstr.lui: {

        const result = instr.immediate << 16

        this.__set_reg_value(instr.rt, result)
        break;
      }
      case OpInstr.daddi: {

        const result = this.registers[instr.rs] + instr.immediate << 16

        this.__check_integer_overflow(result)

        this.__set_reg_value(instr.rt, result)
        break;
      }
      case OpInstr.daddiu: {

        const result = this.registers[instr.rs] + instr.immediate << 16

        this.__set_reg_value(instr.rt, result)
        break;
      }
      case OpInstr.ldl: {
        console.log(`TODO is mem big endian??`)

        const virtualAddressByte = this.registers[instr.base] + instr.offset << 16
        const byteColumn = virtualAddressByte % 8

        let result = 0
        for (let i = 0; i < byteColumn; i++) {
          let byte = this.mem.view.getUint8(byteColumn + i)
          result = result | byte << (i * (byteColumn - 8))
        }

        this.__set_reg_value(instr.rt, result)
        break;
      }
      case OpInstr.ldr: {
        console.log(`TODO`)

        const virtualAddressByte = this.registers[instr.base] + instr.offset << 16
        const byteColumn = virtualAddressByte % 8
        const startVirtualAddressDoubleWordBoundary = virtualAddressByte - byteColumn

        let result = 0
        for (let i = 0; i < byteColumn; i++) {
          let byte = this.mem.view.getUint8(startVirtualAddressDoubleWordBoundary + i)
          result = result | byte << (i * 8)
        }

        this.__set_reg_value(instr.rt, result)
        break;
      }
      case OpInstr.lb: {
        console.log(`TODO`)

        const virtualAddressByte = this.registers[instr.base] + instr.offset << 16

        let result = this.mem.view.getInt8(virtualAddressByte)

        this.__set_reg_value(instr.rt, result)
        break;
      }
      case OpInstr.lh: {
        console.log(`TODO`)
        break;
      }
      case OpInstr.lwl:
        break;
      case OpInstr.lw:
        break;
      case OpInstr.lbu: {
        console.log(`TODO`)

        const virtualAddressByte = this.registers[instr.base] + instr.offset << 16

        let result = this.mem.view.getUint8(virtualAddressByte)

        this.__set_reg_value(instr.rt, result)
        break;
      }
      case OpInstr.lhu:
        break;
      case OpInstr.lwr:
        break;
      case OpInstr.lwu:
        break;
      case OpInstr.sb:
        break;
      case OpInstr.sh:
        break;
      case OpInstr.swl:
        break;
      case OpInstr.sw:
        break;
      case OpInstr.sdl:
        break;
      case OpInstr.sdr:
        break;
      case OpInstr.swr:
        break;
      case OpInstr.ll:
        break;
      case OpInstr.lld:
        break;
      case OpInstr.ld: {
        console.log(`TODO fix`)

        const virtualAddressByte = this.registers[instr.base] + instr.offset << 16

        let result = this.mem.view.getInt32(virtualAddressByte)

        this.__set_reg_value(instr.rt, result)
        break;
      }
      case OpInstr.sc:
        break;
      case OpInstr.scd:
        break;
      case OpInstr.sd:
        break;
      case OpInstr.ldc1:
        break;
      case OpInstr.ldc2:
        break;
      case OpInstr.lwc1:
        break;
      case OpInstr.lwc2:
        break;
      case OpInstr.sdc1:
        break;
      case OpInstr.sdc2:
        break;
      case OpInstr.swc1:
        break;
      case OpInstr.swc2:
        break;
      case OpInstr.coprocessor0_func:
        break;
      case OpInstr.coprocessor1_func:
        break;
      case OpInstr.coprocessor2_func:
        break;
      case OpInstr.j:
        break;
      case OpInstr.jal:
        break;
      default:
        notExhaustiveSwitch(instr)
    }

  }


  private execute_special_instruction(instr: Some_Special_Instruction) {

    switch (instr.func) {
      case FuncInstr.add: {

        const result = this.registers[instr.rs] + this.registers[instr.rt]

        this.__check_integer_overflow(result)

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.addu: {
        //page 374
        //The only difference between this instruction and the ADD instruction is that ADDU instruction never causes an integer overflow exception.

        const result = this.registers[instr.rs] + this.registers[instr.rt]

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.and: {

        let result = this.registers[instr.rs] & this.registers[instr.rt]

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.dadd: {
        //doubleword add

        const result = this.registers[instr.rs] + this.registers[instr.rt]

        this.__check_integer_overflow(result)

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.daddu: {
        //page 412
        //The only difference between this instruction and the DADD instruction is that DADDU instruction never causes an integer overflow exception.

        const result = this.registers[instr.rs] + this.registers[instr.rt]

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.ddiv:
        break;
      case FuncInstr.ddivu:
        break;
      case FuncInstr.div:
        break;
      case FuncInstr.divu:
        break;
      case FuncInstr.dmult:
        break;
      case FuncInstr.dmultu:
        break;
      case FuncInstr.dsll: {

        let result = this.registers[instr.rt] << instr.sa

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.dsllv: {

        const lowOrderSixBits = this.registers[instr.rs] & 0b111111

        let result = this.registers[instr.rt] << lowOrderSixBits

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.dsll32: {

        let result = this.registers[instr.rt] << (32 + instr.sa)

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.dsra: {
        let result = this.registers[instr.rt] >> instr.sa

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.dsrav: {

        const lowOrderSixBits = this.registers[instr.rs] & 0b111111

        let result = this.registers[instr.rt] >> lowOrderSixBits

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.dsra32: {

        let result = this.registers[instr.rt] >> (32 + instr.sa)

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.dsrl: {

        let result = this.registers[instr.rt] >>> instr.sa

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.dsrlv: {

        const lowOrderSixBits = this.registers[instr.rs] & 0b111111

        let result = this.registers[instr.rt] >>> lowOrderSixBits

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.dsrl32: {

        let result = this.registers[instr.rt] >>> (32 + instr.sa)

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.dsub: {

        const result = this.registers[instr.rs] - this.registers[instr.rt]

        this.__check_integer_overflow(result)

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.dsubu: {

        const result = this.registers[instr.rs] - this.registers[instr.rt]

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.jalr:
        break;
      case FuncInstr.jr:
        break;
      case FuncInstr.mult:
        break;
      case FuncInstr.multu:
        break;
      case FuncInstr.nor: {

        let result = ~(this.registers[instr.rs] | this.registers[instr.rt])

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.or: {

        let result = this.registers[instr.rs] | this.registers[instr.rt]

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.sll: {

        let result = this.registers[instr.rt] << instr.sa

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.sllv: {

        const lowOrderFiveBits = this.registers[instr.rs] & 0b11111

        let result = this.registers[instr.rt] << lowOrderFiveBits

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.slt: {

        let result = this.registers[instr.rs] < this.registers[instr.rt] ? 1 : 0

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.sltu: {

        //make rs, rt unsigned
        const unsigned_rs = this.registers[instr.rs] >>> 0
        const unsigned_rt = this.registers[instr.rt] >>> 0

        let result = unsigned_rs < unsigned_rt ? 1 : 0

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.sra: {

        let result = this.registers[instr.rt] >> instr.sa

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.srav: {

        const lowOrderFiveBits = this.registers[instr.rs] & 0b11111

        let result = this.registers[instr.rt] >> lowOrderFiveBits

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.srl: {

        let result = this.registers[instr.rt] >>> instr.sa

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.srlv: {

        const lowOrderFiveBits = this.registers[instr.rs] & 0b11111

        let result = this.registers[instr.rt] >>> lowOrderFiveBits

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.sub: {

        const result = this.registers[instr.rs] - this.registers[instr.rt]

        this.__check_integer_overflow(result)

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.subu: {

        const result = this.registers[instr.rs] - this.registers[instr.rt]

        this.__set_reg_value(instr.rd, result)
        break;
      }
      case FuncInstr.sync: {

        //NOP: The SYNC instruction is executed as a NOP on the V R 4300.
        break;
      }
      case FuncInstr.syscall: {
        //TODO syscall
        break;
      }
      case FuncInstr.teq: {
        const isEqual = this.registers[instr.rs] === this.registers[instr.rt]

        //TODO
        break;
      }
      case FuncInstr.tge:
        break;
      case FuncInstr.tgeu:
        break;
      case FuncInstr.tlt:
        break;
      case FuncInstr.tltu:
        break;
      case FuncInstr.tne:
        break;
      case FuncInstr.xor: {

        let result = this.registers[instr.rs] ^ this.registers[instr.rt]

        this.__set_reg_value(instr.rd, result)
        break;
      }
      default:
        notExhaustiveSwitch(instr)
    }

  }

  private execute_regimm_instruction(instr: Some_Regimm_Instruction) {

    switch (instr.subOp) {
      case RegimmInstr.tgei:
        break;
      case RegimmInstr.tgeiu:
        break;
      case RegimmInstr.tlti:
        break;
      case RegimmInstr.tltiu:
        break;
      case RegimmInstr.teqi:
        break;
      case RegimmInstr.tnei:
        break;
      case RegimmInstr.bltz:
        break;
      case RegimmInstr.bgez:
        break;
      case RegimmInstr.bltzl:
        break;
      case RegimmInstr.bgezl:
        break;
      case RegimmInstr.bltzal:
        break;
      case RegimmInstr.bgezal:
        break;
      case RegimmInstr.bltzall:
        break;
      case RegimmInstr.bgezall:
        break;
      default:
        notExhaustiveSwitch(instr)
    }

  }

  //An Integer Overflow exception occurs when an ADD, ADDI, SUB, DADD, DADDI or DSUB instruction results in a 2’s complement overflow. This exception is not maskable.
  // TODO The destination register rd is not modified if an overflow occurs.
  private __check_integer_overflow(result: int64) {

  }

  //TODO maybe ensure 32 bit? |0?
  private __set_reg_value(reg: number, value: int64) {
    let oldVal = this.registers[reg]

    this.registers[reg] = value

    let undo = () => {
      this.registers[reg] = oldVal
    }
    this.undoStack.push(undo)
  }


}

function main() {

  const buffer = fs.readFileSync(`../../mips_examples/main.o2`)

  const elfFile = Elf_decoder.decode(buffer)

  const _debug_info = Elf_decoder._get_elf_dump(elfFile)
  console.log(_debug_info)

  const cpu = new Cpu()
  cpu.execute_elf(elfFile)
}

main()
