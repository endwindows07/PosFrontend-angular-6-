import { IProduct } from "../Product/product.interface";

export interface IOrder{
    order_Count: string;
    productId: string;
    product?: IProduct
}