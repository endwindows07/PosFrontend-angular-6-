import { Component, OnInit } from "@angular/core";
import { SalesService } from "../../../services/sales.service";
import { AlertService } from "../../../layout/components/services/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AccessTokenService } from "../../../services/accesstoken.service";
import { ISales } from "../../../interfaces/sales/sales.interface";
import { AppUrl } from "../../../app.url";
import { ProductUrl } from "../../../Product/product.url";

@Component({
  selector: "app-detail-bill",
  templateUrl: "./detail-bill.component.html",
  styleUrls: ["./detail-bill.component.css"]
})
export class DetailBillComponent {
  constructor(
    private salesService: SalesService,
    private alert: AlertService,
    private router: Router,
    private accessTokenService: AccessTokenService,
    private nativeRoute: ActivatedRoute
  ) {
    this.nativeRoute.params.forEach(query => {
      this.salesBillId = query.id;
    })
    this.onInitailLoadSalesBill();
  }

  AppUrl = AppUrl;
  ProductUrl = ProductUrl;
  
  salesBillId: string;
  salesBill: ISales;

  onInitailLoadSalesBill() {
    this.salesService
      .onGetSalesBillProductById(
        this.salesBillId,
        this.accessTokenService.getAccesstokenStore()
      )
      .then(salesBill => {
        console.log(salesBill);
         this.salesBill = salesBill;
      })
      .catch(err => this.alert.error_alert(err.Message));
  }
}
