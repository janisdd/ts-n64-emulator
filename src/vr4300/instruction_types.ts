export type int32 = number
export type int64 = number
export type float = number
export type float64 = number

export type int26 = number // 26 bits
export type int20 = number // 20 bits
export type int19 = number // 19 bits
export type int16 = number // 16 bits
export type int11 = number // 11 bits
export type int10 = number // 10 bits
export type int6 = number // 6 bits
export type int5 = number // 5 bits
export type int1 = number // 1 bit

export interface InstructionOld {
  opcode: int32,
}

export interface Instruction {
  original: int32
  debug_view: string
}


/**
 * register
 */
export interface R_Type_Instruction extends Instruction {
  op: OpInstr //int6
  rs: int5
  rt: int5
  rd: int5
  sa: int5
  func: FuncInstr //int6
}

/**
 * operations encoded in the first 6 bits (opcode)
 */
export enum OpInstr {
  reserved = -1,
  special = 0b000000,
  regimm = 0b000001,

  addi = 0b001000,
  addiu = 0b001001,

  andi = 0b001100,

  beq = 0b000100,
  beql = 0b010100,
  bgtz = 0b000111,
  bgtzl = 0b010111,
  blez = 0b000110,
  blezl = 0b010110,
  bne = 0b000101,
  bnel = 0b010101,

  cache = 0b101111,

  daddi = 0b011000,
  daddiu = 0b011001,
  j = 0b000010,
  jal = 0b000011,
  lb = 0b100000,
  lbu = 0b100100,
  ld = 0b110111,
  ldc1 = 0b110101,
  ldc2 = 0b110110,
  ldl = 0b011010,
  ldr = 0b011011,
  lh = 0b100001,
  lhu = 0b100101,
  ll = 0b110000,
  lld = 0b110100,
  lui = 0b001111,
  lw = 0b100011,
  lwc1 = 0b110001,
  lwc2 = 0b110010,
  lwl = 0b100010,
  lwr = 0b100110,
  lwu = 0b100111,

  ori = 0b001101,
  sb = 0b101000,
  sc = 0b111000,
  scd = 0b111100,
  sd = 0b111111,
  sdc1 = 0b111101,
  sdc2 = 0b111110,
  sdl = 0b101100,
  sdr = 0b101101,
  sh = 0b101001,
  slti = 0b001010,
  sltiu = 0b001011,
  swl = 0b101010,
  sw = 0b101011,
  swr = 0b101110,
  swc1 = 0b111001,
  swc2 = 0b111010,

  xori = 0b001110,


  coprocessor0_func = 0b010000,
  coprocessor1_func = 0b010001,
  coprocessor2_func = 0b010010,
}

/**
 * operations encoded in the last 6 bits (funct)
 */
export enum FuncInstr {
  add = 0b100000,
  addu = 0b100001,
  and = 0b100100,
  dadd = 0b101100,
  daddu = 0b101101,
  ddiv = 0b011110,
  ddivu = 0b011111,
  div = 0b011010,
  divu = 0b011011,
  dmult = 0b011100,
  dmultu = 0b011101,
  dsll = 0b111000,
  dsllv = 0b010100,
  dsll32 = 0b111100,
  dsra = 0b111011,
  dsrav = 0b010111,
  dsra32 = 0b111111,
  dsrl = 0b111010,
  dsrlv = 0b010110,
  dsrl32 = 0b111110,
  dsub = 0b101110,
  dsubu = 0b101111,
  jalr = 0b001001,
  jr = 0b001000,

  mult = 0b011000,
  multu = 0b011001,
  nor = 0b100111,
  or = 0b100101,

  sll = 0b000000,
  sllv = 0b000100,
  slt = 0b101010,
  sltu = 0b101011,
  sra = 0b000011,
  srav = 0b000111,
  srl = 0b000010,
  srlv = 0b000110,
  sub = 0b100010,
  subu = 0b100011,
  sync = 0b001111,
  syscall = 0b001100,
  teq = 0b110100,
  tge = 0b110000,
  tgeu = 0b110001,
  tlt = 0b110010,
  tltu = 0b110011,
  tne = 0b110110,
  xor = 0b100110,
}


