import { TypeProduct } from "./product-type.interface";


export interface IProduct {
    id: string,
    barcode: string,
    barcode_Custom: string,
    name: string,
    description: string,
    image_Url: string,
    expired: string,
    cost_Product?: string,
    price?: string,
    amount_Product?: string,
    status?: boolean,
    type?: TypeProduct,
    productCategoryId?: string,
    countOrder?: number
}

