type int32 = number
type int64 = number
type float = number
type float64 = number

type int26 = number // 26 bits
type int16 = number // 16 bits
type int6 = number // 6 bits
type int5 = number // 5 bits


type Instruction = {
  opcode: int32,
}


/**
 * immediate
 */
type I_Type_Instruction = {
  original: int32
  op: int6
  _op: OpInstr //debug
  rs: int5
  rt: int5
  immediate: int16
}


type I_Type_Offset_Instruction = {
  original: int32
  op: int6
  _op: OpInstr //debug
  base: int5
  rt: int5
  offset: int16
}

type I_Type_Branch_Instruction = {
  original: int32
  op: int6
  _op: OpInstr //debug
  rs: int5
  rt: int5
  offset: int16
}


type I_Type_Regimm_Immediate_Instruction = {
  original: int32
  op: int6 //000001
  _op: OpInstr //debug
  rs: int5
  subOp: int5
  _subOp: RegimmInstr
  immediate: int16
}
type I_Type_Regimm_Offset_Instruction = {
  original: int32
  op: int6 //000001
  _op: OpInstr //debug
  rs: int5
  subOp: int5
  _subOp: RegimmInstr
  offset: int16
}

/**
 * register
 */
type R_Type_Instruction = {
  original: int32
  op: int6
  _op: OpInstr //debug
  rs: int5
  rt: int5
  rd: int5
  sa: int5
  func: int6
  _func: FuncInstr //debug
}


/**
 * jump
 */
type J_Type_Instruction = {
  original: int32
  op: int6
  _op: OpInstr //debug
  target: int26
}


/**
 * operations encoded in the first 6 bits (opcode)
 */
enum OpInstr {
  special,
  addi,
  addiu,

  andi,

  beq,
  beql,
  bgtz,
  bgtzl,
  blez,
  blezl,
  bne,
  bnel,

  daddi,
  daddiu,
  j,
  jal,
  lb,
  lbu,
  ld,
  ldcz,
  ldl,
  ldr,
  lh,
  lhu,
  ll,
  lld,
  lui,
  lw,
  lwcz,
  lwl,
  lwr,
  lwu,

  ori,
  sb,
  sc,
  scd,
  sd,
  sdcz,
  sdl,
  sdr,
  sh,
  slti,
  sltiu,
  swl,
  sw,
  swr,
  swcz,

  regimm,

  xori,
}

/**
 * operations encoded in the last 6 bits (funct)
 */
enum FuncInstr {
  add,
  addu,
  and,
  dadd,
  daddu,
  ddiv,
  ddivu,
  div,
  divu,
  dmult,
  dsll,
  dsllv,
  dsll32,
  dsra,
  dsrav,
  dsra32,
  dsrl,
  dsrlv,
  dsrl32,
  dsub,
  dsubu,
  jalr,
  jr,

  mult,
  multu,
  nor,
  or,

  sll,
  sllv,
  slt,
  sltu,
  sra,
  srav,
  srl,
  srlv,
  sub,
  subu,
  sync,
  syscall,
  teq,
  tge,
  tgeu,
  tlt,
  tltu,
  tne,
  xor,
}


enum RegimmInstr {
  bltz,
  bgez,
  bltzl,
  bgezl,
  bltzal,
  bgezal,
  bltzall,
  bgezall,

  tgei,
  tgeiu,
  tlti,
  tltiu,
  tnei,
  teqi,
}

/**
 * ADD rd, rs, rt
 *
 * @description The contents of general purpose register rs and the contents of general purpose
 * register rt are added to store the result in general purpose register rd. In 64-bit
 * mode, the operands must be sign-extended, 32-bit values.
 *
 * @exception Integer overflow exception - An integer overflow exception occurs if the carries out of bits 30 and 31 differ (2’s
 * complement overflow). The contents of destination register rd is not modified
 * when an integer overflow exception occurs.
 */
const add_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * ADDI rt, rs, immediate
 *
 * @description The 16-bit immediate is sign-extended and added to the contents of general
 * purpose register rs to store the result in general purpose register rt. In 64-bit
 * mode, the operand must be sign-extended, 32-bit values
 *
 * @exception Integer overflow exception - An integer overflow exception occurs if carries out of bits 30 and 31 differ (2’s
 * complement overflow). The contents of destination register rt is not modified
 * when an integer overflow exception occurs.
 */
const addi_instr: Instruction = {
  opcode: 0b001000,
}

/**
 * ADDIU rt, rs, immediate
 *
 * @description The 16-bit immediate is sign-extended and added to the contents of general
 * purpose register rs to store the result in general purpose register rt. No integer
 * overflow exception occurs under any circumstance. In 64-bit mode, the operand
 * must be sign-extended, 32-bit values.
 *
 * The only difference between this instruction and the ADDI instruction is that
 * ADDIU instruction never causes an integer overflow exception
 */
const addiu_instr: Instruction = {
  opcode: 0b001001,
}

/**
 * ADDU rd, rs, rt
 *
 * @description The contents of general purpose register rs and the contents of general purpose
 * register rt are added to store the result in general purpose register rd. No integer
 * overflow exception occurs under any circumstance. In 64-bit mode, the operands
 * must be sign-extended, 32-bit values.
 *
 * The only difference between this instruction and the ADD instruction is that
 * ADDU instruction never causes an integer overflow exception
 */
const addu_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * AND rd, rs, rt
 *
 * @description The contents of general purpose register rs are combined with the contents of
 * general purpose register rt in a bit-wise logical AND operation. The result is
 * stored in general purpose register rd.
 */
const and_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * ANDI rt, rs, immediate
 *
 * @description The 16-bit immediate is zero-extended and combined with the contents of general
 * purpose register rs in a bit-wise logical AND operation. The result is stored in
 * general purpose register rt.
 */
const andi_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BCzF offset - Branch On Coprocessor z False
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended. If CPz’s
 * condition signal (CpCond), as sampled during the previous instruction execution,
 * is false, then the program branches to the branch address with a delay of one
 * instruction.
 *
 * Because the condition signal is sampled during the previous instruction execution,
 * there must be at least one instruction between this instruction and a coprocessor
 * instruction that changes the condition signal.
 */
const bczf_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BCzFL offset - Branch On Coprocessor z False Likely
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended. If the
 * CPz’s condition signal (CpCond), as sampled during the previous instruction
 * execution, is false, the program branches to the branch address with a delay of one
 * instruction
 *
 * If it does not branch, the instruction in the branch delay slot is discarded.
 *
 * Because the condition signal is sampled during the previous instruction execution,
 * there must be at least one instruction between this instruction and a coprocessor
 * instruction that changes the condition signal.
 */
