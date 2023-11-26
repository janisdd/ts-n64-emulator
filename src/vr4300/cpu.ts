import {Memory} from './memory'
import {ElfFile} from './elf_decoder'


export class Cpu {

  mem: Memory = new Memory();

  constructor() {
    this.mem.reset()
  }


  public execute_elf(elfFile: ElfFile) {

    //TODO load elf file into memory

  }

}
