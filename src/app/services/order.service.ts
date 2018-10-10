import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable()

export class OrderService {
    constructor(private http: HttpService) { }
    
    onGetOrders(){

    }

    onGetOrderById(){

    }

    onInsertOrder(accessToken: string){
        // return this.http.requestPost(`api/Order/insert-order`)
    }

    onUpdateOrderById(){

    }

    onAdjustOrderById(){

    }

    onCancelOrderById(){

    }
}