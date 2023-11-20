import {z} from "zod";
import {decode_single_binary_instructions} from './cpu_instructions'


//see https://en.wikipedia.org/wiki/Executable_and_Linkable_Format

//TODO add types for all tables
//file header
//section header
//program header


const int1 = z.number().int().min(0).max(0xFF) // 1 byte
type Int1 = z.infer<typeof int1>

const int2 = z.number().int().min(0).max(0xFFFF) // 2 bytes
type Int2 = z.infer<typeof int2>

const int4 = z.number().int().min(0).max(0xFFFFFF) // 4 bytes
type Int4 = z.infer<typeof int4>

const int7 = z.number().int().min(0).max(0xFFFFFF) // 7 bytes - bigInt but we only support 32bit (4 bytes)
type Int7 = z.infer<typeof int7>

const int8 = z.number().int().min(0).max(0xFFFFFF) // 8 bytes - bigInt but we only support 32bit (4 bytes)
type Int8 = z.infer<typeof int8>


/**
 * just for number passing as reference
 */
type Cursor = {
  offset: number
}

const uInt8Schema: z.ZodType<Uint8Array> = z.custom<Uint8Array>((val: any) => {
  return val instanceof Uint8Array;
});

const ElHeader32Schema = z.object({
  // /**
  //  * 0x7F followed by ELF(45 4c 46) in ASCII; these four bytes constitute the magic number
  //  */
  // e_ident_magic: z.number().int(),

  /**
   * This byte is set to either 1 or 2 to signify 32- or 64-bit format, respectively
   */
  e_ident_class: z.union([z.literal(1), z.literal(2)]),
  _is32bit: z.boolean(),

  /**
   * This byte is set to either 1 or 2 to signify little or big endianness, respectively
   */
  e_ident_data: z.union([z.literal(1), z.literal(2)]),
  _isLittleEndian: z.boolean(),


  /**
   * Set to 1 for the original and current version of ELF
   */
  e_ident_version: int1,

  /**
   * Identifies the target operating system ABI
   */
  e_ident_osabi: int1,
  e_ident_osabi_name: z.string(),

  /**
   * Further specifies the ABI version
   */
  e_ident_abiversion: int1,

  /**
   * This byte is reserved and must be set to zero
   */
  e_ident_pad: int7,

  /**
   * Identifies object file type
   */
  e_type: int2,
  e_type_name: z.string(),

  /**
   * Specifies target instruction set architecture
   */
  e_machine: int2,
  e_machine_name: z.string(),

  /**
   * Set to 1 for the original version of ELF
   */
  e_version: int4,

  /**
   * This is the memory address of the entry point from where the process starts executing.
   * This field is either 32 or 64 bits long, depending on the format defined earlier (byte 0x04).
   * If the file doesn't have an associated entry point, then this holds zero.
   */
  e_entry: int4,

  /**
   * Points to the start of the program header table.
   * It usually follows the file header immediately following this one,
   *   making the offset 0x34 or 0x40 for 32- and 64-bit ELF executables, respectively.
   */
  e_phoff: int4,

  /**
   * Points to the start of the section header table.
   * The value is 0 for files that don't have a section header table.
   */
  e_shoff: int4,

  /**
   * Interpretation of this field depends on the target architecture
   */
  e_flags: int4,

  /**
   * Contains the size of this header, normally 64 Bytes for 64-bit and 52 Bytes for 32-bit format.
   */
  e_ehsize: int2,

  /**
   * Contains the size of a program header table entry.
   */
  e_phentsize: int2,

  /**
   * Contains the number of entries in the program header table.
   */
  e_phnum: int2,

  /**
   * Contains the size of a section header table entry.
   */
  e_shentsize: int2,

  /**
   * Contains the number of entries in the section header table.
   */
  e_shnum: int2,

  /**
   * Contains index of the section header table entry that contains the section names.
   */
  e_shstrndx: int2,

})

type ElHeader32 = z.infer<typeof ElHeader32Schema>

const ElSectionHeader32SChema = z.object({

  /**
   * An offset to a string in the .shstrtab section that represents the name of this section.
   */
  sh_name: int4,
  _name: z.string(),

  /**
   * Identifies the type of this header.
   */
  sh_type: int4,
  sh_type_name: z.string(),

  /**
   * Identifies the attributes of the section.
   */
  sh_flags: int4,
  p_flags_names: z.array(z.string()),

  /**
   * Virtual address of the section in memory, for sections that are loaded.
   */
  sh_addr: int4,

  /**
   * Offset of the section in the file image.
   */
  sh_offset: int4,

  /**
   * Size in bytes of the section in the file image. May be 0.
   */
  sh_size: int4,

  /**
   * Contains the section index of an associated section.
   * This field is used for several purposes, depending on the type of section.
   */
  sh_link: int4,

  /**
   * Contains extra information about the section.
   * This field is used for several purposes, depending on the type of section.
   */
  sh_info: int4,

  /**
   * Contains the required alignment of the section.
   * This field must be a power of two.
   */
  sh_addralign: int4.multipleOf(2),

  /**
   * Contains the size, in bytes, of each entry, for sections that contain fixed-size entries.
   * Otherwise, this field contains zero.
   */
  sh_entsize: int4,

  sectionData: uInt8Schema,
})