const bczfl_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BCzT offset - Branch On Coprocessor z True
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended. If the
 * CPz’s condition signal (CpCond) sampled during the previous instruction
 * execution is true, then the program branches to the branch address with a delay of
 * one instruction.
 *
 * Because the condition signal is sampled during the previous instruction execution,
 * there must be at least one instruction between this instruction and a coprocessor
 * instruction that changes the condition signal.
 */
const bczt_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BCzTL offset -  Branch On Coprocessor z True Likely
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended. If the
 * CPz’s condition signal (CpCond), as sampled during the previous instruction
 * execution, is true, the program branches to the branch address with a delay of one
 * instruction.
 *
 * If it does not branch, the instruction in the branch delay slot is discarded.
 *
 * Because the condition signal is sampled during the previous instruction execution,
 * there must be at least one instruction between this instruction and a coprocessor
 * instruction that changes the condition signal.
 */
const bcztl_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BEQ rs, rt, offset - Branch On Equal
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended. The
 * contents of general purpose register rs and the contents of general purpose register
 * rt are compared. If the two registers are equal, then the program branches to the
 * branch address with a delay of one instruction.
 */
const beq_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * BEQL rs, rt, offset - Branch On Equal Likely
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended. The
 * contents of general purpose register rs and the contents of general purpose register
 * rt are compared. If the two registers are equal, the program branches to the branch
 * address with a delay of one instruction.
 *
 * If it does not branch, the instruction in the branch delay slot is discarded.
 */
const beql_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BGEZ rs, offset - Branch On Greater Than Or Equal To Zero
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended. If the
 * contents of general purpose register rs are equal to or larger than 0, then the
 * program branches to the branch address with a delay of one instruction.
 */
const bgez_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BGEZAL rs, offset - Branch On Greater Than Or Equal To Zero And Link
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended.
 * Unconditionally, the address of the instruction next to the delay slot is stored in
 * the link register, r31. If the contents of general purpose register rs are equal to or
 * larger than 0, then the program branches to the branch address, with a delay of one
 * instruction.
 *
 * Generally, general purpose register r31 should not be specified as general purpose
 * register rs, because the contents of rs are destroyed by storing link address, and
 * then it may not be reexecutable. An attempt to execute this instruction does not
 * cause exception, however.
 */
const bgezal_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BGEZALL rs, offset - Branch On Greater Than Or Equal To Zero And Link Likely
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended.
 * Unconditionally, the address of the instruction next to the delay slot is stored in
 * the link register, r31. If the contents of general purpose register rs are equal to or
 * larger than 0, then the program branches to the branch address, with a delay of one
 * instruction. When it does not branch, instruction in the delay slot are discarded.
 * Generally, general purpose register r31 should not be specified as general purpose
 * register rs, because the contents of rs are destroyed by storing link address, and
 * then it may not be reexecutable. An attempt to execute this instruction does not
 * cause any exception, however.
 */
const bgezall_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BGEZL rs, offset - Branch On Greater Than Or Equal To Zero Likely
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended. If the
 * contents of general purpose register rs are equal to or larger than 0, then the
 * program branches to the branch address, with a delay of one instruction.
 *
 * If it does not branch, the instruction in the branch delay slot is discarded.
 */
const bgezl_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BGTZ rs, offset  - Branch On Greater Than Zero
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended. The
 * contents of general purpose register rs are larger than zero, then the program
 * branches to the branch address, with a delay of one instruction.
 */
const bgtz_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BGTZL rs, offset - Branch On Greater Than Zero Likely
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended. The
 * contents of general purpose register rs are larger than 0, then the program branches
 * to the branch address, with a delay of one instruction.
 *
 * If it does not branch, the instruction in the branch delay slot is discarded.
 */
const bgtzl_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BLEZ rs, offset - Branch On Less Than Or Equal To Zero
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended. If the
 * contents of general purpose register rs are equal to 0 or smaller than 0, then the
 * program branches to the branch address, with a delay of one instruction.
 */
const blez_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BLEZL rs, offset - Branch On Less Than Or Equal To Zero Likely
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended. The
 * contents of general purpose register rs is equal to or smaller than zero, then the
 * program branches to the branch address, with a delay of one instruction.
 *
 * If it does not branch, the instruction in the branch delay slot is discarded.
 */
const blezl_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BLTZ rs, offset - Branch On Less Than Zero
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended. If the
 * contents of general purpose register rs are smaller than 0, then the program
 * branches to the branch address, with a delay of one instruction.
 */
const bltz_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BLTZAL rs, offset - Branch On Less Than Zero And Link
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended.
 * Unconditionally, the address of the instruction next to the delay slot is stored in
 * the link register, r31. If the contents of general purpose register rs are smaller than
 * 0, then the program branches to the branch address, with a delay of one
 * instruction.
 *
 * Generally, general purpose register r31 should not be specified as general purpose
 * register rs, because the contents of rs are destroyed by storing link address, and
 * then it is not reexecutable. An attempt to execute this instruction does not
 * generate exceptions, however.
 */
const bltzal_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BLTZALL rs, offset - Branch On Less Than Zero And Link Likely
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended.
 * Unconditionally, the instruction next to the delay slot is stored in the link register,
 * r31. If the contents of general purpose register rs is smaller than 0, then the
 * program branches to the branch address, with a delay of one instruction.
 * If it does not branch, the instruction in the branch delay slot is discarded.
 * Generally, general purpose register r31 should not be specified as general purpose
 * register rs, because the contents of rs are destroyed by storing link address, and
 * then it is not reexecutable. An attempt to execute this instruction does not cause
 * exception, however.
 */
const bltzall_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BLTZL rs, offset - Branch On Less Than Zero Likely
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended.
 * Unconditionally, the instruction next to the delay slot is stored in the link register,
 * r31. If the contents of general purpose register rs are smaller than 0, then the
 * program branches to the branch address, with a delay of one instruction.
 *
 * If it does not branch, the instruction in the branch delay slot is discarded.
 */
const bltzl_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BNE rs, rt, offset - Branch On Not Equal
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended. The
 * contents of general purpose register rs and the contents of general purpose register
 * rt are compared. If the two registers are not equal, then the program branches to
 * the branch address, with a delay of one instruction.
 */
const bne_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BNEL rs, rt, offset - Branch On Not Equal Likely
 *
 * @description A branch address is calculated from the sum of the address of the instruction in the
 * delay slot and the 16-bit offset, shifted two bits left and sign-extended. The
 * contents of general purpose register rs and the contents of general purpose register
 * rt are compared. If the two registers are not equal, then the program branches to
 * the branch address, with a delay of one instruction.
 *
 * If it does not branch, the instruction in the branch delay slot is discarded.
 */
