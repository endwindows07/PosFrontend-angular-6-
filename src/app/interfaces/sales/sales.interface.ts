import { ISalesOrder } from "./sales-order.interface";

export interface ISales {
  Sales_List: ISalesOrder[];
  Payment: string;
  Sales_Time: string;
}
