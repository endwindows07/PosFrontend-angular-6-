import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { ISalesList } from "../interfaces/sales/sales-list.interface";
import { ISales } from "../interfaces/sales/sales.interface";

@Injectable()
export class ISalesService {
  constructor(private http: HttpService) {}
  
  onAdjustProduct(model: ISales, accessToken: string) {
    this.http.requestPost(`api/AdjustProduct/adjust-product`,model, accessToken)
             .toPromise() as Promise<ISales>;
  }

  onCancelBillProduct() {}
}