export enum RegimmInstr {
  bltz = 0b00000,
  bgez = 0b00001,
  bltzl = 0b00010,
  bgezl = 0b00011,
  bltzal = 0b10000,
  bgezal = 0b10001,
  bltzall = 0b10010,
  bgezall = 0b10011,

  tgei = 0b01000,
  tgeiu = 0b01001,
  tlti = 0b01010,
  tltiu = 0b01011,
  teqi = 0b01100,
  tnei = 0b01110,
}

//bits 25-21
export enum CoprocessorSubOpCode {
  mf = 0b00000,
  dmf = 0b00001,
  cf = 0b00010,
  mt = 0b00100,
  dmt = 0b00101,
  ct = 0b00110,
  bc = 0b01000,
}


//bits 20-16
export enum BranchConditionCode {
  bcf = 0b00000,
  bcfl = 0b00010,
  bct = 0b00001,
  bctl = 0b00011,
}


export enum TlbOpCode {
  tlbr = 0b000001,
  tlbwi = 0b000010,
  tlbwr = 0b000110,
  tlbp = 0b001000,
  eret = 0b011000,
}

//--- op code: special, R_Type_Instruction ---

// * in the manual
export interface Reserved_Instruction extends Instruction {
  op: OpInstr.reserved
}

export interface Add_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.add
}

export interface Addu_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.addu
}

export interface And_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.and
}

export interface Dadd_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.dadd
}

export interface Daddu_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.daddu
}

export interface Ddiv_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rd: 0
  sa: 0
  func: FuncInstr.ddiv
}

export interface Ddivu_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rd: 0
  sa: 0
  func: FuncInstr.ddivu
}

export interface Div_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rd: 0
  sa: 0
  func: FuncInstr.div
}

export interface Divu_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rd: 0
  sa: 0
  func: FuncInstr.divu
}

export interface Dmult_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rd: 0
  sa: 0
  func: FuncInstr.dmult
}

export interface Dmultu_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rd: 0
  sa: 0
  func: FuncInstr.dmultu
}

export interface Dsll_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  func: FuncInstr.dsll
}

export interface Dsllv_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.dsllv
}

export interface Dsll32_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rs: 0
  func: FuncInstr.dsll32
}

export interface Dsra_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rs: 0
  func: FuncInstr.dsra
}

export interface Dsrav_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.dsrav
}

export interface Dsra32_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rs: 0
  func: FuncInstr.dsra32
}

export interface Dsrl_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rs: 0
  func: FuncInstr.dsrl
}

export interface Dsrlv_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.dsrlv
}

export interface Dsrl32_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rs: 0
  func: FuncInstr.dsrl32
}

export interface Dsub_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.dsub
}

export interface Dsubu_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.dsubu
}

export interface Jalr_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rt: 0
  rd: int5 | 31 //31 is the default (when omitted in the assembly language)
  sa: 0
  func: FuncInstr.jalr
}

export interface Jr_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rt: 0
  rd: 0
  sa: 0
  func: FuncInstr.jr
}

export interface Mult_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rd: 0
  sa: 0
  func: FuncInstr.mult
}

export interface Multu_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rd: 0
  sa: 0
  func: FuncInstr.multu
}

export interface Nor_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.nor
}

export interface Or_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.or
}

export interface Sll_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rs: 0
  func: FuncInstr.sll
}

export interface Sllv_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.sllv
}

export interface Slt_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.slt
}

export interface Sltu_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.sltu
}

export interface Sra_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rs: 0
  func: FuncInstr.sra
}

export interface Srav_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.srav
}

export interface Srl_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rs: 0
  func: FuncInstr.srl
}

export interface Srlv_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.srlv
}

export interface Sub_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.sub
}

export interface Subu_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.subu
}

export interface Sync_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rs: 0
  rt: 0
  rd: 0
  sa: 0
  func: FuncInstr.sync
}

