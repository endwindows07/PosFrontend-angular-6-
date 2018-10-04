import { ISalesOrder } from "./sales-order.interface";

export interface ISales {
  sales_List: ISalesOrder[];
  payment: string;
  // sales_Time: string;
}
