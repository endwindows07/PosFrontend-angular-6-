import { Component, OnInit } from "@angular/core";
import { SalesService } from "../../../services/sales.service";
import { AlertService } from "../../../layout/components/services/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AccessTokenService } from "../../../services/accesstoken.service";
import { ISales } from "../../../interfaces/sales/sales.interface";
import { AppUrl } from "../../../app.url";
import { ProductUrl } from "../../../Product/product.url";
import { ProductService } from "../../../services/product.service";

@Component({
  selector: "app-detail-bill",
  templateUrl: "./detail-bill.component.html",
  styleUrls: ["./detail-bill.component.css"]
})
export class DetailBillComponent {
  constructor(
    private productService: ProductService,
    private salesService: SalesService,
    private alert: AlertService,
    private router: Router,
    private accessTokenService: AccessTokenService,
    private nativeRoute: ActivatedRoute
  ) {
    this.nativeRoute.params.forEach(query => {
      this.salesBillId = query.id;
    });
    this.onInitailLoadSalesBill();
  }

  AppUrl = AppUrl;
  ProductUrl = ProductUrl;

  productName: string;
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

  onGetStatsuSalesString(status: boolean) {
    if (status) {
      return "ลงระบบ"
    } else {
      return "ยกเลิกใบเสร็จ";
    }
  }

  print() {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th {
                height: 50px;
                text-align: left;
            }
            th, td {
                border-bottom: 1px solid #ddd;
                border: 1px solid black;
                padding: 2% 0% 2% 2%;
            }
            tbody {
              margin-bottom: 15pxl
            }
            .m-t-30  {
              margin-left: 80%;
                text-align: right;
            }
            .top {
              margin-left: 65%;
                text-align: right;

            }
            .hided {
              visibility: hidden;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">
          ${printContents}
        </body>
      </html>`
    );
    popupWin.document.close();
  }
}