const bnel_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * BREAK - Breakpoint
 *
 * @description A breakpoint exception occurs after execution of this instruction, transferring
 * control to the exception handler.
 *
 * The code area is available for use to transfer parameters to the exception handler,
 * the parameter is retrieved by the exception handler only by loading the contents
 * of the memory word containing the instruction as data.
 */
const break_instr: Instruction = {
  opcode: 0b000000,
}


/**
 * CACHE op, offset(base) - Cache Operation
 * TLDR ???
 */
const cache_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * CFCz rt, rd - Move Control From Coprocessor z
 *
 * @description The contents of coprocessor control register rd of CPz are loaded to general
 * purpose register rt.
 *
 * This instruction is not valid for CP0
 *
 * @exception Coprocessor unusable exception
 */
const cfcz_instr: Instruction = {
  opcode: 0b000000,
}


/**
 * COPz cofun - Coprocessor z Operation
 *
 * @description A coprocessor operation is performed. The operation may specify and reference
 * internal coprocessor registers, and may change the state of the coprocessor
 * condition line, but does not modify state within the processor or the cache/main
 * memory. For details of coprocessor operations, refer to Chapter 17 FPU
 * Instruction Set Details.
 *
 * @exception Coprocessor unusable exception
 * @exception Floating-point exception (CP1 only)
 */
const copz_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * CTCz rt, rd - Move Control To Coprocessor z
 *
 * @description The contents of general purpose register rt are loaded into coprocessor control
 * register rd of CPz. This instruction is not valid for CP0.
 *
 * @exception Coprocessor unusable exception
 */
const ctcz_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * DADD rd, rs, rt - Doubleword Add
 *
 * @description The contents of general purpose register rs and the contents of general purpose
 * register rt are added, and the result is stored in general purpose register rd. An
 * integer overflow exception occurs if the carries out of bits 62 and 63 differ (2’s
 * complement overflow). The contents of the destination register rd are not
 * modified when an integer overflow exception occurs.
 *
 * This operation is only defined for the VR4300 operating in 64-bit mode and in 32-
 * bit Kernel mode. Execution of this instruction in 32-bit User or Supervisor mode
 * causes a reserved instruction exception.
 *
 * Same operation in the 32-bit Kernel mode.
 *
 * @exception Integer overflow exception
 * @exception Reserved instruction exception (VR4300 in 32-bit User or Supervisor mode)
 */
const dadd_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * DADDI rt, rs, immediate - Doubleword Add Immediate
 *
 * @description The 16-bit immediate is sign-extended and added to the contents of general
 * purpose register rs, and the result is stored in general purpose register rt. An
 * integer overflow exception occurs if carries out of bits 62 and 63 differ (2’s
 * complement overflow). The contents of the destination register rt are not
 * modified when an integer overflow exception occurs.
 *
 * This operation is only defined for the VR4300 operating in 64-bit mode and in 32-
 * bit Kernel mode. Execution of this instruction in 32-bit User or Supervisor mode
 * causes a reserved instruction exception.
 *
 * Same operation in the 32-bit Kernel mode.
 *
 * @exception Integer overflow exception
 * @exception Reserved instruction exception (VR4300 in 32-bit User or Supervisor mode)
 */
const daddi_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * DADDIU rt, rs, immediate - Doubleword Add Immediate Unsigned
 *
 * @description The 16-bit immediate is sign-extended and added to the contents of general
 * purpose register rs, and the result is stored in general purpose register rt.
 *
 * This operation is only defined for the VR4300 operating in 64-bit mode and in 32-
 * bit Kernel mode. Execution of this instruction in 32-bit User or Supervisor mode
 * causes a reserved instruction exception.
 *
 * The only difference between this instruction and the DADDI instruction is that
 * DADDIU instruction never causes an integer overflow exception.
 *
 * Same operation in the 32-bit Kernel mode.
 *
 * @exception Reserved instruction exception (VR4300 in 32-bit User or Supervisor mode)
 */
const daddiu_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * DADDU rd, rs, rt - Doubleword Add Unsigned
 *
 * @description The contents of general purpose register rs and the contents of general purpose
 * register rt are added, and the result is stored in general purpose register rd.
 *
 * This operation is only defined for the VR4300 operating in 64-bit mode and in 32-
 * bit Kernel mode. Execution of this instruction in 32-bit User or Supervisor mode
 * causes a reserved instruction exception.
 *
 * The only difference between this instruction and the DADD instruction is that
 * DADDU instruction never causes an integer overflow exception.
 *
 * Same operation in the 32-bit Kernel mode.
 *
 * @exception Reserved instruction exception (VR4300 in 32-bit User or Supervisor mode)
 */
const daddu_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * DDIV rs, rt - Doubleword Divide
 */
const ddiv_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * DDIVU rs, rt - Doubleword Divide Unsigned
 */
const ddivu_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * DIV rs, rt - Divide
 */
const div_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * DIVU rs, rt - Divide Unsigned
 */
const divu_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * DMFC0 rt, rd - Doubleword Move From System Control Coprocessor
 */
const dmfc0_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * DMTC0 rt, rd - Doubleword Move To System Control Coprocessor
 */
const dmtc0_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * DMULT rs, rt - Doubleword Multiply
 */
const dmult_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * DMULTU rs, rt - Doubleword Multiply Unsigned
 */
const dmultu_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * DSLL rd, rt, sa - Doubleword Shift Left Logical
 */
const dsll_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * DSLLV rd, rt, rs - Doubleword Shift Left Logical Variable
 */
const dsllv_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * DSLL32 rd, rt, sa - Doubleword Shift Left Logical + 32
 */
const dsll32_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * DSRA rd, rt, sa - Doubleword Shift Right Arithmetic
 */
const dsra_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * DSRAV rd, rt, rs - Doubleword Shift Right Arithmetic Variable
 */
const dsrav_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * DSRA32 rd, rt, sa - Doubleword Shift Right Arithmetic + 32
 */
const dsra32_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * DSRL rd, rt, sa - Doubleword Shift Right Logical
 */
const dsrl_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * DSRLV rd, rt, rs - Doubleword Shift Right Logical Variable
 */
const dsrlv_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * DSRL32 rd, rt, sa - Doubleword Shift Right Logical + 32
 */
const dsrl32_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * DSUB rd, rs, rt - Doubleword Subtract
 */
const dsub_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * DSUBU rd, rs, rt - Doubleword Subtract Unsigned
 */
const dsubu_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * ERET - Return From Exception
 */
