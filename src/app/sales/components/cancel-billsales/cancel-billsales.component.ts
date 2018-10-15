import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../services/sales.service';
import { AlertService } from '../../../layout/components/services/alert.service';
import { Router } from '@angular/router';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { ISales } from '../../../interfaces/sales/sales.interface';
import { AppUrl } from '../../../app.url';
import { ProductUrl } from '../../../Product/product.url';
import { SalesUrl } from '../../sales.url';

@Component({
  selector: 'app-cancel-billsales',
  templateUrl: './cancel-billsales.component.html',
  styleUrls: ['./cancel-billsales.component.css']
})
export class CancelBillsalesComponent {
  constructor(
    private salesService: SalesService,
    private alert: AlertService,
    private router: Router,
    private accessTokenService: AccessTokenService
  ) { }

  salesBillId: string;
  salesBill: ISales;

  AppUrl = AppUrl;
  ProductUrl = ProductUrl;

  onCancelSalesBill() {
    this.salesService.onCancelBillProduct(this.salesBillId, this.accessTokenService.getAccesstokenStore())
      .then(res => {
        this.alert.success_alert("ยกเลิกใบเสร็จสำเร็จ");
        this.router.navigate(['/', AppUrl.Sales, SalesUrl.ProductSales]);
      })
      .catch(err => this.alert.error_alert(err.Message));
  }

  onSearch() {
    this.salesService.onGetSalesBillProductById(this.salesBillId, this.accessTokenService.getAccesstokenStore())
      .then(salesBill => {
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
}
