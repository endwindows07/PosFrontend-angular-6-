import { ISalesOrder } from "./sales-order.interface";

export interface ISales {
  Sales_List: ISalesOrder[];
  Payment: string;
  Sales_Time: string;
}

// Id: string,
//  < SalesOrderModel > Sales_List : string,
// Total_Price : string,
// Payment : string,
// Status : string,
// Sales_Time : string,
// CancelSales_Time : string,
// MemberId : string,
