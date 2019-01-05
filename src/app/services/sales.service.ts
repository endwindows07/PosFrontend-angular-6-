import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { ISalesList } from "../interfaces/sales/sales-list.interface";
import { ISales } from "../interfaces/sales/sales.interface";
import { IProductList } from "../interfaces/Product/product-list.interface";
import { ISearchOption } from "../interfaces/search-option.interface";
declare let $;

@Injectable()
export class SalesService {
  constructor(private http: HttpService) {}

  onGetProduct(options: ISearchOption, accessToken: string) {
    return this.http
      .requestGet(`api/product/products?${$.param(options)}`, accessToken)
      .toPromise() as Promise<IProductList>
  }

  onAdjustProduct(model: ISales, accessToken: string) {
    return this.http
      .requestPost(`api/AdjustProduct/adjust-product`, model, accessToken)
      .toPromise() as Promise<ISales>;
  }

  onCancelBillProduct(id: any, accessToken: string) {
    return this.http.requestGet(`api/AdjustProduct/cancelbill-product/${id}`, accessToken)
                    .toPromise();
  }
  // api/AdjustProduct/cancelbill - product /

  onGetSalesBillProduct(options: ISearchOption, accessToken: string) {
    return this.http
      .requestGet(`api/Sales/all-sales?${$.param(options)}`, accessToken)
      .toPromise() as Promise<ISalesList>;
  }

  onGetSalesBillProductById(id: any, accessToken: string){
    return this.http.requestGet(`api/Sales/get-sales/${id}`, accessToken)
                    .toPromise() as Promise<ISales>;
  };
}