export interface Syscall_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rs: 0 //set to null to make unusable
  rt: 0
  rd: 0
  sa: 0
  code: int20
  func: FuncInstr.syscall
}

export interface Teq_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rd: 0
  sa: 0
  code: int10
  func: FuncInstr.teq
}

export interface Tge_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rd: 0
  sa: 0
  code: int10
  func: FuncInstr.tge
}

export interface Tgeu_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rd: 0
  sa: 0
  code: int10
  func: FuncInstr.tgeu
}

export interface Tlt_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rd: 0
  sa: 0
  code: int10
  func: FuncInstr.tlt
}

export interface Tltu_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rd: 0
  sa: 0
  code: int10
  func: FuncInstr.tltu
}

export interface Tne_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  rd: 0
  sa: 0
  code: int10
  func: FuncInstr.tne
}

export interface Xor_Instruction extends R_Type_Instruction {
  op: OpInstr.special
  sa: 0
  func: FuncInstr.xor
}

//--- END op code: special, R_Type_Instruction ---


export interface I_Type_Regimm_Immediate_Instruction extends Instruction {
  op: OpInstr.regimm
  rs: int5
  subOp: RegimmInstr
  immediate: int16
}

export interface Tgei_Instruction extends I_Type_Regimm_Immediate_Instruction {
  subOp: RegimmInstr.tgei
}

export interface Tgeiu_Instruction extends I_Type_Regimm_Immediate_Instruction {
  subOp: RegimmInstr.tgeiu
}

export interface Tlti_Instruction extends I_Type_Regimm_Immediate_Instruction {
  subOp: RegimmInstr.tlti
}

export interface Tltiu_Instruction extends I_Type_Regimm_Immediate_Instruction {
  subOp: RegimmInstr.tltiu
}

export interface Teqi_Instruction extends I_Type_Regimm_Immediate_Instruction {
  subOp: RegimmInstr.teqi
}

export interface Tnei_Instruction extends I_Type_Regimm_Immediate_Instruction {
  subOp: RegimmInstr.tnei
}

export interface I_Type_Regimm_Offset_Instruction extends Instruction {
  op: OpInstr.regimm
  rs: int5
  subOp: RegimmInstr
  offset: int16
}

export interface Bltz_Instruction extends I_Type_Regimm_Offset_Instruction {
  subOp: RegimmInstr.bltz
}

export interface Bgez_Instruction extends I_Type_Regimm_Offset_Instruction {
  subOp: RegimmInstr.bgez
}

export interface Bltzl_Instruction extends I_Type_Regimm_Offset_Instruction {
  subOp: RegimmInstr.bltzl
}

export interface Bgezl_Instruction extends I_Type_Regimm_Offset_Instruction {
  subOp: RegimmInstr.bgezl
}

export interface Bltzal_Instruction extends I_Type_Regimm_Offset_Instruction {
  subOp: RegimmInstr.bltzal
}

export interface Bgezal_Instruction extends I_Type_Regimm_Offset_Instruction {
  subOp: RegimmInstr.bgezal
}

export interface Bltzall_Instruction extends I_Type_Regimm_Offset_Instruction {
  subOp: RegimmInstr.bltzall
}

export interface Bgezall_Instruction extends I_Type_Regimm_Offset_Instruction {
  subOp: RegimmInstr.bgezall
}


export interface I_Type_Branch_Instruction extends Instruction {
  op: OpInstr
  rs: int5
  rt: int5
  offset: int16
}

export interface Beq_Instruction extends I_Type_Branch_Instruction {
  op: OpInstr.beq
}

export interface Bne_Instruction extends I_Type_Branch_Instruction {
  op: OpInstr.bne
}

export interface Blez_Instruction extends I_Type_Branch_Instruction {
  op: OpInstr.blez
  rt: 0
}

export interface Bgtz_Instruction extends I_Type_Branch_Instruction {
  op: OpInstr.bgtz
  rt: 0
}

