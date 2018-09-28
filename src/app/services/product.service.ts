import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { IProduct } from "../interfaces/Product/product.interface";
import { ISearchOption } from "../interfaces/search-option.interface";
declare let $;

@Injectable()
export class ProductService {
    constructor(private http: HttpService) { }

    onGetProduct(options: ISearchOption, asccessToken: string){
        return this.http.requestGet(`api/product/products?${$.param(options)}`, asccessToken)
                        .toPromise() as Promise<IProduct>;
    }

    onGetProductById(){

    }

    onAddProduct(){

    }

    onUpdateProduct(){

    }
}