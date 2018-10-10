import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { IOrderList } from "../interfaces/order/order-list.interface";
declare let $;
@Injectable()

export class OrderService {
    constructor(private http: HttpService) { }
    
    onGetOrders(accessToken: string){
        return this.http.requestPost(`api/Order/orders`, accessToken)
            .toPromise() as Promise<IOrderList[]>;
    }

    onGetOrderById(id: any, accessToken: string){
        return this.http.requestPost(`api/Order/orders/${id}`,accessToken)
            .toPromise() as Promise<IOrderList>;
    }

    onInsertOrder(model: IOrderList, accessToken: string){
        return this.http.requestPost(`api/Order/insert-order`, model, accessToken)
                        .toPromise() as Promise<IOrderList>;
    }

    onUpdateOrderById(model: IOrderList,id: any, accessToken: string){
        return this.http.requestPost(`api/Order/update-order/${id}`,model, accessToken)
            .toPromise() as Promise<IOrderList>;
    }

    onAdjustOrderById(id: any, accessToken: string) {
        return this.http.requestPost(`api/Order/adjust-order/${id}`, accessToken)
            .toPromise() as Promise<IOrderList>;
    }

    onCancelOrderById(id: any, accessToken: string) {
        return this.http.requestPost(`api/Order/cancel-order/${id}`, accessToken)
            .toPromise() as Promise<IOrderList>;
    }
}