import fs from 'fs'
import {Memory} from './memory'
import {Elf_decoder, ElfFile, ProgramHeaderEntryType} from './elf_decoder'
import {decode_single_binary_instructions} from './cpu_instructions'
import {I_Type_Instruction, Instruction, Lui_Instruction, OpInstr, R_Type_Instruction} from './instruction_types'


export enum BitMode {
  Bit32 = 32,
  Bit64 = 64
}


export class Cpu {

  mem: Memory = new Memory();
  registers: number[] = new Array(32).fill(0)

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

    for (let i = 0; i < 10; i++) {
      const instr_bytes = this.mem.view.getUint32(i * 4 + entry_pc, elfFile.header._isLittleEndian)
      const instr = decode_single_binary_instructions(instr_bytes)

      if (!instr) {
        throw new Error(`Invalid instruction at ${i * 4 + entry_pc}`)
      }

      console.log(instr.debug_view)
      console.log()
    }

  }

  //TODO create hierarchical instructions to use switch statement
  private execute_instruction(instr: R_Type_Instruction | I_Type_Instruction | Lui_Instruction) {

    switch (instr.op) {
      case OpInstr.reserved:
        break;
      case OpInstr.special:
        break;
      case OpInstr.regimm:
        break;
      case OpInstr.addi:
        break;
      case OpInstr.addiu:
        break;
      case OpInstr.andi:
        break;
      case OpInstr.beq:
        break;
      case OpInstr.beql:
        break;
      case OpInstr.bgtz:
        break;
      case OpInstr.bgtzl:
        break;
      case OpInstr.blez:
        break;
      case OpInstr.blezl:
        break;
      case OpInstr.bne:
        break;
      case OpInstr.bnel:
        break;
      case OpInstr.cache:
        break;
      case OpInstr.daddi:
        break;
      case OpInstr.daddiu:
        break;
      case OpInstr.j:
        break;
      case OpInstr.jal:
        break;
      case OpInstr.lb:
        break;
      case OpInstr.lbu:
        break;
      case OpInstr.ld:
        break;
      case OpInstr.ldc1:
        break;
      case OpInstr.ldc2:
        break;
      case OpInstr.ldl:
        break;
      case OpInstr.ldr:
        break;
      case OpInstr.lh:
        break;
      case OpInstr.lhu:
        break;
      case OpInstr.ll:
        break;
      case OpInstr.lld:
        break;
      case OpInstr.lui: {

        const _instr = instr as Lui_Instruction
        const immediate = _instr.immediate << 16
        const rt = _instr.rt
        this.registers[rt] = immediate

        break;
      }
      case OpInstr.lw:
        break;
      case OpInstr.lwc1:
        break;
      case OpInstr.lwc2:
        break;
      case OpInstr.lwl:
        break;
      case OpInstr.lwr:
        break;
      case OpInstr.lwu:
        break;
      case OpInstr.ori:
        break;
      case OpInstr.sb:
        break;
      case OpInstr.sc:
        break;
      case OpInstr.scd:
        break;
      case OpInstr.sd:
        break;
      case OpInstr.sdc1:
        break;
      case OpInstr.sdc2:
        break;
      case OpInstr.sdl:
        break;
      case OpInstr.sdr:
        break;
      case OpInstr.sh:
        break;
      case OpInstr.slti:
        break;
      case OpInstr.sltiu:
        break;
      case OpInstr.swl:
        break;
      case OpInstr.sw:
        break;
      case OpInstr.swr:
        break;
      case OpInstr.swc1:
        break;
      case OpInstr.swc2:
        break;
      case OpInstr.xori:
        break;
      case OpInstr.coprocessor0_func:
        break;
      case OpInstr.coprocessor1_func:
        break;
      case OpInstr.coprocessor2_func:
        break;

    }

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
