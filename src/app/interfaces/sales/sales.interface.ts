import { ISalesOrder } from "./sales-order.interface";

export interface ISales {
  Id: string;
  Sales_List: ISalesOrder[];
  Total_Price: string;
  Payment: string;
  Status: string;
  Sales_Time: string;
  CancelSales_Time: string;
  MemberId: string;
}

// Id: string,
//  < SalesOrderModel > Sales_List : string,
// Total_Price : string,
// Payment : string,
// Status : string,
// Sales_Time : string,
// CancelSales_Time : string,
// MemberId : string,
