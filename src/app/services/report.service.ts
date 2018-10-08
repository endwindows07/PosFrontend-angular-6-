import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { IReportSaleList } from "../interfaces/report/report-salesList";
import { ISearchOption } from "../interfaces/search-option.interface";
import { IReportSalesProductList } from "../interfaces/report/report-salesProductList";
declare let $;

@Injectable()
export class ReportService {
    constructor(private http: HttpService) { }

    onGetReportSales(options: ISearchOption, accessToken: string){
        return this.http.requestGet(`api/Report/sales?${$.param(options)}`, accessToken)
                        .toPromise() as Promise<IReportSaleList>;
    }

    onGetReportProductSales(options: ISearchOption, id: any,  accessToken: string){
        return this.http.requestGet(`api/Report/sales-product/${id}?${$.param(options)}`, accessToken)
            .toPromise() as Promise<IReportSalesProductList>;
    }
}