type ElSectionHeader32 = z.infer<typeof ElSectionHeader32SChema>

const ProgramHeader32Schema = z.object({
  /**
   * Identifies the type of the segment.
   */
  p_type: int4,
  p_type_name: z.string(),

  /**
   * Offset of the segment in the file image.
   */
  p_offset: int4,

  /**
   * Virtual address of the segment in memory.
   */
  p_vaddr: int4,

  /**
   * On systems where physical address is relevant, reserved for segment's physical address.
   */
  p_paddr: int4,

  /**
   * Size in bytes of the segment in the file image.
   * It may be zero.
   */
  p_filesz: int4,

  /**
   * Size in bytes of the segment in memory.
   * It may be zero.
   */
  p_memsz: int4,

  /**
   * Segment-dependent flags (position in file, logical address or otherwise).
   */
  p_flags: int4,
  p_flags_names: z.array(z.string()),

  /**
   * 0 and 1 specify no alignment.
   * Otherwise, should be a positive, integral power of 2, with p_vaddr equating p_offset modulus p_align.
   */
  p_align: int4,

  sectionData: uInt8Schema,
})

type ProgramHeader32 = z.infer<typeof ProgramHeader32Schema>


const ElfFileSchema = z.object({
  header: ElHeader32Schema,
  sectionHeaders: z.array(ElSectionHeader32SChema),
  programHeaders: z.array(ProgramHeader32Schema),
})

type ElfFile = z.infer<typeof ElfFileSchema>


class Elf_decoder {
  private constructor() {
  }


