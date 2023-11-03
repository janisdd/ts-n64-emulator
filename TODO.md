# TODOs

nintendo 64 (n64) sources

- uses big endian

## hardware

n64 has a vr4300 cpu (mips 3, 64 bit)

system clock: 93.75MHz
bus width  :64bit
instruction cache  :16kbyte
data cache  :8kbyte

- register can be 32-bit or 64-bit registers, depending on the VR4300 processor mode of operation !

- CPU registers
  - 32 64 bit general purpose registers (GPRs)

| register | name |
|----------|------|
| 0        | zero |
| 1        | at   |
| 2        | v0   |
| 3        | v1   |
| 4        | a0   |
| 5        | a1   |
| 6        | a2   |
| 7        | a3   |
| 8        | t0   |
| 9        | t1   |
| 10       | t2   |
| 11       | t3   |
| 12       | t4   |
| 13       | t5   |
| 14       | t6   |
| 15       | t7   |
| 16       | s0   |
| 17       | s1   |
| 18       | s2   |
| 19       | s3   |
| 20       | s4   |
| 21       | s5   |
| 22       | s6   |
| 23       | s7   |
| 24       | t8   |
| 25       | t9   |
| 26       | k0   |
| 27       | k1   |
| 28       | gp   |
| 29       | sp   |
| 30       | s8   |
| 32       | ra   |

- special registers
  - 64-bit Program Counter, the PC registe
  - 64-bit HI register, containing the integer multiply and divide high-order doubleword result
  - 64-bit LO register, containing the integer multiply and divide low-order doubleword result
  - 1-bit Load/Link LLBit register
  - 32-bit floating-point Implementation/Revision register, FCR0
  - 32-bit floating-point Control/Status register, FCR31
  - r0 is always 0
  - r31 is the link register used by JAL and JALR instructions
  - 
- coprocessor 0 / system control processor (CP0) is used for memory management and handles exception processing
  - translation lookaside buffer (TLB) is used to translate virtual to physical addresses
  - selects an operating mode (Kernel, supervisor, or user mode)
  - 32 registers (TLB) registers
    - maps to a pair of variable-sized pages of either 4 KB or 16 MB
    - the TLB can hold both instruction and data addresses

| register | name         | type                 | size                          | description                                                     |
|----------|--------------|----------------------|-------------------------------|-----------------------------------------------------------------|
| 0        | index        | memory management    | 32 bits                       | Programmable pointer into TLB array                             |
| 1        | random       | memory management    | 32 bits                       | Pseudorandom pointer into TLB array (read only)                 |
| 2        | EntryLo0     | memory management    | 32/64 bits, depending on mode | Low half of TLB entry for even virtual address (VPN)            |
| 3        | EntryLo1     | memory management    | 32/64 bits, depending on mode | Low half of TLB entry for odd virtual address (VPN)             |
| 4        | Context      | exception processing | 32/64 bits, depending on mode | Pointer to kernel virtual page table entry (PTE) in 32-bit mode |
| 5        | PageMask     | memory management    | 32 bits                       | Page size specification                                         |
| 6        | Wired        | memory management    | 32 bits                       | Number of wired TLB entries                                     |
| 7        | -            | -                    | -                             | -                                                               |
| 8        | BadVAddr     | exception processing | 32/64 bits, depending on mode | Display of virtual address that occurred an error last          |
| 9        | Count        | exception processing | 32 bits                       | Timer Count                                                     |
| 10       | EntryHi      | memory management    | 32/64 bits, depending on mode | High half of TLB entry (including ASID)                         |
| 11       | Compare      | exception processing | 32 bits                       | Timer Compare Value                                             |
| 12       | Status       | exception processing | 32 bits                       | Operation status setting                                        |
| 13       | Cause        | exception processing | 32 bits                       | Display of cause of last exception                              |
| 14       | EPC          | exception processing | 32/64 bits, depending on mode | Exception Program Counter                                       |
| 15       | PRId         | memory management    | 32 bits                       | Processor Revision Identifier                                   |
| 16       | Config       | memory management    | 32 bits                       | Memory system mode setting                                      |
| 17       | LLAddr       | memory management    | 32 bits                       | Load Linked instruction address display                         |
| 18       | WatchLo      | exception processing | 32 bits                       | Memory reference trap address low bits                          |
| 19       | WatchHi      | exception processing | 32 bits                       | Memory reference trap address high bits                         |
| 20       | XContext     | exception processing | 32 bits                       | Pointer to Kernel virtual PTE table in 64-bit mode              |
| 21       | -            | -                    | -                             | -                                                               |
| 22       | -            | -                    | -                             | ... Error Exception Program Counter (-) ...                     |
| 23       | -            | -                    | -                             | -                                                               |
| 24       | -            | -                    | -                             | -                                                               |
| 25       | -            | -                    | -                             | -                                                               |
| 26       | Parity Error | exception processing | 32 bits                       | Cache parity bits [NOT USED?]                                   |
| 27       | Cache Error  | exception processing | 32 bits                       | Cache Error and Status register [NOT USED?]                     |
| 28       | TagLo        | memory management    | 32 bits                       | Cache Tag register low                                          |
| 29       | TagHi        | memory management    | 32 bits                       | Cache Tag register high                                         |
| 30       | ErrorEPC     | -                    | 32/64 bits, depending on mode | Error Exception Program Counter                                 |
| 32       | -            | -                    | -                             | -                                                               |


- has FPU (floating point coprocessor) (CP1)
  - 32 64 bit floating point registers (FPRs)
  - 16 32/64 float reigsters
  - +16 by setting the FR bit of the Status register to 1
  - **floating-point operations are processed by the same hardware as is used for integer instructions**

- memory addressing
  - Halfword accesses must be aligned on an even byte boundary (0, 2, 4...)
  - Word accesses must be aligned on a byte boundary divisible by four (0, 4, 8...)
  - Doubleword accesses must be aligned on a byte boundary divisible by eight (0, 8, 16...)

  - The following special instructions load and store words that are not aligned on 4-byte (word) or 8-word (doubleword) boundaries
    - LWL LWR SWL SWR
      LDL LDR SDL SDR




TODO Support of the MIPS ISA
- SYNC is handled as a NOP



useful links

- https://ultra64.ca/resources/documentation
- https://n64.readthedocs.io/index.html#document-cpu
- https://n64brew.dev/wiki/MIPS_III_instructions
  - https://n64brew.dev/wiki/MIPS_Assembly

- https://static.miraheze.org/n64wiki/5/55/VR4300-Users-Manual.pdf