const eret_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * J target - Jump
 */
const j_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * JAL target - Jump And Link
 */
const jal_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * JALR rs
 * JALR rd, rs - Jump And Link Register
 */
const jalr_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * JR rs - Jump Register
 */
const jr_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * LB rt, offset(base) - Load Byte
 */
const lb_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * LBU rt, offset(base) - Load Byte Unsigned
 */
const lbu_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * LD rt, offset(base) - Load Doubleword
 */
const ld_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * LDCz rt, offset(base) - Load Doubleword To Coprocessor z
 */
const ldcz_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * LDL rt, offset(base) - Load Doubleword Left
 */
const ldl_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * LDR rt, offset(base) - Load Doubleword Right
 */
const ldr_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * LH rt, offset(base) - Load Halfword
 */
const lh_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * LHU rt, offset(base) - Load Halfword Unsigned
 */
const lhu_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * LL rt, offset(base) - Load Linked
 */
const ll_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * LLD rt, offset(base) - Load Linked Doubleword
 */
const lld_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * LUI rt, immediate - Load Upper Immediate
 */
const lui_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * LW rt, offset(base) - Load Word
 */
const lw_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * LWCz rt, offset(base)  - Load Word To Coprocessor z
 */
const lwcz_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * LWL rt, offset(base) - Load Word Left
 */
const lwl_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * LWR rt, offset(base) - Load Word Right
 */
const lwr_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * LWU rt, offset(base) - Load Word Unsigned
 */
const lwu_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * MFC0 rt, rd - Move From System Control Coprocessor
 */
const mfc0_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * MFCz rt, rd - Move From Coprocessor z
 */
const mfcz_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * MFHI rd - Move From HI
 */
const mfhi_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * MFLO rd - Move From LO
 */
const mflo_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * MTC0 rt, rd - Move To System Control Coprocessor
 */
const mtc0_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * MTCz rt, rd - Move To Coprocessor z
 */
const mtcz_instr: Instruction = {
  opcode: 0b000000,
}

/**
 * MTHI rs - Move To HI
 */
const mthi_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * MTLO rs - Move To LO
 */
const mtl0_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * MULT rs, rt - Multiply
 */
const mult_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * MULTU rs, rt - Multiply Unsigned
 */
const multu_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * NOR rd, rs, rt - Nor
 */
const nor_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * OR rd, rs, rt - Or
 */
const or_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * ORI rt, rs, immediate - Or Immediate
 */
const ori_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SB rt, offset(base) - Store Byte
 */
const sb_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SC rt, offset(base) - Store Conditional
 */
const sc_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SCD rt, offset(base) - Store Conditional Doubleword
 */
const scd_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SD rt, offset(base) - Store Doubleword
 */
const sd_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SDCz rt, offset(base) - Store Doubleword From Coprocessor z
 */
const sdcz_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SDL rt, offset(base) - Store Doubleword Left
 */
const sdl_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SDR rt, offset(base) - Store Doubleword Right
 */
const sdr_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SH rt, offset(base) - Store Halfword
 */
const sh_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SLL rd, rt, sa - Shift Left Logical
 */
const sll_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SLLV rd, rt, rs - Shift Left Logical Variable
 */
const sllv_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SLT rd, rs, rt - Set On Less Than
 */
const slt_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SLTI rt, rs, immediate - Set On Less Than Immediate
 */
const slti_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SLTIU rt, rs, immediate - Set On Less Than Immediate Unsigned
 */
const sltiu_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SLTU rd, rs, rt - Set On Less Than Unsigned
 */
const sltu_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SRA rd, rt, sa - Shift Right Arithmetic
 */
const sra_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SRAV rd, rt, rs - Shift Right Arithmetic Variable
 */
const srav_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SRL rd, rt, sa - Shift Right Logical
 */
const srl_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SRLV rd, rt, rs - Shift Right Logical Variable
 */
const srlv_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SUB rd, rs, rt - Subtract
 */
const sub_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SUBU rd, rs, rt - Subtract Unsigned
 */
const subu_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SW rt, offset(base) - Store Word
 */
const sw_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SWCz rt, offset(base) - Store Word From Coprocessor z
 */
const swcz_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SWL rt, offset(base) - Store Word Left
 */
const swl_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SWR rt, offset(base) - Store Word Right
 */
const swr_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SYNC - Synchronize
 */
const sync_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * SYSCALL - System Call
 */
const syscall_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * TEQ rs, rt - Trap If Equal
 */
const teq_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * TEQI rs, immediate - Trap If Equal Immediate
 */
const teqi_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * TGE rs, rt - Trap If Greater Than Or Equal
 */
const tge_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * TGEI rs, immediate - Trap If Greater Than Or Equal Immediate
 */
const tgei_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * TGEIU rs, immediate - Trap If Greater Than Or Equal Immediate Unsigned
 */
const tgeiu_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * TLBP - Probe TLB For Matching Entry
 */
const tlbp_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * TLBWI - Write Indexed TLB Entry
 */
const tlbwi_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * TLBWR - Write Random TLB Entry
 */
const tlbwr_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * TLT rs, rt - Trap If Less Than
 */
const tlt_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * TLTI rs, immediate - Trap If Less Than Immediate
 */
const tlti_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * TLTIU rs, immediate - Trap If Less Than Immediate Unsigned
 */
const tltiu_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * TLTU rs, rt - Trap If Less Than Unsigned
 */
const tltu_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * TNE rs, rt - Trap If Not Equal
 */
const tne_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * TNEI rs, immediate - Trap If Not Equal Immediate
 */
const tnei_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * XOR rd, rs, r - Exclusive Or
 */
const xor_instr: Instruction = {
  opcode: 0b000000,
}
/**
 * XORI rt, rs, immediate - Exclusive Or Immediate
 */
const xori_instr: Instruction = {
  opcode: 0b000000,
}