  public static _test() {

    /*
    asm(".set noreorder");

    int main() {
  int i = 2;
  int j = i * 2;
  char* str = "Hello World\n";
  char* str2 = "Janis\n";
// 	printf("Hello World\n");
	return 5;
}
     */
    const _test = `7f45 4c46 0102 0100 0000 0000 0000 0000
0001 0008 0000 0001 0000 0000 0000 0000
0000 0240 5000 1005 0034 0000 0000 0028
0010 0001 0000 0000 0000 0000 0000 0000
27bd ffe0 afbf 001c afbe 0018 03a0 f025
afc0 0014 2401 0002 af23 2323 8fc1 0010
0001 0840 afc1 000c 3c01 0000 2421 0000
afc1 0008 3c01 0000 2421 0000 afc1 0004
2402 0005 03c0 e825 8fbe 0018 8fbf 001c
27bd 0020 03e0 0008 0000 0000 0000 0000
c000 0000 ffff fffc 0000 0000 0000 0000
0000 0020 0000 001e 0000 001f 4865 6c6c
6f20 576f 726c 640a 004a 616e 6973 0a00
0048 6f6d 6562 7265 7720 636c 616e 6720
7665 7273 696f 6e20 3137 2e30 2e34 0000
e000 0007 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 2001 0101 0005
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
0000 0063 0000 0000 0000 0000 0400 fff1
0000 0028 0000 0000 0000 000d 0100 0007
0000 008e 0000 000d 0000 0007 0100 0007
0000 0040 0000 0000 0000 005c 1200 0002
0000 0028 0000 0205 0000 002c 0000 0206
0000 0034 0000 0305 0000 0038 0000 0306
0000 0000 0000 0402 002e 7265 6c2e 7465
7874 002e 636f 6d6d 656e 7400 2e62 7373
002e 4d49 5053 2e61 6269 666c 6167 7300
242e 7374 7200 2e72 656c 2e70 6472 002e
7265 6769 6e66 6f00 6d61 696e 002e 6e6f
7465 2e47 4e55 2d73 7461 636b 002e 6c6c
766d 5f61 6464 7273 6967 006d 6169 6e2e
6300 2e73 7472 7461 6200 2e73 796d 7461
6200 2e64 6174 6100 2e6d 6465 6275 672e
6162 6933 3200 242e 7374 722e 3100 2e72
6f64 6174 612e 7374 7231 2e31 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 006a 0000 0003
0000 0000 0000 0000 0000 0198 0000 00a5
0000 0000 0000 0000 0000 0001 0000 0000
0000 0005 0000 0001 0000 0006 0000 0000
0000 0040 0000 005c 0000 0000 0000 0000
0000 0010 0000 0000 0000 0001 0000 0009
0000 0040 0000 0000 0000 0170 0000 0020
0000 000f 0000 0002 0000 0004 0000 0008
0000 0080 0000 0001 0000 0000 0000 0000
0000 009c 0000 0000 0000 0000 0000 0000
0000 0001 0000 0000 0000 0032 0000 0001
0000 0000 0000 0000 0000 009c 0000 0020
0000 0000 0000 0000 0000 0004 0000 0000
0000 002e 0000 0009 0000 0040 0000 0000
0000 0190 0000 0008 0000 000f 0000 0005
0000 0004 0000 0008 0000 0096 0000 0001
0000 0032 0000 0000 0000 00bc 0000 0014
0000 0000 0000 0000 0000 0001 0000 0001
0000 000b 0000 0001 0000 0030 0000 0000
0000 00d0 0000 001f 0000 0000 0000 0000
0000 0001 0000 0001 0000 0045 0000 0001
0000 0000 0000 0000 0000 00ef 0000 0000
0000 0000 0000 0000 0000 0001 0000 0000
0000 007a 0000 0001 0000 0003 0000 0000
0000 00f0 0000 0000 0000 0000 0000 0000
0000 0010 0000 0000 0000 0014 0000 0008
0000 0003 0000 0000 0000 00f0 0000 0000
0000 0000 0000 0000 0000 0010 0000 0000
0000 0037 7000 0006 0000 0002 0000 0000
0000 00f0 0000 0018 0000 0000 0000 0000
0000 0004 0000 0018 0000 0019 7000 002a
0000 0002 0000 0000 0000 0108 0000 0018
0000 0000 0000 0000 0000 0008 0000 0018
0000 0055 6fff 4c03 8000 0000 0000 0000
0000 0198 0000 0000 0000 000f 0000 0000
0000 0001 0000 0000 0000 0072 0000 0002
0000 0000 0000 0000 0000 0120 0000 0050
0000 0001 0000 0004 0000 0004 0000 0010`

    const bytes = _test.split(/[ \n]/gm).map(p => [p.substring(0, 2), p.substring(2)]).flat().map((x) => parseInt(x, 16))
    const buffer = new Uint8Array(bytes)

    const elfFile = this.decode(buffer)

    const programInstructionsEncoded = elfFile.sectionHeaders.find(p => p._name === '.text')!.sectionData

    const view = new DataView(programInstructionsEncoded.buffer)

    const size = programInstructionsEncoded.length / 4 //32 bit instructions

    const allInstrs = []

    //TODO sw/lw not decoded correctly
    //sll r0 r0 0 --> nop
    // addiu with negative number not shown
    // addiu immediate wrong: 	addiu	$1, $1, %lo($.str) | addiu at,at,0x5c

    //byteOffset is required because section data is just a subarray of the original buffer (passed to decode)
    for (let i = 0; i < size; i++) {
      const instructionBytes = view.getUint32(i * 4 + programInstructionsEncoded.byteOffset, elfFile.header._isLittleEndian)

      const instr = decode_single_binary_instructions(instructionBytes)
      allInstrs.push(instr)
      console.log(instr)
    }


    console.log(allInstrs.map(p => p?.debug_view ?? `unknown instruction`))
    console.log(allInstrs)
  }


