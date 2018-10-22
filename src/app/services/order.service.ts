import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { IOrderList } from "../interfaces/order/order-list.interface";
import { ISearchOption } from "../interfaces/search-option.interface";
declare let $;

@Injectable()

export class OrderService {
    constructor(private http: HttpService) { }
    
    onGetOrders(options: ISearchOption, accessToken: string){
        return this.http.requestGet(`api/Order/orders?${$.param(options)}`, accessToken)
            .toPromise() as Promise<IOrderList[]>;
    }

    onGetOrderById(id: any, accessToken: string){
        return this.http.requestGet(`api/Order/orders/${id}`,accessToken)
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
        return this.http.requestGet(`api/Order/adjust-order/${id}`, accessToken)
            .toPromise() as Promise<IOrderList>;
    }

    onCancelOrderById(id: any, accessToken: string) {
        return this.http.requestPost(`api/Order/cancel-order/${id}`, accessToken)
            .toPromise() as Promise<IOrderList>;
    }

    onDeleteOrderById(id: any, accessToken: string) {
        return this.http.requestGet(`api/Order/delete-order/${id}`, accessToken)
            .toPromise() as Promise<IOrderList>;
    }
}