import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { IProduct } from "../interfaces/Product/product.interface";
import { ISearchOption } from "../interfaces/search-option.interface";
import { IProductAdJust } from "../interfaces/Product/product-adjust.interface";

declare let $;

@Injectable()
export class ProductService {
    constructor(private http: HttpService) { }

    onGetProduct(options: ISearchOption, accessToken: string){
        return this.http.requestGet(`api/product/products?${$.param(options)}`, accessToken)
                        .toPromise() as Promise<IProduct>;
    }

    onGetProductById(id: any, accessToken: string){
        return this.http.requestGet(`api/product/product/${id}`, accessToken)
                        .toPromise() as Promise<IProduct>;
    }

    onAddProduct(model: IProduct, accessToken: string){
        return this.http.requestPost(`api/product/add-product`, model, accessToken)
                        .toPromise() as Promise<IProduct>;
    }

    onUpdateProduct(model: IProduct,id: any, accessToken: string) {
        return this.http.requestPost(`api/product/update-product/${id}`, model, accessToken)
                    .toPromise() as Promise<IProduct>;
    }

    onUpdateProductInStock(model: IProductAdJust, id: any, accessToken: string){
        return this.http.requestPost(`api/product/update-productstock/${id}`, model, accessToken)
            .toPromise() as Promise<IProductAdJust>;
    }
}