  public static decode(binary: Uint8Array): ElfFile {
    const view = new DataView(binary.buffer)

    const cursor: Cursor = {
      offset: 0
    }

    const fileHeader = this._decode_file_header(binary, view, cursor)

    const allSectionHeaders = this._decode_all_section_headers(binary, view, fileHeader)

    const allProgramHeaders = this._decode_all_program_headers(binary, view, fileHeader)

    console.log(fileHeader)
    console.log(allSectionHeaders)
    console.log(allProgramHeaders)

    return {
      header: fileHeader,
      sectionHeaders: allSectionHeaders,
      programHeaders: allProgramHeaders,
    }

    //program header
    // if (fileHeader.e_phnum > 0) {
    //
    //   if (bitFormat === 32) {
    //
    //     const offset = programHeaderTableStart_e_phoff as number
    //
    //     let cursor2 = 0
    //     const segmentType_p_type = view.getUint32(offset + cursor2, isLittleEndian)
    //     cursor2 += 4
    //
    //     const p_offset = view.getUint32(offset + cursor2, isLittleEndian)
    //     cursor2 += 4
    //     const p_vaddr = view.getUint32(offset + cursor2, isLittleEndian)
    //     cursor2 += 4
    //     const p_paddr = view.getUint32(offset + cursor2, isLittleEndian)
    //     cursor2 += 4
    //     const p_filesz = view.getUint32(offset + cursor2, isLittleEndian)
    //     cursor2 += 4
    //     const p_memsz = view.getUint32(offset + cursor2, isLittleEndian)
    //     cursor2 += 4
    //     const p_flags = view.getUint32(offset + cursor2, isLittleEndian)
    //     cursor2 += 4
    //     const p_align = view.getUint32(offset + cursor2, isLittleEndian)
    //     cursor2 += 4
    //
    //     const endOfProgramHeader = view.getUint8(offset + cursor2)
    //     cursor2 += 1
    //
    //   } else {
    //
    //     if (programHeaderTableStart_e_phoff > 0x100000000) { //max unsigned 32bit
    //       throw new Error('64bit not supported')
    //     }
    //
    //     const offset = programHeaderTableStart_e_phoff as number
    //
    //
    //     let cursor2: number = 0
    //     const segmentType_p_type = view.getUint32(offset + cursor2, isLittleEndian)
    //     cursor2 += 4
    //
    //     const p_flags = view.getBigUint64(offset + cursor2, isLittleEndian)
    //     cursor2 += 8
    //
    //     const p_offset = view.getBigUint64(offset + cursor2, isLittleEndian)
    //     cursor2 += 8
    //     const p_vaddr = view.getBigUint64(offset + cursor2, isLittleEndian)
    //     cursor2 += 8
    //     const p_paddr = view.getBigUint64(offset + cursor2, isLittleEndian)
    //     cursor2 += 8
    //     const p_filesz = view.getBigUint64(offset + cursor2, isLittleEndian)
    //     cursor2 += 8
    //     const p_memsz = view.getBigUint64(offset + cursor2, isLittleEndian)
    //     cursor2 += 8
    //     const p_align = view.getBigUint64(offset + cursor2, isLittleEndian)
    //     cursor2 += 8
    //
    //     const endOfProgramHeader = view.getUint8(offset + cursor2)
    //     cursor2 += 1
    //   }
    //
    // }


  }


  public static _decode_file_header(binary: Uint8Array, view: DataView, _cursor: Cursor): ElHeader32 {

    let cursor = 0
    const maigcNumber = view.getUint32(cursor)
    cursor += 4
    const bitFormat = view.getUint8(cursor) == 1
                      ? 32
                      : 64

    if (bitFormat === 64) {
      throw new Error('64bit not supported')
    }

    cursor += 1
    const endian = view.getUint8(cursor) == 1
                   ? 'little'
                   : 'big'
    const isLittleEndian = endian == 'little'
    cursor += 1
    const version = view.getUint8(cursor)
    cursor += 1
    const abi = view.getUint8(cursor)
    cursor += 1
    const abiVersion = view.getUint8(cursor)
    cursor += 1
    const padding = view.getUint8(cursor)
    cursor += 7
    const type = view.getUint16(cursor, isLittleEndian)
    cursor += 2
    const machine = view.getUint16(cursor, isLittleEndian)
    cursor += 2
    const version2 = view.getUint32(cursor, isLittleEndian)
    cursor += 4

    let entryPoint_e_entry: number // | bigint
    let programHeaderTableStart_e_phoff: number // | bigint
    let sectionHeaderTableStart_e_shoff: number // | bigint

    // if (bitFormat === 32) {
    entryPoint_e_entry = view.getUint32(cursor, isLittleEndian)
    cursor += 4
    programHeaderTableStart_e_phoff = view.getUint32(cursor, isLittleEndian)
    cursor += 4
    sectionHeaderTableStart_e_shoff = view.getUint32(cursor, isLittleEndian)
    cursor += 4
    // } else {
    // entryPoint_e_entry = view.getBigUint64(cursor, isLittleEndian)
    // cursor += 8
    // programHeaderTableStart_e_phoff = view.getBigUint64(cursor, isLittleEndian)
    // cursor += 8
    // sectionHeaderTableStart_e_shoff = view.getBigUint64(cursor, isLittleEndian)
    // cursor += 8
    // }

    const flags = view.getUint32(cursor, isLittleEndian) // Interpretation of this field depends on the target architecture.
    cursor += 4
    const headerSize_e_ehsize = view.getUint16(cursor, isLittleEndian) // Contains the size of this header, normally 64 Bytes for 64-bit and 52 Bytes for 32-bit format.
    cursor += 2
    const programHeaderTableEntrySize_e_phentsize = view.getUint16(cursor, isLittleEndian) // Contains the size of a program header table entry.
    cursor += 2
    const programHeaderTableEntriesCount_e_phnum = view.getUint16(cursor, isLittleEndian) // Contains the number of entries in the program header table.
    cursor += 2
    const sectionHeaderTableEntrySize_e_shentsize = view.getUint16(cursor, isLittleEndian) // Contains the size of a section header table entry.
    cursor += 2
    const sectionHeaderTableEntriesCount_e_shnum = view.getUint16(cursor, isLittleEndian) // Contains the number of entries in the section header table.
    cursor += 2
    const shstrndx_e_shstrndx = view.getUint16(cursor, isLittleEndian) // Contains index of the section header table entry that contains the section names.
    cursor += 2

    const endOfHeader = view.getUint8(cursor)
    cursor += 1

    const elfHeader: ElHeader32 = {
      e_ident_class: 1,
      _is32bit: bitFormat === 32,
      e_ident_data: endian == 'little'
                    ? 1
                    : 2,
      _isLittleEndian: endian == 'little',
      e_ident_version: version,
      e_ident_osabi: abi,
      e_ident_osabi_name: this._get_osabi_name(abi),
      e_ident_abiversion: abiVersion,
      e_ident_pad: padding,
      e_type: type,
      e_type_name: this._get_elf_type_name(type),
      e_machine: machine,
      e_machine_name: this._get_machine_isa_name(machine),
      e_version: version2,
      e_entry: entryPoint_e_entry,
      e_phoff: programHeaderTableStart_e_phoff,
      e_shoff: sectionHeaderTableStart_e_shoff,
      e_flags: flags,
      e_ehsize: headerSize_e_ehsize,
      e_phentsize: programHeaderTableEntrySize_e_phentsize,
      e_phnum: programHeaderTableEntriesCount_e_phnum,
      e_shentsize: sectionHeaderTableEntrySize_e_shentsize,
      e_shnum: sectionHeaderTableEntriesCount_e_shnum,
      e_shstrndx: shstrndx_e_shstrndx,
    }

    _cursor.offset = cursor

    return elfHeader
  }