function decode_single_binary_instructions(instr_line: int32) {

  //all instructions are 32 bits long

  // I-Type (Immediate)
  //format: opcode, rs, rt, immediate

  //J-Type (Jump)
  //format: opcode, target

  //R-Type (Register)
  //format: opcode, rs, rt, rd, sa, function

  //op code has 6 bits
  const opcode = instr_line >> 26;


  //all branch & with offset or coprocoessor instructions


  //TODO BCzF...CTCz

  //TODO DMFC0..DMTC0
  //TODO ERET
  // TODO MFC0 MTLO
  //TODO TLBP..TLBWR
  //TODO see page 545 * -> reserved instructions exceptions




  //see page 544 for table of all instructions
  switch (opcode) {
    case 0b000000: {
      //R-Type (ADD, ADDU, AND, BREAK, DIV, DIVU, JALR, JR, MFHI, MFLO, MTHI, MTLO, MULT, MULTU, NOR, OR, SLL, SLLV, SLT, SLTU, SRA, SRAV, SRL, SRLV, SUB, SUBU, SYSCALL, XOR)
      const instr = _decode_single_r_type_instr(instr_line)
      return instr
    }
    case 0b000001: {
      //REGIMM
      const instr = _decode_single_i_type_regimm_instr(instr_line)
      return instr
    }
    case 0b000010: //J
    case 0b000011: //JAL
    {
      const instr = _decode_single_j_type_instr(instr_line)
      return instr
    }
    case 0b000100://BEQ
    case 0b000101: //BNE
    case 0b000110: //BLEZ
    case 0b000111: //BGTZ
    {
      const instr = _decode_single_i_type_branch_instr(instr_line)
      return instr
    }
    case 0b001000: //ADDI
    case 0b001001: //ADDIU
    case 0b001010: //SLTI
    case 0b001011: //SLTIU
    case 0b001100: //ANDI
    case 0b001101: //ORI
    case 0b001110: //XORI
    case 0b001111: //LUI
    {
      const instr = _decode_single_i_type_instr(instr_line)
      return instr
    }
    //--- TODO COP01..COP2
    case 0b010100: //BEQL
    case 0b010101: //BNEL
    case 0b010110: //BLEZL
    case 0b010111: //BGTZL
    {
      const instr = _decode_single_i_type_branch_instr(instr_line)
      return instr
    }
    case 0b011000: //DADDI
    case 0b011001: //DADDIU
    {
      const instr = _decode_single_i_type_instr(instr_line)
      return instr
    }
    case 0b011010: //LDL
    case 0b011011: //LDR
    case 0b100000: //LB
    case 0b100001: //LH
    case 0b100010: //LWL
    case 0b100011: //LW
    case 0b100100: //LBU
    case 0b100101: //LHU
    case 0b100110: //LWR
    case 0b100111: //LWU
    case 0b101000: //SB
    case 0b101001: //SH
    case 0b101010: //SWL
    case 0b101100: //SW
    case 0b101101: //SDL
    case 0b101110: //SWR
      //TODO CACHE
    case 0b110000: //LL
    case 0b110001: //LWC1
    case 0b110010: //LWC2
    case 0b110100: //LLD
    case 0b110101: //LDC1
    case 0b110110: //LDC2
    case 0b110111: //LD
    case 0b111000: //SC
    case 0b111001: //SWC1
    case 0b111010: //SWC2
    case 0b111100: //SCD
    case 0b111101: //SDC1
    case 0b111110: //SDC2
    case 0b111111: //SD
    {
      const instr = _decode_single_i_type_offset_instr(instr_line)
      return instr
    }

  }


}