export interface Beql_Instruction extends I_Type_Branch_Instruction {
  op: OpInstr.beql
}

export interface Bnel_Instruction extends I_Type_Branch_Instruction {
  op: OpInstr.bnel
}

export interface Blezl_Instruction extends I_Type_Branch_Instruction {
  op: OpInstr.blezl
  rt: 0
}

export interface Bgtzl_Instruction extends I_Type_Branch_Instruction {
  op: OpInstr.bgtzl
  rt: 0
}


/**
 * immediate
 */
export interface I_Type_Instruction extends Instruction {
  op: OpInstr
  rs: int5
  rt: int5
  immediate: int16
}

export interface Addi_Instruction extends I_Type_Instruction {
  op: OpInstr.addi
}

export interface Addiu_Instruction extends I_Type_Instruction {
  op: OpInstr.addiu
}

export interface Slti_Instruction extends I_Type_Instruction {
  op: OpInstr.slti
}

export interface Sltiu_Instruction extends I_Type_Instruction {
  op: OpInstr.sltiu
}

export interface Andi_Instruction extends I_Type_Instruction {
  op: OpInstr.andi
}

export interface Ori_Instruction extends I_Type_Instruction {
  op: OpInstr.ori
}

export interface Xori_Instruction extends I_Type_Instruction {
  op: OpInstr.xori
}

export interface Lui_Instruction extends I_Type_Instruction {
  op: OpInstr.lui
  rs: 0
}

export interface Daddi_Instruction extends I_Type_Instruction {
  op: OpInstr.daddi
}

export interface Daddiu_Instruction extends I_Type_Instruction {
  op: OpInstr.daddiu
}


export interface I_Type_Offset_Instruction extends Instruction {
  op: OpInstr
  base: int5
  rt: int5
  offset: int16
}

export interface Ldl_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.ldl
}

export interface Ldr_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.ldr
}

export interface Lb_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.lb
}

export interface Lh_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.lh
}

export interface Lwl_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.lwl
}

export interface Lw_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.lw
}

export interface Lbu_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.lbu
}

export interface Lhu_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.lhu
}

export interface Lwr_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.lwr
}

export interface Lwu_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.lwu
}

export interface Sb_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.sb
}

export interface Sh_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.sh
}

export interface Swl_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.swl
}

export interface Sw_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.sw
}

export interface Sdl_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.sdl
}

export interface Sdr_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.sdr
}

export interface Swr_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.swr
}

export interface Ll_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.ll
}

export interface Lld_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.lld
}

export interface Ld_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.ld
}

export interface Sc_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.sc
}

export interface Scd_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.scd
}

export interface Sd_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.sd
}

export interface I_Type_Float_Offset_Instruction extends Instruction {
  op: OpInstr
  coprocessor: 1 | 2
  base: int5
  rt: int5
  offset: int16
}

export interface Ldc1_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.ldc1
  coprocessor: 1
}

export interface Ldc2_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.ldc2
  coprocessor: 2
}

export interface Lwc1_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.lwc1
  coprocessor: 1
}

export interface Lwc2_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.lwc2
  coprocessor: 2
}

export interface Sdc1_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.sdc1
  coprocessor: 1
}

export interface Sdc2_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.sdc2
  coprocessor: 2
}

export interface Swc1_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.swc1
  coprocessor: 1
}

export interface Swc2_Instruction extends I_Type_Offset_Instruction {
  op: OpInstr.swc2
  coprocessor: 2
}


export interface Cache_Instruction extends Instruction {
  op: OpInstr.cache
  base: int5
  operation: int5
  offset: int16
}


//COPz rt
export interface Branch_Coprocessor_Instruction extends Instruction {
  op: OpInstr
  coprocessor: 0 | 1 | 2
  subOpCode: CoprocessorSubOpCode
  branchCondition: BranchConditionCode
  offset: int16
}


export interface Bc0f_Instruction extends Branch_Coprocessor_Instruction {
  op: OpInstr.coprocessor0_func
  coprocessor: 0
  subOpCode: CoprocessorSubOpCode.bc
  branchCondition: BranchConditionCode.bcf
}