  public static _decode_all_section_headers(binary: Uint8Array, view: DataView, fileHeader: ElHeader32): ElSectionHeader32[] {

    const isLittleEndian = fileHeader._isLittleEndian

    let sectionNameBytes: Uint8Array = new Uint8Array(0)

    const allSectionHeaders: ElSectionHeader32[] = []

    const offset = fileHeader.e_shoff as number

    //section header
    //see https://man7.org/linux/man-pages/man5/elf.5.html
    for (let i = 0; i < fileHeader.e_shnum; i++) {

      let cursor2 = i * fileHeader.e_shentsize

      const sh_name = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4

      const sh_type = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4

      // if (bitFormat === 32) {

      const sh_flags = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4

      const sh_addr = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4
      const sh_offset = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4
      const sh_size = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4

      const sh_link = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4
      const sh_info = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4

      const sh_addralign = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4
      const sh_entsize = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4

      if (i === fileHeader.e_shstrndx) {
        sectionNameBytes = binary.subarray(sh_offset, sh_offset + sh_size)
      }

      //get the section data
      let sectionData: Uint8Array = new Uint8Array(0)

      if (sh_size > 0) {
        sectionData = binary.subarray(sh_offset, sh_offset + sh_size)
      }

      // } else {
      //
      //   const sh_flags = view.getBigUint64(offset + cursor2, isLittleEndian)
      //   cursor2 += 8
      //
      //   const sh_addr = view.getBigUint64(offset + cursor2, isLittleEndian)
      //   cursor2 += 8
      //   const sh_offset = view.getBigUint64(offset + cursor2, isLittleEndian)
      //   cursor2 += 8
      //   const sh_size = view.getBigUint64(offset + cursor2, isLittleEndian)
      //   cursor2 += 8
      //
      //   const sh_link = view.getUint32(offset + cursor2, isLittleEndian)
      //   cursor2 += 4
      //   const sh_info = view.getUint32(offset + cursor2, isLittleEndian)
      //   cursor2 += 4
      //
      //   const sh_addralign = view.getBigUint64(offset + cursor2, isLittleEndian)
      //   cursor2 += 8
      //   const sh_entsize = view.getBigUint64(offset + cursor2, isLittleEndian)
      //   cursor2 += 8
      //
      // }

      const sectionHeader: ElSectionHeader32 = {
        sh_name,
        _name: '',
        sh_type,
        sh_type_name: this._get_section_header_type_name(sh_type),
        sh_flags,
        p_flags_names: this._get_section_header_flag_names32(sh_flags),
        sh_addr,
        sh_offset,
        sh_size,
        sh_link,
        sh_info,
        sh_addralign,
        sh_entsize,
        sectionData,
      }

      allSectionHeaders.push(sectionHeader)
    }


    //after all section headers are parsed, set the names
    const decoder = new TextDecoder('utf-8')

    for (let i = 0; i < allSectionHeaders.length; i++) {
      const sectionHeader = allSectionHeaders[i]

      //first byte is \0 and last byte is \0
      //every entry is null (\0) terminated

      let j = sectionHeader.sh_name
      let byte = 1

      while (byte !== 0) {
        byte = sectionNameBytes[j]
        j++
      }

      const nameBytes = sectionNameBytes.subarray(sectionHeader.sh_name, j-1)
      const sectionName = decoder.decode(nameBytes)
      sectionHeader._name = sectionName
    }

    return allSectionHeaders
  }