function _decode_single_r_type_instr(instr: int32): R_Type_Instruction {

  //R-Type (ADD, ADDU, AND, ...)

  const opcode = 0b000000; //6 bits, 31-26

  //last 6 bits are function (e.g. ADD)
  const func = instr & 0b111111;

  const rs = (instr >> 21) & 0b11111; //5 bits, 25-21
  const rt = (instr >> 16) & 0b11111; //5 bits, 20-16
  const rd = (instr >> 11) & 0b11111; //5 bits, 15-11
  const sa = (instr >> 6) & 0b11111; //5 bits, 10-6

  //TODO sort like in the manual

  switch (func) {
    case 0b100000: {
      //ADD
      const add_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa,
        func,
        _func: FuncInstr.add,
      }
      return add_instr
    }
    case 0b100001: {
      //ADDU
      const addu_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa,
        func,
        _func: FuncInstr.addu,
      }
      return addu_instr
    }
    case 0b100100: {
      //AND
      const and_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa,
        func,
        _func: FuncInstr.and,
      }
      return and_instr
    }
    case 0b101100: {
      //DADD
      const dadd_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa,
        func,
        _func: FuncInstr.dadd,
      }
      return dadd_instr
    }
    case 0b101101: {
      //DADDU
      const daddu_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa,
        func,
        _func: FuncInstr.daddu,
      }
      return daddu_instr
    }
    case 0b011110: {
      //DDIV
      const ddiv_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa,
        func,
        _func: FuncInstr.ddiv,
      }
      return ddiv_instr
    }
    case 0b011111: {
      //DDIVU
      const ddivu_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa,
        func,
        _func: FuncInstr.ddiv,
      }
      return ddivu_instr
    }
    case 0b011010: {
      //DIV
      const div_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd, //0
        sa, //0
        func,
        _func: FuncInstr.div,
      }
      return div_instr
    }
    case 0b011011: {
      //DIVU
      const divu_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd, //0
        sa, //0
        func,
        _func: FuncInstr.divu,
      }
      return divu_instr
    }
    case 0b011100: {
      //DMULT
      const dmult_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd, //0
        sa, //0
        func,
        _func: FuncInstr.dmult,
      }
      return dmult_instr
    }
    case 0b011101: {
      //DMULTU
      const dmultu_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd, //0
        sa, //0
        func,
        _func: FuncInstr.dmult,
      }
      return dmultu_instr
    }
    case 0b011101: {
      //DSLL
      const dsll_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa,
        func,
        _func: FuncInstr.dsll,
      }
      return dsll_instr
    }
    case 0b010100: {
      //DSLLV
      const dsllv_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa, //0
        func,
        _func: FuncInstr.dsllv,
      }
      return dsllv_instr
    }
    case 0b111100: {
      //DSLL32
      const dsll32_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa,
        func,
        _func: FuncInstr.dsll32,
      }
      return dsll32_instr
    }
    case 0b111100: {
      //DSRA
      const dsra_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa,
        func,
        _func: FuncInstr.dsra,
      }
      return dsra_instr
    }
    case 0b010111: {
      //DSRAV
      const dsrav_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa, //0
        func,
        _func: FuncInstr.dsrav,
      }
      return dsrav_instr
    }
    case 0b111111: {
      //DSRA32
      const dsra32_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa,
        func,
        _func: FuncInstr.dsra32,
      }
      return dsra32_instr
    }
    case 0b111010: {
      //DSRL
      const dsrl_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa,
        func,
        _func: FuncInstr.dsrl,
      }
      return dsrl_instr
    }
    case 0b010110: {
      //DSRLV
      const dsrlv_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa, //0
        func,
        _func: FuncInstr.dsrlv,
      }
      return dsrlv_instr
    }
    case 0b111110: {
      //DSRL32
      const dsrl32_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa,
        func,
        _func: FuncInstr.dsrl32,
      }
      return dsrl32_instr
    }
    case 0b101110: {
      //DSUB
      const dsub_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa, //0
        func,
        _func: FuncInstr.dsub,
      }
      return dsub_instr
    }
    case 0b101111: {
      //DSUBU
      const dsubu_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa, //0
        func,
        _func: FuncInstr.dsubu,
      }
      return dsubu_instr
    }
    case 0b001001: {
      //JALR
      const jalr_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt, //0
        rd, //optional, defaults to 31
        sa, //0
        func,
        _func: FuncInstr.jalr,
      }
      return jalr_instr
    }
    case 0b001000: {
      //JR
      const jr_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt, //0
        rd, //0
        sa, //0
        func,
        _func: FuncInstr.jr,
      }
      return jr_instr
    }
    case 0b011000: {
      //MULT
      const mult_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd, //0
        sa, //0
        func,
        _func: FuncInstr.mult,
      }
      return mult_instr
    }
    case 0b011001: {
      //MULTU
      const mult_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd, //0
        sa, //0
        func,
        _func: FuncInstr.multu,
      }
      return mult_instr
    }
    case 0b100111: {
      //NOR
      const nor_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa, //0
        func,
        _func: FuncInstr.nor,
      }
      return nor_instr
    }
    case 0b100101: {
      //OR
      const or_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa, //0
        func,
        _func: FuncInstr.or,
      }
      return or_instr
    }
    case 0b000000: {
      //SLL
      const sll_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa,
        func,
        _func: FuncInstr.sll,
      }
      return sll_instr
    }
    case 0b000100: {
      //SLLV
      const sllv_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa, //0
        func,
        _func: FuncInstr.sllv,
      }
      return sllv_instr
    }
    case 0b101010: {
      //SLT
      const slt_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa, //0
        func,
        _func: FuncInstr.slt,
      }
      return slt_instr
    }
    case 0b101011: {
      //SLTU
      const sltu_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa, //0
        func,
        _func: FuncInstr.sltu,
      }
      return sltu_instr
    }
    case 0b000011: {
      //SRA
      const sltu_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa,
        func,
        _func: FuncInstr.sra,
      }
      return sltu_instr
    }
    case 0b000111: {
      //SRAV
      const srav_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa, //0
        func,
        _func: FuncInstr.srav,
      }
      return srav_instr
    }
    case 0b000111: {
      //SRL
      const srl_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa,
        func,
        _func: FuncInstr.srl,
      }
      return srl_instr
    }
    case 0b000110: {
      //SRLV
      const srl_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa, //0
        func,
        _func: FuncInstr.srlv,
      }
      return srl_instr
    }
    case 0b100010: {
      //SUB
      const sub_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa, //0
        func,
        _func: FuncInstr.sub,
      }
      return sub_instr
    }
    case 0b100011: {
      //SUBU
      const subu_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa, //0
        func,
        _func: FuncInstr.subu,
      }
      return subu_instr
    }
    case 0b001111: {
      //SYNC
      const sync_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs, //0
        rt, //0
        rd, //0
        sa, //0
        func,
        _func: FuncInstr.sync,
      }
      return sync_instr
    }
    case 0b001100: {
      //SYSCALL
      const sync_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs, //code?
        rt, //code?
        rd, //code?
        sa, //code?
        func,
        _func: FuncInstr.syscall,
      }
      return sync_instr
    }
    case 0b110100: {
      //TEQ
      const sync_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd, //code?
        sa, //code?
        func,
        _func: FuncInstr.teq,
      }
      return sync_instr
    }
    case 0b110000: {
      //TEQ
      const teq_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd, //code?
        sa, //code?
        func,
        _func: FuncInstr.tge,
      }
      return teq_instr
    }
    case 0b110001: {
      //TGEU
      const tgeu_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd, //code?
        sa, //code?
        func,
        _func: FuncInstr.tgeu,
      }
      return tgeu_instr
    }
    case 0b110010: {
      //TLT
      const tlt_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd, //code?
        sa, //code?
        func,
        _func: FuncInstr.tlt,
      }
      return tlt_instr
    }
    case 0b110011: {
      //TLTU
      const tltu_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd, //code?
        sa, //code?
        func,
        _func: FuncInstr.tltu,
      }
      return tltu_instr
    }
    case 0b110110: {
      //TNE
      const tne_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd, //code?
        sa, //code?
        func,
        _func: FuncInstr.tne,
      }
      return tne_instr
    }
    case 0b100110: {
      //XOR
      const xor_instr: R_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.special,
        rs,
        rt,
        rd,
        sa, //0
        func,
        _func: FuncInstr.xor,
      }
      return xor_instr
    }

  }
}


function _decode_single_i_type_instr(instr: int32): I_Type_Instruction {

  //I-Type (ADDI, ADDIU, ANDI, BEQ, BGEZ, BGEZAL, BGEZALL, BGEZL, BGTZ, BLEZ, BLTZ, BLTZAL, BLTZALL, BLTZL, BNE, LB, LBU, LH, LHU, LUI, LW, ORI, SB, SH, SLTI, SLTIU, SW, XORI)

  //first 6 bits are opcode (e.g. ADDI)
  const opcode = instr >> 26;

  const rs = (instr >> 21) & 0b11111; //5 bits, 25-21
  const rt = (instr >> 16) & 0b11111; //5 bits, 20-16
  const immediate = (instr >> 0) & 0b1111111111111111; //16 bits, 15-0

  switch (opcode) {
    case 0b001000: {
      //ADDI
      const addi_instr: I_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.addi,
        rs,
        rt,
        immediate,
      }
      return addi_instr
    }
    case 0b001001: {
      //ADDIU
      const addiu_instr: I_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.addiu,
        rs,
        rt,
        immediate,
      }
      return addiu_instr
    }
    case 0b001010: {
      //SLTI
      const slti_instr: I_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.slti,
        rs,
        rt,
        immediate,
      }
      return slti_instr
    }
    case 0b001011: {
      //SLTIU
      const sltiu_instr: I_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.sltiu,
        rs,
        rt,
        immediate,
      }
      return sltiu_instr
    }
    case 0b001100: {
      //ANDI
      const andi_instr: I_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.andi,
        rs,
        rt,
        immediate,
      }
      return andi_instr
    }
    case 0b001101: {
      //ORI
      const ori_instr: I_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.ori,
        rs,
        rt,
        immediate,
      }
      return ori_instr
    }

    case 0b001110: {
      //XORI
      const xori_instr: I_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.xori,
        rs,
        rt,
        immediate,
      }
      return xori_instr
    }
    case 0b001111: {
      //LUI
      const lui_instr: I_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.lui,
        rs, //0
        rt,
        immediate,
      }
      return lui_instr
    }


    case 0b011000: {
      //DADDI
      const daddi_instr: I_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.daddi,
        rs,
        rt,
        immediate,
      }
      return daddi_instr
    }
    case 0b011001: {
      //DADDIU
      const daddi_instr: I_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.daddiu,
        rs,
        rt,
        immediate,
      }
      return daddi_instr
    }


  }

}

