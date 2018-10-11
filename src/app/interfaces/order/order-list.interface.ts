import { IOrder } from "./order.interface";

export interface IOrderList {
    order_Name: string;
    product_List: IOrder[];

    id?: string;
    product_Amount?: string;
    status?: string;
    order_Time?: string;
    orderInStore_Time?: string;
    memberChngeOrderId?: string;
    memberId?: string;
}