  public static _decode_all_program_headers(binary: Uint8Array, view: DataView, fileHeader: ElHeader32): ProgramHeader32[] {

    const isLittleEndian = fileHeader._isLittleEndian

    const allProgramHeaders: ProgramHeader32[] = []

    const offset = fileHeader.e_phoff as number

    //program header
    for (let i = 0; i < fileHeader.e_phnum; i++) {

      let cursor2 = i * fileHeader.e_phentsize

      const p_type = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4

      const p_offset = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4

      const p_vaddr = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4

      const p_paddr = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4

      const p_filesz = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4

      const p_memsz = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4

      const p_flags = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4

      const p_align = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4

      let sectionData = new Uint8Array(0)

      if (p_filesz > 0) {
        sectionData = binary.subarray(p_offset, p_offset + p_filesz)
      }

      const programHeader: ProgramHeader32 = {
        p_type,
        p_type_name: this._get_program_header_type_name(p_type),
        p_offset,
        p_vaddr,
        p_paddr,
        p_filesz,
        p_memsz,
        p_flags,
        p_flags_names: this._get_program_header_flag_names32(p_flags),
        p_align,
        sectionData,
      }

      allProgramHeaders.push(programHeader)
    }

    return allProgramHeaders

  }


  public static _get_osabi_name(osabi: Int1): string {
    switch (osabi) {
      case 0x00: return 'System V'
      case 0x01: return 'HP-UX'
      case 0x02: return 'NetBSD'
      case 0x03: return 'Linux'
      case 0x04: return 'GNU Hurd'
      case 0x06: return 'Solaris'
      case 0x07: return 'AIX'
      case 0x08: return 'IRIX'
      case 0x09: return 'FreeBSD'
      case 0x0A: return 'Tru64'
      case 0x0B: return 'Novell Modesto'
      case 0x0C: return 'OpenBSD'
      case 0x0D: return 'OpenVMS'
      case 0x0E: return 'NonStop Kernel'
      case 0x0F: return 'AROS'
      case 0x10: return 'Fenix OS'
      case 0x11: return 'Nuxi CloudABI'
      case 0x12: return 'Stratus Technologies OpenVOS'
      default: return 'unknown'
    }
  }

  public static _get_elf_type_name(type: Int2): string {

    switch (type) {
      case 0x00: return 'ET_NONE' + ' (unknown)'
      case 0x01: return 'EL_REL' + ' (Relocatable file)'
      case 0x02: return 'ET_EXEC' + ' (Executable file)'
      case 0x03: return 'ET_DYN' + ' (Shared object file)'
      case 0x04: return 'ET_CORE' + ' (Core file)'
    }

    //or a range?
    if (type >= 0xFE00 && type <= 0xFEFF) {
      return 'OS specific' + ' (Reserved inclusive range)' // ET_LOOS - ET_HIOS
    }

    if (type >= 0xFF00 && type <= 0xFFFF) {
      return 'Processor specific' + ' (Reserved inclusive range.)' // ET_LOPROC - ET_HIPROC
    }

    return 'unknown'
  }