function _decode_single_i_type_offset_instr(instr: int32): I_Type_Offset_Instruction {

  //I-Type (ADDI, ADDIU, ANDI, BEQ, BGEZ, BGEZAL, BGEZALL, BGEZL, BGTZ, BLEZ, BLTZ, BLTZAL, BLTZALL, BLTZL, BNE, LB, LBU, LH, LHU, LUI, LW, ORI, SB, SH, SLTI, SLTIU, SW, XORI)

  //first 6 bits are opcode (e.g. ADDI)
  const opcode = instr >> 26;

  const base = (instr >> 21) & 0b11111; //5 bits, 25-21
  const rt = (instr >> 16) & 0b11111; //5 bits, 20-16
  const offset = (instr >> 0) & 0b1111111111111111; //16 bits, 15-0

  switch (opcode) {
    case 0b011010: {
      //LDL
      const ldl_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.ldl,
        base,
        rt,
        offset,
      }
      return ldl_instr
    }
    case 0b011011: {
      //LDR
      const ldr_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.ldr,
        base,
        rt,
        offset,
      }
      return ldr_instr
    }
    case 0b100000: {
      //LB
      const lb_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.lb,
        base,
        rt,
        offset,
      }
      return lb_instr
    }
    case 0b100001: {
      //LH
      const lh_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.lh,
        base,
        rt,
        offset,
      }
      return lh_instr
    }
    case 0b100010: {
      //LWL
      const lwl_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.lwl,
        base,
        rt,
        offset,
      }
      return lwl_instr
    }
    case 0b100011: {
      //LW
      const lw_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.lw,
        base,
        rt,
        offset,
      }
      return lw_instr
    }
    case 0b100100: {
      //LBU
      const lbu_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.lbu,
        base,
        rt,
        offset,
      }
      return lbu_instr
    }
    case 0b100101: {
      //LHU
      const lhu_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.lhu,
        base,
        rt,
        offset,
      }
      return lhu_instr
    }
    case 0b100110: {
      //LWR
      const lwr_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.lwr,
        base,
        rt,
        offset,
      }
      return lwr_instr
    }
    case 0b100111: {
      //LWU
      const lwu_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.lwu,
        base,
        rt,
        offset,
      }
      return lwu_instr
    }
    case 0b101000: {
      //SB
      const sb_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.sb,
        base,
        rt,
        offset,
      }
      return sb_instr
    }
    case 0b101001: {
      //SH
      const sh_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.sh,
        base,
        rt,
        offset,
      }
      return sh_instr
    }
    case 0b101010: {
      //SWL
      const swl_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.swl,
        base,
        rt,
        offset,
      }
      return swl_instr
    }
    case 0b101011: {
      //SW
      const sw_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.sw,
        base,
        rt,
        offset,
      }
      return sw_instr
    }
    case 0b101100: {
      //SDL
      const sdl_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.sdl,
        base,
        rt,
        offset,
      }
      return sdl_instr
    }
    case 0b101101: {
      //SDR
      const sdr_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.sdr,
        base,
        rt,
        offset,
      }
      return sdr_instr
    }
    case 0b101110: {
      //SWR
      const swr_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.swr,
        base,
        rt,
        offset,
      }
      return swr_instr
    }
    case 0b110000: {
      //LL
      const ll_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.ll,
        base,
        rt,
        offset,
      }
      return ll_instr
    }
    case 0b110001:
    case 0b110010: {
      //LWC1 / LWC2
      //handled below this switch
      break
    }
    case 0b110100: {
      //LLD
      const lhu_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.lld,
        base,
        rt,
        offset,
      }
      return lhu_instr
    }
    case 0b110101:
    case 0b110110: {
      //LDC1 / LDC2
      //handled below this switch
      break
    }
    case 0b110111: {
      //LD
      const ld_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.ld,
        base,
        rt,
        offset,
      }
      return ld_instr
    }
    case 0b111000: {
      //SC
      const sc_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.sc,
        base,
        rt,
        offset,
      }
      return sc_instr
    }
    case 0b111001:
    case 0b111010: {
      //SWC1 / SWC2
      //handled below this switch
      break
    }
    case 0b111100: {
      //SCD
      const scb_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.scd,
        base,
        rt,
        offset,
      }
      return scb_instr
    }
    case 0b111101:
    case 0b111110: {
      //SDC1 / SDC2
      //handled below this switch
      break
    }
    case 0b111111: {
      //SD
      const scb_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.sd,
        base,
        rt,
        offset,
      }
      return scb_instr
    }


  }

  //could be someting with coprocessor... (check first 4 bits of opcode, last 2 are the coprocessor)
  const opcode2 = opcode >> 2;
  const coprocessor = opcode & 0b11;
  //TODO coprocessor

  switch (opcode2) {
    case 0b1101: {
      //LDCz
      const ldcz_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.ldcz,
        base,
        rt,
        offset,
      }
      return ldcz_instr
    }
    case 0b1100: {
      //LWCz
      const lwcz_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.lwcz,
        base,
        rt,
        offset,
      }
      return lwcz_instr
    }
    case 0b1111: {
      //SDCz
      const sdcz_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.sdcz,
        base,
        rt,
        offset,
      }
      return sdcz_instr
    }
    case 0b1110: {
      //SWCz
      const swcz_instr: I_Type_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.swcz,
        base,
        rt,
        offset,
      }
      return swcz_instr
    }
  }


}