export interface Bc1f_Instruction extends Branch_Coprocessor_Instruction {
  op: OpInstr.coprocessor1_func
  coprocessor: 1
  subOpCode: CoprocessorSubOpCode.bc
  branchCondition: BranchConditionCode.bcf
}

export interface Bc2f_Instruction extends Branch_Coprocessor_Instruction {
  op: OpInstr.coprocessor2_func
  coprocessor: 2
  subOpCode: CoprocessorSubOpCode.bc
  branchCondition: BranchConditionCode.bcf
}


export interface Bc0fl_Instruction extends Branch_Coprocessor_Instruction {
  op: OpInstr.coprocessor0_func
  coprocessor: 0
  subOpCode: CoprocessorSubOpCode.bc
  branchCondition: BranchConditionCode.bcfl
}

export interface Bc1fl_Instruction extends Branch_Coprocessor_Instruction {
  op: OpInstr.coprocessor1_func
  coprocessor: 1
  subOpCode: CoprocessorSubOpCode.bc
  branchCondition: BranchConditionCode.bcfl
}

export interface Bc2fl_Instruction extends Branch_Coprocessor_Instruction {
  op: OpInstr.coprocessor2_func
  coprocessor: 2
  subOpCode: CoprocessorSubOpCode.bc
  branchCondition: BranchConditionCode.bcfl
}


export interface Bc0t_Instruction extends Branch_Coprocessor_Instruction {
  op: OpInstr.coprocessor0_func
  coprocessor: 0
  subOpCode: CoprocessorSubOpCode.bc
  branchCondition: BranchConditionCode.bct
}

export interface Bc1t_Instruction extends Branch_Coprocessor_Instruction {
  op: OpInstr.coprocessor1_func
  coprocessor: 1
  subOpCode: CoprocessorSubOpCode.bc
  branchCondition: BranchConditionCode.bct
}

export interface Bc2t_Instruction extends Branch_Coprocessor_Instruction {
  op: OpInstr.coprocessor2_func
  coprocessor: 2
  subOpCode: CoprocessorSubOpCode.bc
  branchCondition: BranchConditionCode.bct
}


export interface Bc0tl_Instruction extends Branch_Coprocessor_Instruction {
  op: OpInstr.coprocessor0_func
  coprocessor: 0
  subOpCode: CoprocessorSubOpCode.bc
  branchCondition: BranchConditionCode.bctl
}

export interface Bc1tl_Instruction extends Branch_Coprocessor_Instruction {
  op: OpInstr.coprocessor1_func
  coprocessor: 1
  subOpCode: CoprocessorSubOpCode.bc
  branchCondition: BranchConditionCode.bctl
}

export interface Bc2tl_Instruction extends Branch_Coprocessor_Instruction {
  op: OpInstr.coprocessor2_func
  coprocessor: 2
  subOpCode: CoprocessorSubOpCode.bc
  branchCondition: BranchConditionCode.bctl
}


//COPz rs

export interface MfcZ_Instruction extends Instruction {
  op: OpInstr.coprocessor0_func | OpInstr.coprocessor1_func | OpInstr.coprocessor2_func
  coprocessor: 0 | 1 | 2
  subOpCode: CoprocessorSubOpCode.mf
  rt: int5
  rd: int5
  rest: 0
}

export interface Mfc0_Instruction extends MfcZ_Instruction {
  op: OpInstr.coprocessor0_func
  coprocessor: 0
  subOpCode: CoprocessorSubOpCode.mf
}

export interface Mfc1_Instruction extends MfcZ_Instruction {
  op: OpInstr.coprocessor1_func
  coprocessor: 1
  subOpCode: CoprocessorSubOpCode.mf
}

export interface Mfc2_Instruction extends MfcZ_Instruction {
  op: OpInstr.coprocessor2_func
  coprocessor: 2
  subOpCode: CoprocessorSubOpCode.mf
}