  //instruction set architecture
  public static _get_machine_isa_name(type: Int2): string {

    switch (type) {
      case 0x00:	return 'No specific instruction set'
      case 0x01:	return 'AT&T WE 32100'
      case 0x02:	return 'SPARC'
      case 0x03:	return 'x86'
      case 0x04:	return 'Motorola 68000 (M68k)'
      case 0x05:	return 'Motorola 88000 (M88k)'
      case 0x06:	return 'Intel MCU'
      case 0x07:	return 'Intel 80860'
      case 0x08:	return 'MIPS'
      case 0x09:	return 'IBM System/370'
      case 0x0A:	return 'MIPS RS3000 Little-endian'
      // case 0x0B-0x0E: return 'Reserved for future use'
      case 0x0F:	return 'Hewlett-Packard PA-RISC'
      case 0x13:	return 'Intel 80960'
      case 0x14:	return 'PowerPC'
      case 0x15:	return 'PowerPC (64-bit)'
      case 0x16:	return 'S390, including S390x'
      case 0x17:	return 'IBM SPU/SPC'
      // case 0x18 - 0x23: return 'Reserved for future use'
      case 0x24:	return 'NEC V800'
      case 0x25:	return 'Fujitsu FR20'
      case 0x26:	return 'TRW RH-32'
      case 0x27:	return 'Motorola RCE'
      case 0x28:	return 'Arm (up to Armv7/AArch32)'
      case 0x29:	return 'Digital Alpha'
      case 0x2A:	return 'SuperH'
      case 0x2B:	return 'SPARC Version 9'
      case 0x2C:	return 'Siemens TriCore embedded processor'
      case 0x2D:	return 'Argonaut RISC Core'
      case 0x2E:	return 'Hitachi H8/300'
      case 0x2F:	return 'Hitachi H8/300H'
      case 0x30:	return 'Hitachi H8S'
      case 0x31:	return 'Hitachi H8/500'
      case 0x32:	return 'IA-64'
      case 0x33:	return 'Stanford MIPS-X'
      case 0x34:	return 'Motorola ColdFire'
      case 0x35:	return 'Motorola M68HC12'
      case 0x36:	return 'Fujitsu MMA Multimedia Accelerator'
      case 0x37:	return 'Siemens PCP'
      case 0x38:	return 'Sony nCPU embedded RISC processor'
      case 0x39:	return 'Denso NDR1 microprocessor'
      case 0x3A:	return 'Motorola Star*Core processor'
      case 0x3B:	return 'Toyota ME16 processor'
      case 0x3C:	return 'STMicroelectronics ST100 processor'
      case 0x3D:	return 'Advanced Logic Corp. TinyJ embedded processor family'
      case 0x3E:	return 'AMD x86-64'
      case 0x3F:	return 'Sony DSP Processor'
      case 0x40:	return 'Digital Equipment Corp. PDP-10'
      case 0x41:	return 'Digital Equipment Corp. PDP-11'
      case 0x42:	return 'Siemens FX66 microcontroller'
      case 0x43:	return 'STMicroelectronics ST9+ 8/16 bit microcontroller'
      case 0x44:	return 'STMicroelectronics ST7 8-bit microcontroller'
      case 0x45:	return 'Motorola MC68HC16 Microcontroller'
      case 0x46:	return 'Motorola MC68HC11 Microcontroller'
      case 0x47:	return 'Motorola MC68HC08 Microcontroller'
      case 0x48:	return 'Motorola MC68HC05 Microcontroller'
      case 0x49:	return 'Silicon Graphics SVx'
      case 0x4A:	return 'STMicroelectronics ST19 8-bit microcontroller'
      case 0x4B:	return 'Digital VAX'
      case 0x4C:	return 'Axis Communications 32-bit embedded processor'
      case 0x4D:	return 'Infineon Technologies 32-bit embedded processor'
      case 0x4E:	return 'Element 14 64-bit DSP Processor'
      case 0x4F:	return 'LSI Logic 16-bit DSP Processor'
      case 0x8C:	return 'TMS320C6000 Family'
      case 0xAF:	return 'MCST Elbrus e2k'
      case 0xB7:	return 'Arm 64-bits (Armv8/AArch64)'
      case 0xDC:	return 'Zilog Z80'
      case 0xF3:	return 'RISC-V'
      case 0xF7:	return 'Berkeley Packet Filter'
      case 0x101:	return 'WDC 65C816'
    }

    if (type >= 0x0B && type <= 0x0E) {
      return 'Reserved for future use'
    }

    if (type >= 0x18 && type <= 0x23) {
      return 'Reserved for future use'
    }

    return 'unknown'
  }

