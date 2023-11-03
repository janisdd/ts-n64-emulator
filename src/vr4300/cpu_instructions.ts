type int = number
type int64 = number
type float = number
type float64 = number


type Instruction = {
  opcode: int,
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