function _decode_single_i_type_branch_instr(instr: int32): I_Type_Branch_Instruction {

  //I-Type (ADDI, ADDIU, ANDI, BEQ, BGEZ, BGEZAL, BGEZALL, BGEZL, BGTZ, BLEZ, BLTZ, BLTZAL, BLTZALL, BLTZL, BNE, LB, LBU, LH, LHU, LUI, LW, ORI, SB, SH, SLTI, SLTIU, SW, XORI)

  //first 6 bits are opcode (e.g. ADDI)
  const opcode = instr >> 26;

  const rs = (instr >> 21) & 0b11111; //5 bits, 25-21
  const rt = (instr >> 16) & 0b11111; //5 bits, 20-16
  const offset = (instr >> 0) & 0b1111111111111111; //16 bits, 15-0

  switch (opcode) {
    case 0b000100: {
      //BEQ
      const beq_instr: I_Type_Branch_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.beq,
        rs,
        rt,
        offset,
      }
      return beq_instr
    }
    case 0b000101: {
      //BNE
      const bne_instr: I_Type_Branch_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.bne,
        rs,
        rt,
        offset,
      }
      return bne_instr
    }
    case 0b000110: {
      //BLEZ
      const blez_instr: I_Type_Branch_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.blez,
        rs,
        rt, //0
        offset,
      }
      return blez_instr
    }
    case 0b000111: {
      //BGTZ
      const bgtz_instr: I_Type_Branch_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.bgtz,
        rs,
        rt, //0
        offset,
      }
      return bgtz_instr
    }

    case 0b010100: {
      //BEQL
      const beql_instr: I_Type_Branch_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.beql,
        rs,
        rt,
        offset,
      }
      return beql_instr
    }
    case 0b010101: {
      //BNEL
      const bnel_instr: I_Type_Branch_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.bnel,
        rs,
        rt,
        offset,
      }
      return bnel_instr
    }
    case 0b010110: {
      //BLEZL
      const blezl_instr: I_Type_Branch_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.blezl,
        rs,
        rt, //0
        offset,
      }
      return blezl_instr
    }
    case 0b010111: {
      //BGTZL
      const bgtzl_instr: I_Type_Branch_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.bgtzl,
        rs,
        rt, //0
        offset,
      }
      return bgtzl_instr
    }

  }

}


function _decode_single_i_type_regimm_instr(instr: int32): I_Type_Regimm_Immediate_Instruction | I_Type_Regimm_Offset_Instruction {

  //I-Type (ADDI, ADDIU, ANDI, BEQ, BGEZ, BGEZAL, BGEZALL, BGEZL, BGTZ, BLEZ, BLTZ, BLTZAL, BLTZALL, BLTZL, BNE, LB, LBU, LH, LHU, LUI, LW, ORI, SB, SH, SLTI, SLTIU, SW, XORI)

  //first 6 bits are opcode (e.g. ADDI)
  const opcode = instr >> 26; //000001

  const rs = (instr >> 21) & 0b11111; //5 bits, 25-21
  const subOp = (instr >> 16) & 0b11111; //5 bits, 20-16
  const immediate = (instr >> 0) & 0b1111111111111111; //16 bits, 15-0

  //TODO sort like in the manual
  switch (subOp) {
    case 0b01000: {
      //TGEI
      const tgei_instr: I_Type_Regimm_Immediate_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.regimm,
        rs,
        subOp,
        _subOp: RegimmInstr.tgei,
        immediate,
      }
      return tgei_instr
    }
    case 0b01001: {
      //TGEIU
      const tgeiu_instr: I_Type_Regimm_Immediate_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.regimm,
        rs,
        subOp,
        _subOp: RegimmInstr.tgeiu,
        immediate,
      }
      return tgeiu_instr
    }
    case 0b01010: {
      //TLTI
      const tlti_instr: I_Type_Regimm_Immediate_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.regimm,
        rs,
        subOp,
        _subOp: RegimmInstr.tlti,
        immediate,
      }
      return tlti_instr
    }
    case 0b01010: {
      //TLTIU
      const tltiu_instr: I_Type_Regimm_Immediate_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.regimm,
        rs,
        subOp,
        _subOp: RegimmInstr.tltiu,
        immediate,
      }
      return tltiu_instr
    }
    case 0b01100: {
      //TEQI
      const teqi_instr: I_Type_Regimm_Immediate_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.regimm,
        rs,
        subOp,
        _subOp: RegimmInstr.teqi,
        immediate,
      }
      return teqi_instr
    }
    case 0b01110: {
      //TNEI
      const tnei_instr: I_Type_Regimm_Immediate_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.regimm,
        rs,
        subOp,
        _subOp: RegimmInstr.tnei,
        immediate,
      }
      return tnei_instr
    }

    case 0b00000: {
      //BLTZ
      const bltz_instr: I_Type_Regimm_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.regimm,
        rs,
        subOp,
        _subOp: RegimmInstr.bltz,
        offset: immediate,
      }
      return bltz_instr
    }
    case 0b00001: {
      //BGEZ
      const bgez_instr: I_Type_Regimm_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.regimm,
        rs,
        subOp,
        _subOp: RegimmInstr.bgez,
        offset: immediate,
      }
      return bgez_instr
    }
    case 0b00010: {
      //BLTZL
      const bltzl_instr: I_Type_Regimm_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.regimm,
        rs,
        subOp,
        _subOp: RegimmInstr.bltzl,
        offset: immediate,
      }
      return bltzl_instr
    }
    case 0b00011: {
      //BGEZL
      const bgezl_instr: I_Type_Regimm_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.regimm,
        rs,
        subOp,
        _subOp: RegimmInstr.bgezl,
        offset: immediate,
      }
      return bgezl_instr
    }

    case 0b10000: {
      //BLTZAL
      const bltzal_instr: I_Type_Regimm_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.regimm,
        rs,
        subOp,
        _subOp: RegimmInstr.bltzal,
        offset: immediate,
      }
      return bltzal_instr
    }
    case 0b10001: {
      //BGEZAL
      const bgezal_instr: I_Type_Regimm_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.regimm,
        rs,
        subOp,
        _subOp: RegimmInstr.bgezal,
        offset: immediate,
      }
      return bgezal_instr
    }
    case 0b10010: {
      //BLTZALL
      const bltzall_instr: I_Type_Regimm_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.regimm,
        rs,
        subOp,
        _subOp: RegimmInstr.bltzall,
        offset: immediate,
      }
      return bltzall_instr
    }
    case 0b10011: {
      //BGEZALL
      const bgezall_instr: I_Type_Regimm_Offset_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.regimm,
        rs,
        subOp,
        _subOp: RegimmInstr.bgezall,
        offset: immediate,
      }
      return bgezall_instr
    }

  }

}

function _decode_single_j_type_instr(instr: int32): J_Type_Instruction {

  //first 6 bits are opcode (e.g. ADDI)
  const opcode = instr >> 26;

  //J-Type (J, JAL)
  const target = instr & 0b11111111111111111111111111; //26 bits, 25-0

  switch (opcode) {
    case 0b000010: {
      //J
      const j_instr: J_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.j,
        target,
      }
      return j_instr
    }
    case 0b000011: {
      //JAL
      const jal_instr: J_Type_Instruction = {
        original: instr,
        op: opcode,
        _op: OpInstr.jal,
        target,
      }
      return jal_instr
    }
  }

}