  public static _get_section_header_type_name(type: Int4): string {

    switch (type) {
      case 0x0: return 'SHT_NULL' + ' (Section header table entry unused)'
      case 0x1: return 'SHT_PROGBITS' + ' (Program data)'
      case 0x2: return 'SHT_SYMTAB' + ' (Symbol table)'
      case 0x3: return 'SHT_STRTAB' + ' (String table)'
      case 0x4: return 'SHT_RELA' + ' (Relocation entries with addends)'
      case 0x5: return 'SHT_HASH' + ' (Symbol hash table)'
      case 0x6: return 'SHT_DYNAMIC' + ' (Dynamic linking information)'
      case 0x7: return 'SHT_NOTE' + ' (Notes)'
      case 0x8: return 'SHT_NOBITS' + ' (Program space with no data (bss))'
      case 0x9: return 'SHT_REL' + ' (Relocation entries, no addends)'
      case 0x0A: return 'SHT_SHLIB' + ' (Reserved)'
      case 0x0B: return 'SHT_DYNSYM' + ' (Dynamic linker symbol table)'
      case 0x0E: return 'SHT_INIT_ARRAY' + ' (Array of constructors)'
      case 0x0F: return 'SHT_FINI_ARRAY' + ' (Array of destructors)'
      case 0x10: return 'SHT_PREINIT_ARRAY' + ' (Array of pre-constructors)'
      case 0x11: return 'SHT_GROUP' + ' (Section group)'
      case 0x12: return 'SHT_SYMTAB_SHNDX' + ' (Extended section indices)'
      case 0x13: return 'SHT_NUM' + ' (Number of defined types.)'
    }

    if (type >= 0x60000000) {
      return 'SHT_LOOS' + ' (Start OS-specific.)'
    }

    return 'unknown'
  }

  public static _get_section_header_flag_names32(type: Int4): string[] {
    //we can have multiple flags in one section header

    const flags: string[] = []

    if (type & 0x1) {
      flags.push('SHF_WRITE' + ' (Writable)')
    }
    if (type & 0x2) {
      flags.push('SHF_ALLOC' + ' (Occupies memory during execution)')
    }
    if (type & 0x4) {
      flags.push('SHF_EXECINSTR' + ' (Executable)')
    }
    if (type & 0x10) {
      flags.push('SHF_MERGE' + ' (Might be merged)')
    }
    if (type & 0x20) {
      flags.push('SHF_STRINGS' + ' (Contains nul-terminated strings)')
    }
    if (type & 0x40) {
      //'sh_info' contains SHT index
      flags.push('SHF_INFO_LINK' + ' (`sh_info' + ' points to a `SHT' + '_DYNAMIC' + ' section)')
    }
    if (type & 0x80) {
      flags.push('SHF_LINK_ORDER' + ' (Preserve order after combining)')
    }
    if (type & 0x100) {
      flags.push('SHF_OS_NONCONFORMING' + ' (Non-standard OS specific handling required)')
    }
    if (type & 0x200) {
      flags.push('SHF_GROUP' + ' (Section is member of a group)')
    }
    if (type & 0x400) {
      flags.push('SHF_TLS' + ' (Section hold thread-local data)')
    }
    if (type & 0x0ff00000) {
      flags.push('SHF_MASKOS' + ' (OS-specific)')
    }
    if (type & 0xf0000000) {
      flags.push('SHF_MASKPROC' + ' (Processor-specific)')
    }
    if (type & 0x4000000) {
      flags.push('SHF_ORDERED' + ' (Special ordering requirement (Solaris))')
    }
    if (type & 0x8000000) {
      flags.push('SHF_EXCLUDE' + ' (Section is excluded unless referenced or allocated (Solaris))')
    }

    return flags
  }

  public static _get_program_header_type_name(type: Int4): string {

    switch (type) {
      case 0x00000000: return 'PT_NULL' + '(Program header table entry unused)'
      case 0x00000001: return 'PT_LOAD' + '(Loadable segment)'
      case 0x00000002: return 'PT_DYNAMIC' + '(Dynamic linking information)'
      case 0x00000003: return 'PT_INTERP' + '(Interpreter information)'
      case 0x00000004: return 'PT_NOTE' + '(Auxiliary information)'
      case 0x00000005: return 'PT_SHLIB' + '(Reserved)'
      case 0x00000006: return 'PT_PHDR' + '(Segment containing program header table itself)'
      case 0x00000007: return 'PT_TLS' + '(Thread-Local Storage template)'
    }

    if (type >= 0x60000000 && type <= 0x6FFFFFFF) {
      return '(Start of OS-specific)' //PT_LOOS - PT_HIOS
    }

    if (type >= 0x70000000 && type <= 0x7FFFFFFF) {
      return '(Start of processor-specific)' //PT_LOPROC - PT_HIPROC
    }

    return 'unknown'
  }

  public static _get_program_header_flag_names32(type: Int4): string[] {
    //we can have multiple flags in one program header

    const flags: string[] = []

    if (type & 0x1) {
      flags.push('PF_X' + ' (Executable segment)')
    }
    if (type & 0x2) {
      flags.push('PF_W' + ' (Writeable segment)')
    }
    if (type & 0x4) {
      flags.push('PF_R' + ' (Readable segment)')
    }

    return flags
  }

}

Elf_decoder._test()
