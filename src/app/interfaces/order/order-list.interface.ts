import { IOrder } from "./order.interface";

export interface IOrderList {
    Order_Name: string;
    Product_List: IOrder[];

    Id?: string;
    Product_Amount?: string;
    Status?: string;
    Order_Time?: string;
    OrderInStore_Time?: string;
    MemberChngeOrderId?: string;
    MemberId?: string;
}