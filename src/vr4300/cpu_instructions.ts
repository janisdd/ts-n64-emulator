import {
  Add_Instruction,
  Addi_Instruction,
  Addiu_Instruction,
  Addu_Instruction,
  And_Instruction,
  Andi_Instruction,
  Bc0f_Instruction,
  Bc0fl_Instruction,
  Bc0t_Instruction,
  Bc0tl_Instruction,
  Bc1f_Instruction,
  Bc1fl_Instruction,
  Bc1t_Instruction,
  Bc1tl_Instruction,
  Bc2f_Instruction,
  Bc2fl_Instruction,
  Bc2t_Instruction,
  Bc2tl_Instruction,
  Beq_Instruction,
  Beql_Instruction,
  Bgez_Instruction,
  Bgezal_Instruction,
  Bgezall_Instruction,
  Bgezl_Instruction,
  Bgtz_Instruction,
  Bgtzl_Instruction,
  Blez_Instruction,
  Blezl_Instruction,
  Bltz_Instruction,
  Bltzal_Instruction,
  Bltzall_Instruction,
  Bltzl_Instruction,
  Bne_Instruction,
  Bnel_Instruction,
  Branch_Coprocessor_Instruction,
  BranchConditionCode,
  Cache_Instruction,
  Cfc1_Instruction,
  Cfc2_Instruction, Ctc1_Instruction, Ctc2_Instruction,
  Dadd_Instruction,
  Daddi_Instruction,
  Daddiu_Instruction,
  Daddu_Instruction,
  Ddiv_Instruction,
  Ddivu_Instruction,
  Div_Instruction,
  Divu_Instruction,
  Dmfc0_Instruction,
  Dmfc1_Instruction, Dmtc0_Instruction, Dmtc1_Instruction,
  Dmult_Instruction,
  Dmultu_Instruction,
  Dsll32_Instruction,
  Dsll_Instruction,
  Dsllv_Instruction,
  Dsra32_Instruction,
  Dsra_Instruction,
  Dsrav_Instruction,
  Dsrl32_Instruction,
  Dsrl_Instruction,
  Dsrlv_Instruction,
  Dsub_Instruction,
  Dsubu_Instruction, Eret_Instruction,
  I_Type_Branch_Instruction,
  I_Type_Instruction,
  I_Type_Offset_Instruction,
  I_Type_Regimm_Immediate_Instruction,
  I_Type_Regimm_Offset_Instruction,
  InstructionOld,
  int26,
  int32,
  int6, J_Instruction, J_Type_Instruction, Jal_Instruction,
  Jalr_Instruction,
  Jr_Instruction,
  Lb_Instruction,
  Lbu_Instruction,
  Ld_Instruction,
  Ldc1_Instruction,
  Ldc2_Instruction,
  Ldl_Instruction,
  Ldr_Instruction,
  Lh_Instruction,
  Lhu_Instruction,
  Ll_Instruction,
  Lld_Instruction,
  Lui_Instruction,
  Lw_Instruction,
  Lwc1_Instruction,
  Lwc2_Instruction,
  Lwl_Instruction,
  Lwr_Instruction,
  Lwu_Instruction,
  Mfc0_Instruction,
  Mfc1_Instruction,
  Mfc2_Instruction,
  MfcZ_Instruction,
  Mtc0_Instruction,
  Mtc1_Instruction, Mtc2_Instruction,
  Mult_Instruction,
  Multu_Instruction,
  Nor_Instruction,
  OpInstr,
  Or_Instruction,
  Ori_Instruction,
  R_Type_Instruction,
  Reserved_Instruction,
  Sb_Instruction,
  Sc_Instruction,
  Scd_Instruction,
  Sd_Instruction,
  Sdc1_Instruction,
  Sdc2_Instruction,
  Sdl_Instruction,
  Sdr_Instruction,
  Sh_Instruction,
  Sll_Instruction,
  Sllv_Instruction,
  Slt_Instruction,
  Slti_Instruction,
  Sltiu_Instruction,
  Sltu_Instruction,
  Sra_Instruction,
  Srav_Instruction,
  Srl_Instruction,
  Srlv_Instruction,
  Sub_Instruction,
  Subu_Instruction,
  Sw_Instruction,
  Swc1_Instruction,
  Swc2_Instruction,
  Swl_Instruction,
  Swr_Instruction,
  Sync_Instruction,
  Syscall_Instruction,
  Teq_Instruction,
  Teqi_Instruction,
  Tge_Instruction,
  Tgei_Instruction,
  Tgeiu_Instruction,
  Tgeu_Instruction, Tlb_Instruction, Tlbp_Instruction, Tlbr_Instruction, Tlbwi_Instruction, Tlbwr_Instruction,
  Tlt_Instruction,
  Tlti_Instruction,
  Tltiu_Instruction,
  Tltu_Instruction,
  Tne_Instruction,
  Tnei_Instruction,
  Xor_Instruction,
  Xori_Instruction
} from "./instruction_types";

