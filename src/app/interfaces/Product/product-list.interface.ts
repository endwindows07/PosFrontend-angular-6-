import { IProduct } from "./product.interface";

export interface IProductList {
  product_List: IProduct[],
  product_Total: number
}