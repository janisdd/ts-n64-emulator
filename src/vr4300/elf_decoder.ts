
//see https://en.wikipedia.org/wiki/Executable_and_Linkable_Format

//TODO add types for all tables
//file header
//section header
//program header

class Elf_decoder {
  private constructor() {
  }


  public static _test() {

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

    this.decode(buffer)

  }


  public static decode(binary: Uint8Array) {
    const view = new DataView(binary.buffer)

    let cursor = 0
    const maigcNumber = view.getUint32(cursor)
    cursor += 4
    const bitFormat = view.getUint8(cursor) == 1
                      ? 32
                      : 64
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

    let entryPoint_e_entry: number | bigint
    let programHeaderTableStart_e_phoff: number | bigint
    let sectionHeaderTableStart_e_shoff: number | bigint

    if (bitFormat === 32) {
      entryPoint_e_entry = view.getUint32(cursor, isLittleEndian)
      cursor += 4
      programHeaderTableStart_e_phoff = view.getUint32(cursor, isLittleEndian)
      cursor += 4
      sectionHeaderTableStart_e_shoff = view.getUint32(cursor, isLittleEndian)
      cursor += 4
    } else {
      entryPoint_e_entry = view.getBigUint64(cursor, isLittleEndian)
      cursor += 8
      programHeaderTableStart_e_phoff = view.getBigUint64(cursor, isLittleEndian)
      cursor += 8
      sectionHeaderTableStart_e_shoff = view.getBigUint64(cursor, isLittleEndian)
      cursor += 8
    }

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

    //program header
    if (programHeaderTableEntriesCount_e_phnum > 0) {

      if (bitFormat === 32) {

        const offset = programHeaderTableStart_e_phoff as number

        let cursor2 = 0
        const segmentType_p_type = view.getUint32(offset + cursor2, isLittleEndian)
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

        const endOfProgramHeader = view.getUint8(offset + cursor2)
        cursor2 += 1

      } else {

        if (programHeaderTableStart_e_phoff > 0x100000000) { //max unsigned 32bit
          throw new Error('64bit not supported')
        }

        const offset = programHeaderTableStart_e_phoff as number


        let cursor2: number = 0
        const segmentType_p_type = view.getUint32(offset + cursor2, isLittleEndian)
        cursor2 += 4

        const p_flags = view.getBigUint64(offset + cursor2, isLittleEndian)
        cursor2 += 8

        const p_offset = view.getBigUint64(offset + cursor2, isLittleEndian)
        cursor2 += 8
        const p_vaddr = view.getBigUint64(offset + cursor2, isLittleEndian)
        cursor2 += 8
        const p_paddr = view.getBigUint64(offset + cursor2, isLittleEndian)
        cursor2 += 8
        const p_filesz = view.getBigUint64(offset + cursor2, isLittleEndian)
        cursor2 += 8
        const p_memsz = view.getBigUint64(offset + cursor2, isLittleEndian)
        cursor2 += 8
        const p_align = view.getBigUint64(offset + cursor2, isLittleEndian)
        cursor2 += 8

        const endOfProgramHeader = view.getUint8(offset + cursor2)
        cursor2 += 1
      }

    }


    //section header
    //see https://man7.org/linux/man-pages/man5/elf.5.html
    for (let i = 0 ; i < sectionHeaderTableEntriesCount_e_shnum ; i++){

      const offset = sectionHeaderTableStart_e_shoff as number

      let cursor2 = i * sectionHeaderTableEntrySize_e_shentsize

      const sh_name = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4

      const sh_type = view.getUint32(offset + cursor2, isLittleEndian)
      cursor2 += 4

      if (bitFormat === 32) {

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


        if (sh_size > 0) {

          if (i === shstrndx_e_shstrndx) {
            //first byte is \0 and last byte is \0
            //every entry is null (\0) terminated
            const sectionNamesBytes = binary.subarray(sh_offset+1, sh_offset + sh_size-1)
            const sectionNames = new TextDecoder('utf-8').decode(sectionNamesBytes).split("\0")
            console.log(`sectionNames: ${sectionNames.join(", ")}`)
          }
          else {

          }

          const sectionName = new TextDecoder('utf-8').decode(binary.subarray(sh_offset, sh_offset + sh_size))
          console.log(sectionName)
        }

        console.log(sh_entsize)

      }
      else {

        const sh_flags = view.getBigUint64(offset + cursor2, isLittleEndian)
        cursor2 += 8

        const sh_addr = view.getBigUint64(offset + cursor2, isLittleEndian)
        cursor2 += 8
        const sh_offset = view.getBigUint64(offset + cursor2, isLittleEndian)
        cursor2 += 8
        const sh_size = view.getBigUint64(offset + cursor2, isLittleEndian)
        cursor2 += 8

        const sh_link = view.getUint32(offset + cursor2, isLittleEndian)
        cursor2 += 4
        const sh_info = view.getUint32(offset + cursor2, isLittleEndian)
        cursor2 += 4

        const sh_addralign = view.getBigUint64(offset + cursor2, isLittleEndian)
        cursor2 += 8
        const sh_entsize = view.getBigUint64(offset + cursor2, isLittleEndian)
        cursor2 += 8

      }


    }


  }


}

Elf_decoder._test()
