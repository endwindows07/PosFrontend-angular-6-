import { ISales } from "./sales.interface";

export interface ISalesList {
  Sales_List: ISales[],
  Sales_Total: number
}
