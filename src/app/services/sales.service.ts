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

  public productLocalStore: IProductList = {} as any;
  public setProductLocalStore(products: IProductList) {
    this.productLocalStore.product_List = products.product_List;
    this.productLocalStore.product_Total = products.product_Total;
  }

  onGetProduct(options: ISearchOption, accessToken: string) {
    return (this.http
      .requestGet(`api/product/products?${$.param(options)}`, accessToken)
      .toPromise() as Promise<IProductList>).then(res => {
      this.setProductLocalStore(res);
      // console.log(this.productLocalStore);
      return res;
    });
  }

  onAdjustProduct(model: ISales, accessToken: string) {
    console.log(model);
    return this.http
      .requestPost(`api/AdjustProduct/adjust-product`, model, accessToken)
      .toPromise() as Promise<ISales>;
  }

  onCancelBillProduct() {}

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