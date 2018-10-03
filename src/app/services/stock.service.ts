import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { ProductModule } from "../Product/product.module";

@Injectable()
export class IStockService {
  constructor(
      private http: HttpService,
  ) {}

    onAdjustProduct(){

    }

    onCancelBillProduct(){
        
    } 
}
