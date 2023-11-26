

export class Memory {

  public memory: Uint8Array = new Uint8Array(0);
  public view: DataView = new DataView(this.memory.buffer);

  constructor() {

  }

  public reset() {
    this.memory = new Uint8Array(0x400000);
    this.view = new DataView(this.memory.buffer);
  }


}
