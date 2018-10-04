import { ISales } from "./sales.interface";

export interface ISalesList {
  sales_List: ISales[],
  sales_Total: number
}
