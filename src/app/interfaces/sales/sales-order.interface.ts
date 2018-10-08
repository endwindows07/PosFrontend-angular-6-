import { IProduct } from "../Product/product.interface";

export interface ISalesOrder {
  sales_Count: string;
  productId: string;
  product?: IProduct
  sales_Time: string;
}