const register_debug_view_prefix = "r";

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
const add_instr: InstructionOld = {
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
const addi_instr: InstructionOld = {
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
const addiu_instr: InstructionOld = {
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
const addu_instr: InstructionOld = {
  opcode: 0b000000,
}

/**
 * AND rd, rs, rt
 *
 * @description The contents of general purpose register rs are combined with the contents of
 * general purpose register rt in a bit-wise logical AND operation. The result is
 * stored in general purpose register rd.
 */
const and_instr: InstructionOld = {
  opcode: 0b000000,
}

/**
 * ANDI rt, rs, immediate
 *
 * @description The 16-bit immediate is zero-extended and combined with the contents of general
 * purpose register rs in a bit-wise logical AND operation. The result is stored in
 * general purpose register rt.
 */
const andi_instr: InstructionOld = {
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
const bczf_instr: InstructionOld = {
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
const bczfl_instr: InstructionOld = {
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
const bczt_instr: InstructionOld = {
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
const bcztl_instr: InstructionOld = {
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
const beq_instr: InstructionOld = {
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
const beql_instr: InstructionOld = {
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
const bgez_instr: InstructionOld = {
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
const bgezal_instr: InstructionOld = {
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
const bgezall_instr: InstructionOld = {
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
const bgezl_instr: InstructionOld = {
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
const bgtz_instr: InstructionOld = {
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
const bgtzl_instr: InstructionOld = {
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
const blez_instr: InstructionOld = {
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
const blezl_instr: InstructionOld = {
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
const bltz_instr: InstructionOld = {
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
const bltzal_instr: InstructionOld = {
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
const bltzall_instr: InstructionOld = {
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
const bltzl_instr: InstructionOld = {
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
const bne_instr: InstructionOld = {
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
const bnel_instr: InstructionOld = {
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
const break_instr: InstructionOld = {
  opcode: 0b000000,
}


/**
 * CACHE op, offset(base) - Cache Operation
 * TLDR ???
 */
const cache_instr: InstructionOld = {
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
const cfcz_instr: InstructionOld = {
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
const copz_instr: InstructionOld = {
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
const ctcz_instr: InstructionOld = {
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
const dadd_instr: InstructionOld = {
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
const daddi_instr: InstructionOld = {
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
const daddiu_instr: InstructionOld = {
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
const daddu_instr: InstructionOld = {
  opcode: 0b000000,
}

/**
 * DDIV rs, rt - Doubleword Divide
 */
const ddiv_instr: InstructionOld = {
  opcode: 0b000000,
}

/**
 * DDIVU rs, rt - Doubleword Divide Unsigned
 */
const ddivu_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * DIV rs, rt - Divide
 */
const div_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * DIVU rs, rt - Divide Unsigned
 */
const divu_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * DMFC0 rt, rd - Doubleword Move From System Control Coprocessor
 */
const dmfc0_instr: InstructionOld = {
  opcode: 0b000000,
}

/**
 * DMTC0 rt, rd - Doubleword Move To System Control Coprocessor
 */
const dmtc0_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * DMULT rs, rt - Doubleword Multiply
 */
const dmult_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * DMULTU rs, rt - Doubleword Multiply Unsigned
 */
const dmultu_instr: InstructionOld = {
  opcode: 0b000000,
}

/**
 * DSLL rd, rt, sa - Doubleword Shift Left Logical
 */
const dsll_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * DSLLV rd, rt, rs - Doubleword Shift Left Logical Variable
 */
const dsllv_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * DSLL32 rd, rt, sa - Doubleword Shift Left Logical + 32
 */
const dsll32_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * DSRA rd, rt, sa - Doubleword Shift Right Arithmetic
 */
const dsra_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * DSRAV rd, rt, rs - Doubleword Shift Right Arithmetic Variable
 */
const dsrav_instr: InstructionOld = {
  opcode: 0b000000,
}

/**
 * DSRA32 rd, rt, sa - Doubleword Shift Right Arithmetic + 32
 */
const dsra32_instr: InstructionOld = {
  opcode: 0b000000,
}

/**
 * DSRL rd, rt, sa - Doubleword Shift Right Logical
 */
const dsrl_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * DSRLV rd, rt, rs - Doubleword Shift Right Logical Variable
 */
const dsrlv_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * DSRL32 rd, rt, sa - Doubleword Shift Right Logical + 32
 */
const dsrl32_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * DSUB rd, rs, rt - Doubleword Subtract
 */
const dsub_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * DSUBU rd, rs, rt - Doubleword Subtract Unsigned
 */
const dsubu_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * ERET - Return From Exception
 */
const eret_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * J target - Jump
 */
const j_instr: InstructionOld = {
  opcode: 0b000000,
}

/**
 * JAL target - Jump And Link
 */
const jal_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * JALR rs
 * JALR rd, rs - Jump And Link Register
 */
const jalr_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * JR rs - Jump Register
 */
const jr_instr: InstructionOld = {
  opcode: 0b000000,
}

/**
 * LB rt, offset(base) - Load Byte
 */
const lb_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * LBU rt, offset(base) - Load Byte Unsigned
 */
const lbu_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * LD rt, offset(base) - Load Doubleword
 */
const ld_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * LDCz rt, offset(base) - Load Doubleword To Coprocessor z
 */
const ldcz_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * LDL rt, offset(base) - Load Doubleword Left
 */
const ldl_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * LDR rt, offset(base) - Load Doubleword Right
 */
const ldr_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * LH rt, offset(base) - Load Halfword
 */
const lh_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * LHU rt, offset(base) - Load Halfword Unsigned
 */
const lhu_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * LL rt, offset(base) - Load Linked
 */
const ll_instr: InstructionOld = {
  opcode: 0b000000,
}

/**
 * LLD rt, offset(base) - Load Linked Doubleword
 */
const lld_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * LUI rt, immediate - Load Upper Immediate
 */
const lui_instr: InstructionOld = {
  opcode: 0b000000,
}

/**
 * LW rt, offset(base) - Load Word
 */
const lw_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * LWCz rt, offset(base)  - Load Word To Coprocessor z
 */
const lwcz_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * LWL rt, offset(base) - Load Word Left
 */
const lwl_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * LWR rt, offset(base) - Load Word Right
 */
const lwr_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * LWU rt, offset(base) - Load Word Unsigned
 */
const lwu_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * MFC0 rt, rd - Move From System Control Coprocessor
 */
const mfc0_instr: InstructionOld = {
  opcode: 0b000000,
}

/**
 * MFCz rt, rd - Move From Coprocessor z
 */
const mfcz_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * MFHI rd - Move From HI
 */
const mfhi_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * MFLO rd - Move From LO
 */
const mflo_instr: InstructionOld = {
  opcode: 0b000000,
}

/**
 * MTC0 rt, rd - Move To System Control Coprocessor
 */
const mtc0_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * MTCz rt, rd - Move To Coprocessor z
 */
const mtcz_instr: InstructionOld = {
  opcode: 0b000000,
}

/**
 * MTHI rs - Move To HI
 */
const mthi_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * MTLO rs - Move To LO
 */
const mtl0_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * MULT rs, rt - Multiply
 */
const mult_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * MULTU rs, rt - Multiply Unsigned
 */
const multu_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * NOR rd, rs, rt - Nor
 */
const nor_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * OR rd, rs, rt - Or
 */
const or_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * ORI rt, rs, immediate - Or Immediate
 */
const ori_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SB rt, offset(base) - Store Byte
 */
const sb_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SC rt, offset(base) - Store Conditional
 */
const sc_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SCD rt, offset(base) - Store Conditional Doubleword
 */
const scd_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SD rt, offset(base) - Store Doubleword
 */
const sd_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SDCz rt, offset(base) - Store Doubleword From Coprocessor z
 */
const sdcz_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SDL rt, offset(base) - Store Doubleword Left
 */
const sdl_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SDR rt, offset(base) - Store Doubleword Right
 */
const sdr_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SH rt, offset(base) - Store Halfword
 */
const sh_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SLL rd, rt, sa - Shift Left Logical
 */
const sll_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SLLV rd, rt, rs - Shift Left Logical Variable
 */
const sllv_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SLT rd, rs, rt - Set On Less Than
 */
const slt_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SLTI rt, rs, immediate - Set On Less Than Immediate
 */
const slti_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SLTIU rt, rs, immediate - Set On Less Than Immediate Unsigned
 */
const sltiu_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SLTU rd, rs, rt - Set On Less Than Unsigned
 */
const sltu_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SRA rd, rt, sa - Shift Right Arithmetic
 */
const sra_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SRAV rd, rt, rs - Shift Right Arithmetic Variable
 */
const srav_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SRL rd, rt, sa - Shift Right Logical
 */
const srl_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SRLV rd, rt, rs - Shift Right Logical Variable
 */
const srlv_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SUB rd, rs, rt - Subtract
 */
const sub_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SUBU rd, rs, rt - Subtract Unsigned
 */
const subu_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SW rt, offset(base) - Store Word
 */
const sw_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SWCz rt, offset(base) - Store Word From Coprocessor z
 */
const swcz_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SWL rt, offset(base) - Store Word Left
 */
const swl_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SWR rt, offset(base) - Store Word Right
 */
const swr_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SYNC - Synchronize
 */
const sync_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * SYSCALL - System Call
 */
const syscall_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * TEQ rs, rt - Trap If Equal
 */
const teq_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * TEQI rs, immediate - Trap If Equal Immediate
 */
const teqi_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * TGE rs, rt - Trap If Greater Than Or Equal
 */
const tge_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * TGEI rs, immediate - Trap If Greater Than Or Equal Immediate
 */
const tgei_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * TGEIU rs, immediate - Trap If Greater Than Or Equal Immediate Unsigned
 */
const tgeiu_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * TLBP - Probe TLB For Matching Entry
 */
const tlbp_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * TLBWI - Write Indexed TLB Entry
 */
const tlbwi_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * TLBWR - Write Random TLB Entry
 */
const tlbwr_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * TLT rs, rt - Trap If Less Than
 */
const tlt_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * TLTI rs, immediate - Trap If Less Than Immediate
 */
const tlti_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * TLTIU rs, immediate - Trap If Less Than Immediate Unsigned
 */
const tltiu_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * TLTU rs, rt - Trap If Less Than Unsigned
 */
const tltu_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * TNE rs, rt - Trap If Not Equal
 */
const tne_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * TNEI rs, immediate - Trap If Not Equal Immediate
 */
const tnei_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * XOR rd, rs, r - Exclusive Or
 */
const xor_instr: InstructionOld = {
  opcode: 0b000000,
}
/**
 * XORI rt, rs, immediate - Exclusive Or Immediate
 */
const xori_instr: InstructionOld = {
  opcode: 0b000000,
}


export function decode_single_binary_instructions(instr_line: int32) {

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
    case 0b010000:
    case 0b010001:
    case 0b010010: {
      //some coprocessor instruction
      const instr = _decode_coprocessor_type_instr(instr_line)
      return instr
    }
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
    case 0b101011: //SW
    case 0b101100: //SDL
    case 0b101101: //SDR
    case 0b101110: //SWR
    case 0b101111: //CACHE
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

function _decode_single_r_type_instr(instr: int32): R_Type_Instruction | Reserved_Instruction {

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
      const add_instr: Add_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `add ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return add_instr
    }
    case 0b100001: {
      //ADDU
      const addu_instr: Addu_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `addu ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return addu_instr
    }
    case 0b100100: {
      //AND
      const and_instr: And_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `and ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return and_instr
    }
    case 0b101100: {
      //DADD
      const dadd_instr: Dadd_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `dadd ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return dadd_instr
    }
    case 0b101101: {
      //DADDU
      const daddu_instr: Daddu_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `daddu ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return daddu_instr
    }
    case 0b011110: {
      //DDIV
      const ddiv_instr: Ddiv_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd: 0,
        sa: 0,
        func,
        debug_view: `ddiv ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return ddiv_instr
    }
    case 0b011111: {
      //DDIVU
      const ddivu_instr: Ddivu_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd: 0,
        sa: 0,
        func,
        debug_view: `ddivu ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return ddivu_instr
    }
    case 0b011010: {
      //DIV
      const div_instr: Div_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd: 0,
        sa: 0,
        func,
        debug_view: `div ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return div_instr
    }
    case 0b011011: {
      //DIVU
      const divu_instr: Divu_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd: 0,
        sa: 0,
        func,
        debug_view: `divu ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return divu_instr
    }
    case 0b011100: {
      //DMULT
      const dmult_instr: Dmult_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd: 0,
        sa: 0,
        func,
        debug_view: `dmult ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return dmult_instr
    }
    case 0b011101: {
      //DMULTU
      const dmultu_instr: Dmultu_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd: 0,
        sa: 0,
        func,
        debug_view: `dmultu ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return dmultu_instr
    }
    case 0b111000: {
      //DSLL
      const dsll_instr: Dsll_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa,
        func,
        debug_view: `dsll ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rt}, ${sa}`
      }
      return dsll_instr
    }
    case 0b010100: {
      //DSLLV
      const dsllv_instr: Dsllv_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `dsllv ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}`
      }
      return dsllv_instr
    }
    case 0b111100: {
      //DSLL32
      const dsll32_instr: Dsll32_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs: 0,
        rt,
        rd,
        sa,
        func,
        debug_view: `dsll32 ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rt}, ${sa}`
      }
      return dsll32_instr
    }
    case 0b111011: {
      //DSRA
      const dsra_instr: Dsra_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs: 0,
        rt,
        rd,
        sa,
        func,
        debug_view: `dsra ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rt}, ${sa}`
      }
      return dsra_instr
    }
    case 0b010111: {
      //DSRAV
      const dsrav_instr: Dsrav_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `dsrav ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}`
      }
      return dsrav_instr
    }
    case 0b111111: {
      //DSRA32
      const dsra32_instr: Dsra32_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs: 0,
        rt,
        rd,
        sa,
        func,
        debug_view: `dsra32 ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rt}, ${sa}`
      }
      return dsra32_instr
    }
    case 0b111010: {
      //DSRL
      const dsrl_instr: Dsrl_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs: 0,
        rt,
        rd,
        sa,
        func,
        debug_view: `dsrl ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rt}, ${sa}`
      }
      return dsrl_instr
    }
    case 0b010110: {
      //DSRLV
      const dsrlv_instr: Dsrlv_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `dsrlv ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}`
      }
      return dsrlv_instr
    }
    case 0b111110: {
      //DSRL32
      const dsrl32_instr: Dsrl32_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs: 0,
        rt,
        rd,
        sa,
        func,
        debug_view: `dsrl32 ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rt}, ${sa}`
      }
      return dsrl32_instr
    }
    case 0b101110: {
      //DSUB
      const dsub_instr: Dsub_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `dsub ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return dsub_instr
    }
    case 0b101111: {
      //DSUBU
      const dsubu_instr: Dsubu_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `dsubu ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return dsubu_instr
    }
    case 0b001001: {
      //JALR
      const jalr_instr: Jalr_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt: 0,
        rd, //optional, defaults to 31
        sa: 0,
        func,
        debug_view: `jalr ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rs}`
      }
      return jalr_instr
    }
    case 0b001000: {
      //JR
      const jr_instr: Jr_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt: 0,
        rd: 0,
        sa: 0,
        func,
        debug_view: `jr ${register_debug_view_prefix}${rs}`
      }
      return jr_instr
    }
    case 0b011000: {
      //MULT
      const mult_instr: Mult_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd: 0,
        sa: 0,
        func,
        debug_view: `mult ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return mult_instr
    }
    case 0b011001: {
      //MULTU
      const mult_instr: Multu_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd: 0,
        sa: 0,
        func,
        debug_view: `multu ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return mult_instr
    }
    case 0b100111: {
      //NOR
      const nor_instr: Nor_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `nor ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return nor_instr
    }
    case 0b100101: {
      //OR
      const or_instr: Or_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `or ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return or_instr
    }
    case 0b000000: {
      //SLL
      const sll_instr: Sll_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs: 0,
        rt,
        rd,
        sa,
        func,
        debug_view: `sll ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rt}, ${sa}`
      }
      return sll_instr
    }
    case 0b000100: {
      //SLLV
      const sllv_instr: Sllv_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `sllv ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}`
      }
      return sllv_instr
    }
    case 0b101010: {
      //SLT
      const slt_instr: Slt_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `slt ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return slt_instr
    }
    case 0b101011: {
      //SLTU
      const sltu_instr: Sltu_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `sltu ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return sltu_instr
    }
    case 0b000011: {
      //SRA
      const sltu_instr: Sra_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs: 0,
        rt,
        rd,
        sa,
        func,
        debug_view: `sra ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rt}, ${sa}`
      }
      return sltu_instr
    }
    case 0b000111: {
      //SRAV
      const srav_instr: Srav_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `srav ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}`
      }
      return srav_instr
    }
    case 0b000010: {
      //SRL
      const srl_instr: Srl_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs: 0,
        rt,
        rd,
        sa,
        func,
        debug_view: `srl ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rt}, ${sa}`
      }
      return srl_instr
    }
    case 0b000110: {
      //SRLV
      const srl_instr: Srlv_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `srlv ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}`
      }
      return srl_instr
    }
    case 0b100010: {
      //SUB
      const sub_instr: Sub_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `sub ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return sub_instr
    }
    case 0b100011: {
      //SUBU
      const subu_instr: Subu_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `subu ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return subu_instr
    }
    case 0b001111: {
      //SYNC
      const sync_instr: Sync_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs: 0,
        rt: 0,
        rd: 0,
        sa: 0,
        func,
        debug_view: `sync`
      }
      return sync_instr
    }
    case 0b001100: {
      //code is bits 25-6 (20 bits)
      const code = (instr >> 6) & 0b11111111111111111111;
      //SYSCALL
      const sync_instr: Syscall_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs: 0,
        rt: 0,
        rd: 0,
        sa: 0,
        code,
        func,
        debug_view: `syscall`
      }
      return sync_instr
    }
    case 0b110100: {
      //code is bits 15-6 (10 bits)
      const code = (instr >> 6) & 0b1111111111;
      //TEQ
      const teq_instr: Teq_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd: 0,
        sa: 0,
        code,
        func,
        debug_view: `teq ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return teq_instr
    }
    case 0b110000: {
      //code is bits 15-6 (10 bits)
      const code = (instr >> 6) & 0b1111111111;
      //TGE
      const tge_instr: Tge_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd: 0,
        sa: 0,
        code,
        func,
        debug_view: `tge ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return tge_instr
    }
    case 0b110001: {
      //code is bits 15-6 (10 bits)
      const code = (instr >> 6) & 0b1111111111;
      //TGEU
      const tgeu_instr: Tgeu_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd: 0,
        sa: 0,
        code,
        func,
        debug_view: `tgeu ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return tgeu_instr
    }
    case 0b110010: {
      //code is bits 15-6 (10 bits)
      const code = (instr >> 6) & 0b1111111111;
      //TLT
      const tlt_instr: Tlt_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd: 0,
        sa: 0,
        code,
        func,
        debug_view: `tlt ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return tlt_instr
    }
    case 0b110011: {
      //code is bits 15-6 (10 bits)
      const code = (instr >> 6) & 0b1111111111;
      //TLTU
      const tltu_instr: Tltu_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd: 0,
        sa: 0,
        code,
        func,
        debug_view: `tltu ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return tltu_instr
    }
    case 0b110110: {
      //code is bits 15-6 (10 bits)
      const code = (instr >> 6) & 0b1111111111;
      //TNE
      const tne_instr: Tne_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd: 0,
        sa: 0,
        code,
        func,
        debug_view: `tne ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return tne_instr
    }
    case 0b100110: {
      //XOR
      const xor_instr: Xor_Instruction = {
        original: instr,
        op: OpInstr.special,
        rs,
        rt,
        rd,
        sa: 0,
        func,
        debug_view: `xor ${register_debug_view_prefix}${rd}, ${register_debug_view_prefix}${rs}, ${register_debug_view_prefix}${rt}`
      }
      return xor_instr
    }

  }

  //if nothing matched, we have a * reserved instruction
  //because the table on page 544 is complete (all combinations)

  const reserved_instr: Reserved_Instruction = {
    original: instr,
    op: OpInstr.reserved,
    debug_view: "reserved instruction",
  }

  return reserved_instr
}


//we don't have a reserved instruction catch here, as the calling function knows all op codes for this
function _decode_single_i_type_instr(instr: int32): I_Type_Instruction | Reserved_Instruction {

  //I-Type (ADDI, ADDIU, ANDI, BEQ, BGEZ, BGEZAL, BGEZALL, BGEZL, BGTZ, BLEZ, BLTZ, BLTZAL, BLTZALL, BLTZL, BNE, LB, LBU, LH, LHU, LUI, LW, ORI, SB, SH, SLTI, SLTIU, SW, XORI)

  //first 6 bits are opcode (e.g. ADDI)
  const opcode = instr >> 26;

  const rs = (instr >> 21) & 0b11111; //5 bits, 25-21
  const rt = (instr >> 16) & 0b11111; //5 bits, 20-16
  const immediate = (instr >> 0) & 0b1111111111111111; //16 bits, 15-0

  switch (opcode) {
    case 0b001000: {
      //ADDI
      const addi_instr: Addi_Instruction = {
        original: instr,
        op: OpInstr.addi,
        rs,
        rt,
        immediate,
        debug_view: `addi ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return addi_instr
    }
    case 0b001001: {
      //ADDIU
      const addiu_instr: Addiu_Instruction = {
        original: instr,
        op: OpInstr.addiu,
        rs,
        rt,
        immediate,
        debug_view: `addiu ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return addiu_instr
    }
    case 0b001010: {
      //SLTI
      const slti_instr: Slti_Instruction = {
        original: instr,
        op: OpInstr.slti,
        rs,
        rt,
        immediate,
        debug_view: `slti ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return slti_instr
    }
    case 0b001011: {
      //SLTIU
      const sltiu_instr: Sltiu_Instruction = {
        original: instr,
        op: OpInstr.sltiu,
        rs,
        rt,
        immediate,
        debug_view: `sltiu ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return sltiu_instr
    }
    case 0b001100: {
      //ANDI
      const andi_instr: Andi_Instruction = {
        original: instr,
        op: OpInstr.andi,
        rs,
        rt,
        immediate,
        debug_view: `andi ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return andi_instr
    }
    case 0b001101: {
      //ORI
      const ori_instr: Ori_Instruction = {
        original: instr,
        op: OpInstr.ori,
        rs,
        rt,
        immediate,
        debug_view: `ori ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return ori_instr
    }

    case 0b001110: {
      //XORI
      const xori_instr: Xori_Instruction = {
        original: instr,
        op: OpInstr.xori,
        rs,
        rt,
        immediate,
        debug_view: `xori ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return xori_instr
    }
    case 0b001111: {
      //LUI
      const lui_instr: Lui_Instruction = {
        original: instr,
        op: OpInstr.lui,
        rs: 0,
        rt,
        immediate,
        debug_view: `lui ${register_debug_view_prefix}${rt}, ${immediate}`,
      }
      return lui_instr
    }


    case 0b011000: {
      //DADDI
      const daddi_instr: Daddi_Instruction = {
        original: instr,
        op: OpInstr.daddi,
        rs,
        rt,
        immediate,
        debug_view: `daddi ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return daddi_instr
    }
    case 0b011001: {
      //DADDIU
      const daddi_instr: Daddiu_Instruction = {
        original: instr,
        op: OpInstr.daddiu,
        rs,
        rt,
        immediate,
        debug_view: `daddiu ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return daddi_instr
    }


  }

  const reserved_instr: Reserved_Instruction = {
    original: instr,
    op: OpInstr.reserved,
    debug_view: "reserved instruction",
  }

  return reserved_instr
}

//we don't have a reserved instruction catch here, as the calling function knows all op codes for this
function _decode_single_i_type_offset_instr(instr: int32): I_Type_Offset_Instruction | Cache_Instruction | Reserved_Instruction {

  //I-Type (ADDI, ADDIU, ANDI, BEQ, BGEZ, BGEZAL, BGEZALL, BGEZL, BGTZ, BLEZ, BLTZ, BLTZAL, BLTZALL, BLTZL, BNE, LB, LBU, LH, LHU, LUI, LW, ORI, SB, SH, SLTI, SLTIU, SW, XORI)

  //first 6 bits are opcode (e.g. ADDI)
  const opcode = instr >> 26;

  const base = (instr >> 21) & 0b11111; //5 bits, 25-21
  const rt = (instr >> 16) & 0b11111; //5 bits, 20-16
  const offset = (instr >> 0) & 0b1111111111111111; //16 bits, 15-0

  switch (opcode) {
    case 0b011010: {
      //LDL
      const ldl_instr: Ldl_Instruction = {
        original: instr,
        op: OpInstr.ldl,
        base,
        rt,
        offset,
        debug_view: `ldl ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return ldl_instr
    }
    case 0b011011: {
      //LDR
      const ldr_instr: Ldr_Instruction = {
        original: instr,
        op: OpInstr.ldr,
        base,
        rt,
        offset,
        debug_view: `ldr ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return ldr_instr
    }
    case 0b100000: {
      //LB
      const lb_instr: Lb_Instruction = {
        original: instr,
        op: OpInstr.lb,
        base,
        rt,
        offset,
        debug_view: `lb ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return lb_instr
    }
    case 0b100001: {
      //LH
      const lh_instr: Lh_Instruction = {
        original: instr,
        op: OpInstr.lh,
        base,
        rt,
        offset,
        debug_view: `lh ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return lh_instr
    }
    case 0b100010: {
      //LWL
      const lwl_instr: Lwl_Instruction = {
        original: instr,
        op: OpInstr.lwl,
        base,
        rt,
        offset,
        debug_view: `lwl ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return lwl_instr
    }
    case 0b100011: {
      //LW
      const lw_instr: Lw_Instruction = {
        original: instr,
        op: OpInstr.lw,
        base,
        rt,
        offset,
        debug_view: `lw ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return lw_instr
    }
    case 0b100100: {
      //LBU
      const lbu_instr: Lbu_Instruction = {
        original: instr,
        op: OpInstr.lbu,
        base,
        rt,
        offset,
        debug_view: `lbu ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return lbu_instr
    }
    case 0b100101: {
      //LHU
      const lhu_instr: Lhu_Instruction = {
        original: instr,
        op: OpInstr.lhu,
        base,
        rt,
        offset,
        debug_view: `lhu ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return lhu_instr
    }
    case 0b100110: {
      //LWR
      const lwr_instr: Lwr_Instruction = {
        original: instr,
        op: OpInstr.lwr,
        base,
        rt,
        offset,
        debug_view: `lwr ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return lwr_instr
    }
    case 0b100111: {
      //LWU
      const lwu_instr: Lwu_Instruction = {
        original: instr,
        op: OpInstr.lwu,
        base,
        rt,
        offset,
        debug_view: `lwu ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return lwu_instr
    }
    case 0b101000: {
      //SB
      const sb_instr: Sb_Instruction = {
        original: instr,
        op: OpInstr.sb,
        base,
        rt,
        offset,
        debug_view: `sb ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return sb_instr
    }
    case 0b101001: {
      //SH
      const sh_instr: Sh_Instruction = {
        original: instr,
        op: OpInstr.sh,
        base,
        rt,
        offset,
        debug_view: `sh ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return sh_instr
    }
    case 0b101010: {
      //SWL
      const swl_instr: Swl_Instruction = {
        original: instr,
        op: OpInstr.swl,
        base,
        rt,
        offset,
        debug_view: `swl ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return swl_instr
    }
    case 0b101011: {
      //SW
      const sw_instr: Sw_Instruction = {
        original: instr,
        op: OpInstr.sw,
        base,
        rt,
        offset,
        debug_view: `sw ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return sw_instr
    }
    case 0b101100: {
      //SDL
      const sdl_instr: Sdl_Instruction = {
        original: instr,
        op: OpInstr.sdl,
        base,
        rt,
        offset,
        debug_view: `sdl ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return sdl_instr
    }
    case 0b101101: {
      //SDR
      const sdr_instr: Sdr_Instruction = {
        original: instr,
        op: OpInstr.sdr,
        base,
        rt,
        offset,
        debug_view: `sdr ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return sdr_instr
    }
    case 0b101110: {
      //SWR
      const swr_instr: Swr_Instruction = {
        original: instr,
        op: OpInstr.swr,
        base,
        rt,
        offset,
        debug_view: `swr ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return swr_instr
    }
    case 0b101111: {
      //CACHE
      const cache_instr: Cache_Instruction = {
        original: instr,
        op: OpInstr.cache,
        base,
        operation: rt,
        offset,
        debug_view: `cache ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return cache_instr
    }
    case 0b110000: {
      //LL
      const ll_instr: Ll_Instruction = {
        original: instr,
        op: OpInstr.ll,
        base,
        rt,
        offset,
        debug_view: `ll ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return ll_instr
    }
    case 0b110001: {
      //LWCz --> LWC1
      const lwcz_instr: Lwc1_Instruction = {
        original: instr,
        op: OpInstr.lwc1,
        coprocessor: 1,
        base,
        rt,
        offset,
        debug_view: `lwc1 ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return lwcz_instr
    }
    case 0b110010: {
      //LWCz --> LWC2
      const lwcz_instr: Lwc2_Instruction = {
        original: instr,
        op: OpInstr.lwc2,
        coprocessor: 2,
        base,
        rt,
        offset,
        debug_view: `lwc2 ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return lwcz_instr
    }
    case 0b110100: {
      //LLD
      const lhu_instr: Lld_Instruction = {
        original: instr,
        op: OpInstr.lld,
        base,
        rt,
        offset,
        debug_view: `lld ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return lhu_instr
    }
    case 0b110101: {
      //LDCz --> LDC1
      const ldcz_instr: Ldc1_Instruction = {
        original: instr,
        op: OpInstr.ldc1,
        coprocessor: 1,
        base,
        rt,
        offset,
        debug_view: `ldc1 ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return ldcz_instr
    }
    case 0b110110: {
      //LDCz --> LDC2
      const ldcz_instr: Ldc2_Instruction = {
        original: instr,
        op: OpInstr.ldc2,
        coprocessor: 2,
        base,
        rt,
        offset,
        debug_view: `ldc2 ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return ldcz_instr
    }
    case 0b110111: {
      //LD
      const ld_instr: Ld_Instruction = {
        original: instr,
        op: OpInstr.ld,
        base,
        rt,
        offset,
        debug_view: `ld ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return ld_instr
    }
    case 0b111000: {
      //SC
      const sc_instr: Sc_Instruction = {
        original: instr,
        op: OpInstr.sc,
        base,
        rt,
        offset,
        debug_view: `sc ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return sc_instr
    }
    case 0b111001: {
      //SWCz --> SWC1
      const swcz_instr: Swc1_Instruction = {
        original: instr,
        op: OpInstr.swc1,
        coprocessor: 1,
        base,
        rt,
        offset,
        debug_view: `swc1 ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return swcz_instr
    }
    case 0b111010: {
      //SWCz --> SWC2
      const swcz_instr: Swc2_Instruction = {
        original: instr,
        op: OpInstr.swc2,
        coprocessor: 2,
        base,
        rt,
        offset,
        debug_view: `swc2 ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return swcz_instr
    }
    case 0b111100: {
      //SCD
      const scb_instr: Scd_Instruction = {
        original: instr,
        op: OpInstr.scd,
        base,
        rt,
        offset,
        debug_view: `scd ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return scb_instr
    }
    case 0b111101: {
      //SDCz --> SDC1
      const sdcz_instr: Sdc1_Instruction = {
        original: instr,
        op: OpInstr.sdc1,
        coprocessor: 1,
        base,
        rt,
        offset,
        debug_view: `sdc1 ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return sdcz_instr
    }
    case 0b111110: {
      //SDCz --> SDC2
      const sdcz_instr: Sdc2_Instruction = {
        original: instr,
        op: OpInstr.sdc2,
        coprocessor: 2,
        base,
        rt,
        offset,
        debug_view: `sdc2 ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return sdcz_instr
    }
    case 0b111111: {
      //SD
      const scb_instr: Sd_Instruction = {
        original: instr,
        op: OpInstr.sd,
        base,
        rt,
        offset,
        debug_view: `sd ${register_debug_view_prefix}${rt}, ${offset}(${register_debug_view_prefix}${base})`,
      }
      return scb_instr
    }

  }

  const reserved_instr: Reserved_Instruction = {
    original: instr,
    op: OpInstr.reserved,
    debug_view: "reserved instruction",
  }

  return reserved_instr

}

//we don't have a reserved instruction catch here, as the calling function knows all op codes for this
function _decode_single_i_type_branch_instr(instr: int32): I_Type_Branch_Instruction | Reserved_Instruction {

  //I-Type (ADDI, ADDIU, ANDI, BEQ, BGEZ, BGEZAL, BGEZALL, BGEZL, BGTZ, BLEZ, BLTZ, BLTZAL, BLTZALL, BLTZL, BNE, LB, LBU, LH, LHU, LUI, LW, ORI, SB, SH, SLTI, SLTIU, SW, XORI)

  //first 6 bits are opcode (e.g. ADDI)
  const opcode = instr >> 26;

  const rs = (instr >> 21) & 0b11111; //5 bits, 25-21
  const rt = (instr >> 16) & 0b11111; //5 bits, 20-16
  const offset = (instr >> 0) & 0b1111111111111111; //16 bits, 15-0

  switch (opcode) {
    case 0b000100: {
      //BEQ
      const beq_instr: Beq_Instruction = {
        original: instr,
        op: OpInstr.beq,
        rs,
        rt,
        offset,
        debug_view: `beq ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}, ${offset}`,
      }
      return beq_instr
    }
    case 0b000101: {
      //BNE
      const bne_instr: Bne_Instruction = {
        original: instr,
        op: OpInstr.bne,
        rs,
        rt,
        offset,
        debug_view: `bne ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}, ${offset}`,
      }
      return bne_instr
    }
    case 0b000110: {
      //BLEZ
      const blez_instr: Blez_Instruction = {
        original: instr,
        op: OpInstr.blez,
        rs,
        rt: 0,
        offset,
        debug_view: `blez ${register_debug_view_prefix}${rs}, ${offset}`,
      }
      return blez_instr
    }
    case 0b000111: {
      //BGTZ
      const bgtz_instr: Bgtz_Instruction = {
        original: instr,
        op: OpInstr.bgtz,
        rs,
        rt: 0,
        offset,
        debug_view: `bgtz ${register_debug_view_prefix}${rs}, ${offset}`,
      }
      return bgtz_instr
    }

    case 0b010100: {
      //BEQL
      const beql_instr: Beql_Instruction = {
        original: instr,
        op: OpInstr.beql,
        rs,
        rt,
        offset,
        debug_view: `beql ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}, ${offset}`,
      }
      return beql_instr
    }
    case 0b010101: {
      //BNEL
      const bnel_instr: Bnel_Instruction = {
        original: instr,
        op: OpInstr.bnel,
        rs,
        rt,
        offset,
        debug_view: `bnel ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rs}, ${offset}`,
      }
      return bnel_instr
    }
    case 0b010110: {
      //BLEZL
      const blezl_instr: Blezl_Instruction = {
        original: instr,
        op: OpInstr.blezl,
        rs,
        rt: 0,
        offset,
        debug_view: `blezl ${register_debug_view_prefix}${rs}, ${offset}`,
      }
      return blezl_instr
    }
    case 0b010111: {
      //BGTZL
      const bgtzl_instr: Bgtzl_Instruction = {
        original: instr,
        op: OpInstr.bgtzl,
        rs,
        rt: 0,
        offset,
        debug_view: `bgtzl ${register_debug_view_prefix}${rs}, ${offset}`,
      }
      return bgtzl_instr
    }

  }

  const reserved_instr: Reserved_Instruction = {
    original: instr,
    op: OpInstr.reserved,
    debug_view: "reserved instruction",
  }

  return reserved_instr
}


function _decode_single_i_type_regimm_instr(instr: int32): I_Type_Regimm_Immediate_Instruction | I_Type_Regimm_Offset_Instruction | Reserved_Instruction {

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
      const tgei_instr: Tgei_Instruction = {
        original: instr,
        op: OpInstr.regimm,
        rs,
        subOp,
        immediate,
        debug_view: `tgei ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return tgei_instr
    }
    case 0b01001: {
      //TGEIU
      const tgeiu_instr: Tgeiu_Instruction = {
        original: instr,
        op: OpInstr.regimm,
        rs,
        subOp,
        immediate,
        debug_view: `tgeiu ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return tgeiu_instr
    }
    case 0b01010: {
      //TLTI
      const tlti_instr: Tlti_Instruction = {
        original: instr,
        op: OpInstr.regimm,
        rs,
        subOp,
        immediate,
        debug_view: `tlti ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return tlti_instr
    }
    case 0b01011: {
      //TLTIU
      const tltiu_instr: Tltiu_Instruction = {
        original: instr,
        op: OpInstr.regimm,
        rs,
        subOp,
        immediate,
        debug_view: `tltiu ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return tltiu_instr
    }
    case 0b01100: {
      //TEQI
      const teqi_instr: Teqi_Instruction = {
        original: instr,
        op: OpInstr.regimm,
        rs,
        subOp,
        immediate,
        debug_view: `teqi ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return teqi_instr
    }
    case 0b01110: {
      //TNEI
      const tnei_instr: Tnei_Instruction = {
        original: instr,
        op: OpInstr.regimm,
        rs,
        subOp,
        immediate,
        debug_view: `tnei ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return tnei_instr
    }

    case 0b00000: {
      //BLTZ
      const bltz_instr: Bltz_Instruction = {
        original: instr,
        op: OpInstr.regimm,
        rs,
        subOp,
        offset: immediate,
        debug_view: `bltz ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return bltz_instr
    }
    case 0b00001: {
      //BGEZ
      const bgez_instr: Bgez_Instruction = {
        original: instr,
        op: OpInstr.regimm,
        rs,
        subOp,
        offset: immediate,
        debug_view: `bgez ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return bgez_instr
    }
    case 0b00010: {
      //BLTZL
      const bltzl_instr: Bltzl_Instruction = {
        original: instr,
        op: OpInstr.regimm,
        rs,
        subOp,
        offset: immediate,
        debug_view: `bltzl ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return bltzl_instr
    }
    case 0b00011: {
      //BGEZL
      const bgezl_instr: Bgezl_Instruction = {
        original: instr,
        op: OpInstr.regimm,
        rs,
        subOp,
        offset: immediate,
        debug_view: `bgezl ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return bgezl_instr
    }

    case 0b10000: {
      //BLTZAL
      const bltzal_instr: Bltzal_Instruction = {
        original: instr,
        op: OpInstr.regimm,
        rs,
        subOp,
        offset: immediate,
        debug_view: `bltzal ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return bltzal_instr
    }
    case 0b10001: {
      //BGEZAL
      const bgezal_instr: Bgezal_Instruction = {
        original: instr,
        op: OpInstr.regimm,
        rs,
        subOp,
        offset: immediate,
        debug_view: `bgezal ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return bgezal_instr
    }
    case 0b10010: {
      //BLTZALL
      const bltzall_instr: Bltzall_Instruction = {
        original: instr,
        op: OpInstr.regimm,
        rs,
        subOp,
        offset: immediate,
        debug_view: `bltzall ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return bltzall_instr
    }
    case 0b10011: {
      //BGEZALL
      const bgezall_instr: Bgezall_Instruction = {
        original: instr,
        op: OpInstr.regimm,
        rs,
        subOp,
        offset: immediate,
        debug_view: `bgezall ${register_debug_view_prefix}${rs}, ${immediate}`,
      }
      return bgezall_instr
    }
  }

  const reserved_instr: Reserved_Instruction = {
    original: instr,
    op: OpInstr.reserved,
    debug_view: "reserved instruction",
  }

  return reserved_instr

}

function _decode_single_j_type_instr(instr: int32): J_Type_Instruction | Reserved_Instruction {

  //first 6 bits are opcode (e.g. ADDI)
  const opcode = instr >> 26;

  //J-Type (J, JAL)
  const target = instr & 0b11111111111111111111111111; //26 bits, 25-0

  switch (opcode) {
    case 0b000010: {
      //J
      const j_instr: J_Instruction = {
        original: instr,
        op: OpInstr.j,
        target,
        debug_view: `j ${target}`,
      }
      return j_instr
    }
    case 0b000011: {
      //JAL
      const jal_instr: Jal_Instruction = {
        original: instr,
        op: OpInstr.jal,
        target,
        debug_view: `jal ${target}`,
      }
      return jal_instr
    }
  }

  const reserved_instr: Reserved_Instruction = {
    original: instr,
    op: OpInstr.reserved,
    debug_view: "reserved instruction",
  }

  return reserved_instr
}


function _decode_coprocessor_type_instr(instr: int32):
  Branch_Coprocessor_Instruction | MfcZ_Instruction
  | Dmfc0_Instruction | Dmfc1_Instruction
  | Cfc1_Instruction | Cfc2_Instruction
  | Mtc0_Instruction | Mtc1_Instruction | Mtc2_Instruction
  | Ctc1_Instruction | Ctc2_Instruction
  | Dmtc0_Instruction | Dmtc1_Instruction
  | Tlb_Instruction
  | Reserved_Instruction {

  //first 6 bits are opcode (e.g. ADDI)
  const opcode = instr >> 26;
  const coprocessorSubOpCode = (instr >> 21) & 0b11111; //5 bits, 25-21

  const isTlbInstr = (instr >> 25) & 0b1; //1 bit, 25

  if (isTlbInstr === 1) {
    //tlb instruction

    const tlbSubOpCode = instr & 0b111111; //6 bits, 5-0

    switch (tlbSubOpCode) {
      case 0b000001: {
        //TLBR
        const tlbr_instr: Tlbr_Instruction = {
          original: instr,
          op: OpInstr.coprocessor0_func,
          subOpCode: tlbSubOpCode,
          debug_view: "tlbr",
        }
        return tlbr_instr
      }
      case 0b000010: {
        //TLBWI
        const tlbwi_instr: Tlbwi_Instruction = {
          original: instr,
          op: OpInstr.coprocessor0_func,
          subOpCode: tlbSubOpCode,
          debug_view: "tlbwi",
        }
        return tlbwi_instr
      }
      case 0b000110: {
        //TLBWR
        const tlbwr_instr: Tlbwr_Instruction = {
          original: instr,
          op: OpInstr.coprocessor0_func,
          subOpCode: tlbSubOpCode,
          debug_view: "tlbwr",
        }
        return tlbwr_instr
      }
      case 0b001000: {
        //Tlbp
        const tlbp_instr: Tlbp_Instruction = {
          original: instr,
          op: OpInstr.coprocessor0_func,
          subOpCode: tlbSubOpCode,
          debug_view: "tlbp",
        }
        return tlbp_instr
      }
      case 0b011000: {
        //ERET
        const eret_instr: Eret_Instruction = {
          original: instr,
          op: OpInstr.coprocessor0_func,
          subOpCode: tlbSubOpCode,
          debug_view: "eret",
        }
        return eret_instr
      }
    }

  }

  switch (coprocessorSubOpCode) {

    case 0b00000: {
      //MFCz
      const rt = (instr >> 16) & 0b11111 //5 bits, 20-16
      const rd = (instr >> 11) & 0b11111 //5 bits, 15-11

      switch (opcode) {
        case 0b010000: { //coprocessor 0
          const mfc0_instr: Mfc0_Instruction = {
            original: instr,
            op: OpInstr.coprocessor0_func,
            coprocessor: 0,
            subOpCode: coprocessorSubOpCode,
            rt,
            rd,
            rest: 0,
            debug_view: `mfc0 ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rd}`,
          }
          return mfc0_instr
        }
        case 0b010001: { //coprocessor 1
          const mfc1_instr: Mfc1_Instruction = {
            original: instr,
            op: OpInstr.coprocessor1_func,
            coprocessor: 1,
            subOpCode: coprocessorSubOpCode,
            rt,
            rd,
            rest: 0,
            debug_view: `mfc1 ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rd}`,
          }
          return mfc1_instr
        }
        case 0b010010: { //coprocessor 2
          const mfc2_instr: Mfc2_Instruction = {
            original: instr,
            op: OpInstr.coprocessor2_func,
            coprocessor: 2,
            subOpCode: coprocessorSubOpCode,
            rt,
            rd,
            rest: 0,
            debug_view: `mfc2 ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rd}`,
          }
          return mfc2_instr
        }
      }
      break
    }

    case 0b00001: {
      //DMFCz

      const rt = (instr >> 16) & 0b11111 //5 bits, 20-16
      const rd_or_fs = (instr >> 11) & 0b11111 //5 bits, 15-11

      switch (opcode) {
        case 0b010000: { //coprocessor 0
          const mfc0_instr: Dmfc0_Instruction = {
            original: instr,
            op: OpInstr.coprocessor0_func,
            coprocessor: 0,
            subOpCode: coprocessorSubOpCode,
            rt,
            rd: rd_or_fs,
            rest: 0,
            debug_view: `dmfc0 ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rd_or_fs}`,
          }
          return mfc0_instr
        }
        case 0b010001: { //coprocessor 1
          const mfc1_instr: Dmfc1_Instruction = {
            original: instr,
            op: OpInstr.coprocessor1_func,
            coprocessor: 1,
            subOpCode: coprocessorSubOpCode,
            rt,
            fs: rd_or_fs,
            rest: 0,
            debug_view: `dmfc1 ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rd_or_fs}`,
          }
          return mfc1_instr
        }
      }
      break
    }

    case 0b00010: {
      //CFCz

      const rt = (instr >> 16) & 0b11111 //5 bits, 20-16
      const rd_or_fs = (instr >> 11) & 0b11111 //5 bits, 15-11

      switch (opcode) {
        case 0b010001: { //coprocessor 1
          const mfc0_instr: Cfc1_Instruction = {
            original: instr,
            op: OpInstr.coprocessor1_func,
            coprocessor: 1,
            subOpCode: coprocessorSubOpCode,
            rt,
            fs: rd_or_fs,
            rest: 0,
            debug_view: `cfc1 ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rd_or_fs}`,
          }
          return mfc0_instr
        }
        case 0b010010: { //coprocessor 2
          const mfc1_instr: Cfc2_Instruction = {
            original: instr,
            op: OpInstr.coprocessor2_func,
            coprocessor: 2,
            subOpCode: coprocessorSubOpCode,
            rt,
            rd: rd_or_fs,
            rest: 0,
            debug_view: `cfc2 ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rd_or_fs}`,
          }
          return mfc1_instr
        }
      }
      break
    }

    case 0b00100: {
      //MTCz
      const rt = (instr >> 16) & 0b11111 //5 bits, 20-16
      const rd_or_fs = (instr >> 11) & 0b11111 //5 bits, 15-11

      switch (opcode) {
        case 0b010000: { //coprocessor 0
          const mfc0_instr: Mtc0_Instruction = {
            original: instr,
            op: OpInstr.coprocessor0_func,
            coprocessor: 0,
            subOpCode: coprocessorSubOpCode,
            rt,
            rd: rd_or_fs,
            rest: 0,
            debug_view: `mtc0 ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rd_or_fs}`,
          }
          return mfc0_instr
        }
        case 0b010001: { //coprocessor 1
          const mfc1_instr: Mtc1_Instruction = {
            original: instr,
            op: OpInstr.coprocessor1_func,
            coprocessor: 1,
            subOpCode: coprocessorSubOpCode,
            rt,
            fs: rd_or_fs,
            rest: 0,
            debug_view: `mtc1 ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rd_or_fs}`,
          }
          return mfc1_instr
        }
        case 0b010010: { //coprocessor 2
          const mfc2_instr: Mtc2_Instruction = {
            original: instr,
            op: OpInstr.coprocessor2_func,
            coprocessor: 2,
            subOpCode: coprocessorSubOpCode,
            rt,
            rd: rd_or_fs,
            rest: 0,
            debug_view: `mtc2 ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rd_or_fs}`,
          }
          return mfc2_instr
        }
      }
      break
    }

    case 0b00101: {
      //DMTCz

      const rt = (instr >> 16) & 0b11111 //5 bits, 20-16
      const rd_or_fs = (instr >> 11) & 0b11111 //5 bits, 15-11

      switch (opcode) {
        case 0b010000: { //coprocessor 0
          const mfc0_instr: Dmtc0_Instruction = {
            original: instr,
            op: OpInstr.coprocessor0_func,
            coprocessor: 0,
            subOpCode: coprocessorSubOpCode,
            rt,
            rd: rd_or_fs,
            rest: 0,
            debug_view: `dmtc0 ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rd_or_fs}`,
          }
          return mfc0_instr
        }
        case 0b010001: { //coprocessor 1
          const mfc1_instr: Dmtc1_Instruction = {
            original: instr,
            op: OpInstr.coprocessor1_func,
            coprocessor: 1,
            subOpCode: coprocessorSubOpCode,
            rt,
            fs: rd_or_fs,
            rest: 0,
            debug_view: `dmtc1 ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rd_or_fs}`,
          }
          return mfc1_instr
        }
      }
      break
    }

    case 0b00110: {
      //CTCz
      const rt = (instr >> 16) & 0b11111 //5 bits, 20-16
      const rd_or_fs = (instr >> 11) & 0b11111 //5 bits, 15-11

      switch (opcode) {
        case 0b010001: { //coprocessor 1
          const mfc1_instr: Ctc1_Instruction = {
            original: instr,
            op: OpInstr.coprocessor1_func,
            coprocessor: 1,
            subOpCode: coprocessorSubOpCode,
            rt,
            fs: rd_or_fs,
            rest: 0,
            debug_view: `ctc1 ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rd_or_fs}`,
          }
          return mfc1_instr
        }
        case 0b010010: { //coprocessor 2
          const mfc2_instr: Ctc2_Instruction = {
            original: instr,
            op: OpInstr.coprocessor2_func,
            coprocessor: 2,
            subOpCode: coprocessorSubOpCode,
            rt,
            rd: rd_or_fs,
            rest: 0,
            debug_view: `ctc2 ${register_debug_view_prefix}${rt}, ${register_debug_view_prefix}${rd_or_fs}`,
          }
          return mfc2_instr
        }
      }
      break
    }

    case 0b01000: {
      //some branch with condition

      const branchCondition = (instr >> 16) & 0b11111; //5 bits, 20-16
      const offset = (instr >> 0) & 0b1111111111111111; //16 bits, 15-0

      switch (branchCondition) {
        case 0b00000: {
          //BCzF
          switch (opcode) {
            case 0b010000: { //coprocessor 0
              const bc1f_instr: Bc0f_Instruction = {
                original: instr,
                op: OpInstr.coprocessor0_func,
                coprocessor: 0,
                subOpCode: coprocessorSubOpCode,
                branchCondition: BranchConditionCode.bcf,
                offset,
                debug_view: `bc0f ${offset}`,
              }
              return bc1f_instr
            }
            case 0b010001: { //coprocessor 1
              const bc1f_instr: Bc1f_Instruction = {
                original: instr,
                op: OpInstr.coprocessor1_func,
                coprocessor: 1,
                subOpCode: coprocessorSubOpCode,
                branchCondition: BranchConditionCode.bcf,
                offset,
                debug_view: `bc1f ${offset}`,
              }
              return bc1f_instr
            }
            case 0b010010: { //coprocessor 2
              const bc1f_instr: Bc2f_Instruction = {
                original: instr,
                op: OpInstr.coprocessor2_func,
                coprocessor: 2,
                subOpCode: coprocessorSubOpCode,
                branchCondition: BranchConditionCode.bcf,
                offset,
                debug_view: `bc2f ${offset}`,
              }
              return bc1f_instr
            }
          }
          break
        }

        case 0b00010: {
          //BCzFL
          switch (opcode) {
            case 0b010000: { //coprocessor 0
              const bc1f_instr: Bc0fl_Instruction = {
                original: instr,
                op: OpInstr.coprocessor0_func,
                coprocessor: 0,
                subOpCode: coprocessorSubOpCode,
                branchCondition: BranchConditionCode.bcfl,
                offset,
                debug_view: `bc0fl ${offset}`,
              }
              return bc1f_instr
            }
            case 0b010001: { //coprocessor 1
              const bc1f_instr: Bc1fl_Instruction = {
                original: instr,
                op: OpInstr.coprocessor1_func,
                coprocessor: 1,
                subOpCode: coprocessorSubOpCode,
                branchCondition: BranchConditionCode.bcfl,
                offset,
                debug_view: `bc1fl ${offset}`,
              }
              return bc1f_instr
            }
            case 0b010010: { //coprocessor 2
              const bc1f_instr: Bc2fl_Instruction = {
                original: instr,
                op: OpInstr.coprocessor2_func,
                coprocessor: 2,
                subOpCode: coprocessorSubOpCode,
                branchCondition: BranchConditionCode.bcfl,
                offset,
                debug_view: `bc2fl ${offset}`,
              }
              return bc1f_instr
            }
          }
          break
        }

        case 0b00001: {
          //BCzT
          switch (opcode) {
            case 0b010000: { //coprocessor 0
              const bc1f_instr: Bc0t_Instruction = {
                original: instr,
                op: OpInstr.coprocessor0_func,
                coprocessor: 0,
                subOpCode: coprocessorSubOpCode,
                branchCondition: BranchConditionCode.bct,
                offset,
                debug_view: `bc0t ${offset}`,
              }
              return bc1f_instr
            }
            case 0b010001: { //coprocessor 1
              const bc1f_instr: Bc1t_Instruction = {
                original: instr,
                op: OpInstr.coprocessor1_func,
                coprocessor: 1,
                subOpCode: coprocessorSubOpCode,
                branchCondition: BranchConditionCode.bct,
                offset,
                debug_view: `bc1t ${offset}`,
              }
              return bc1f_instr
            }
            case 0b010010: { //coprocessor 2
              const bc1f_instr: Bc2t_Instruction = {
                original: instr,
                op: OpInstr.coprocessor2_func,
                coprocessor: 2,
                subOpCode: coprocessorSubOpCode,
                branchCondition: BranchConditionCode.bct,
                offset,
                debug_view: `bc2t ${offset}`,
              }
              return bc1f_instr
            }
          }
          break
        }

        case 0b00011: {
          //BCzTL
          switch (opcode) {
            case 0b010000: { //coprocessor 0
              const bc1f_instr: Bc0tl_Instruction = {
                original: instr,
                op: OpInstr.coprocessor0_func,
                coprocessor: 0,
                subOpCode: coprocessorSubOpCode,
                branchCondition: BranchConditionCode.bctl,
                offset,
                debug_view: `bc0tl ${offset}`,
              }
              return bc1f_instr
            }
            case 0b010001: { //coprocessor 1
              const bc1f_instr: Bc1tl_Instruction = {
                original: instr,
                op: OpInstr.coprocessor1_func,
                coprocessor: 1,
                subOpCode: coprocessorSubOpCode,
                branchCondition: BranchConditionCode.bctl,
                offset,
                debug_view: `bc1tl ${offset}`,
              }
              return bc1f_instr
            }
            case 0b010010: { //coprocessor 2
              const bc1f_instr: Bc2tl_Instruction = {
                original: instr,
                op: OpInstr.coprocessor2_func,
                coprocessor: 2,
                subOpCode: coprocessorSubOpCode,
                branchCondition: BranchConditionCode.bctl,
                offset,
                debug_view: `bc2tl ${offset}`,
              }
              return bc1f_instr
            }
          }
          break
        }
      }
      break
    }

  }

  //not in default because we might have an invalid coprocessor for some instructions?

  const reserved_instr: Reserved_Instruction = {
    original: instr,
    op: OpInstr.reserved,
    debug_view: "reserved instruction",
  }

  return reserved_instr

}