export interface Dmfc0_Instruction extends Instruction {
  op: OpInstr.coprocessor0_func
  coprocessor: 0
  subOpCode: CoprocessorSubOpCode.dmf
  rt: int5
  rd: int5
  rest: 0
}

export interface Dmfc1_Instruction extends Instruction {
  op: OpInstr.coprocessor1_func
  coprocessor: 1
  subOpCode: CoprocessorSubOpCode.dmf
  rt: int5
  fs: int5
  rest: 0
}

export interface Dmfc1_Instruction extends Instruction {
  op: OpInstr.coprocessor1_func
  coprocessor: 1
  subOpCode: CoprocessorSubOpCode.dmf
  rt: int5
  fs: int5
  rest: 0
}


export interface Dmtc0_Instruction extends Instruction {
  op: OpInstr.coprocessor0_func
  coprocessor: 0
  subOpCode: CoprocessorSubOpCode.dmt
  rt: int5
  rd: int5
  rest: 0
}

export interface Dmtc1_Instruction extends Instruction {
  op: OpInstr.coprocessor1_func
  coprocessor: 1
  subOpCode: CoprocessorSubOpCode.dmt
  rt: int5
  fs: int5
  rest: 0
}


export interface Cfc1_Instruction extends Instruction {
  op: OpInstr.coprocessor1_func
  coprocessor: 1
  subOpCode: CoprocessorSubOpCode.cf
  rt: int5
  fs: int5
  rest: 0
}

export interface Cfc2_Instruction extends Instruction {
  op: OpInstr.coprocessor2_func
  coprocessor: 2
  subOpCode: CoprocessorSubOpCode.cf
  rt: int5
  rd: int5
  rest: 0
}


export interface Mtc0_Instruction extends Instruction {
  op: OpInstr.coprocessor0_func
  coprocessor: 0
  subOpCode: CoprocessorSubOpCode.mt
  rt: int5
  rd: int5
  rest: 0
}

export interface Mtc1_Instruction extends Instruction {
  op: OpInstr.coprocessor1_func
  coprocessor: 1
  subOpCode: CoprocessorSubOpCode.mt
  rt: int5
  fs: int5
  rest: 0
}

export interface Mtc2_Instruction extends Instruction {
  op: OpInstr.coprocessor2_func
  coprocessor: 2
  subOpCode: CoprocessorSubOpCode.mt
  rt: int5
  rd: int5
  rest: 0
}

export interface Ctc1_Instruction extends Instruction {
  op: OpInstr.coprocessor1_func
  coprocessor: 1
  subOpCode: CoprocessorSubOpCode.ct
  rt: int5
  fs: int5
  rest: 0
}

export interface Ctc2_Instruction extends Instruction {
  op: OpInstr.coprocessor2_func
  coprocessor: 2
  subOpCode: CoprocessorSubOpCode.ct
  rt: int5
  rd: int5
  rest: 0
}


/**
 * jump
 */
export interface J_Type_Instruction extends Instruction {
  original: int32
  op: OpInstr
  target: int26
}

export interface J_Instruction extends Instruction {
  op: OpInstr.j
  target: int26
}

export interface Jal_Instruction extends Instruction {
  op: OpInstr.jal
  target: int26
}


//TLB instructions

export interface Tlb_Instruction extends Instruction {
  op: OpInstr.coprocessor0_func
  // coprocessor: 1
  // unused: int19 & 0
  subOpCode: TlbOpCode
}

export interface Tlbr_Instruction extends Tlb_Instruction {
  subOpCode: TlbOpCode.tlbr
}

export interface Tlbwi_Instruction extends Tlb_Instruction {
  subOpCode: TlbOpCode.tlbwi
}

export interface Tlbwr_Instruction extends Tlb_Instruction {
  subOpCode: TlbOpCode.tlbwr
}

export interface Tlbp_Instruction extends Tlb_Instruction {
  subOpCode: TlbOpCode.tlbp
}

export interface Eret_Instruction extends Tlb_Instruction {
  subOpCode: TlbOpCode.eret
}

