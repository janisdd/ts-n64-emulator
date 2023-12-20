import {int64} from "./instruction_types";

/**
 * System Control Coprocessor (CP0)
 */
export class Cp0 {

  //registers see page 45

  //TODO 32 or 64?
  registers: int64[] = new Array(32).fill(0)

}
