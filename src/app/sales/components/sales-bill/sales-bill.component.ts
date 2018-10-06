import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../services/sales.service';
import { AlertService } from '../../../layout/components/services/alert.service';
import { Router } from '@angular/router';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { IOptionKey } from '../../../interfaces/search-key.interface';
import { ICategory } from '../../../interfaces/Product/product-category.interface';
import { AppUrl } from '../../../app.url';
import { ProductUrl } from '../../../Product/product.url';
import { SalesUrl } from '../../sales.url';
import { ISalesList } from '../../../interfaces/sales/sales-list.interface';
import { ISearchOption } from '../../../interfaces/search-option.interface';
import { PageChangedEvent } from 'ngx-bootstrap';

@Component({
  selector: "app-sales-bill",
  templateUrl: "./sales-bill.component.html",
  styleUrls: ["./sales-bill.component.css"]
})
export class SalesBillComponent {
  constructor(
    private salesService: SalesService,
    private alert: AlertService,
    private router: Router,
    private accessTokenService: AccessTokenService
  ) {
    this.onIitailLoadSalesBill({
      Start_Page: this.start_Page,
      Limit_Page: this.limit_Page
    });
  }

  AppUrl = AppUrl;
  SalesUrl = SalesUrl;

  salesBillCountItem: number;
  salesBill: ISalesList;

  search_Text: string = "";
  search_Type: string = "Id";

  start_Page = 1;
  limit_Page = 8;

  onPageChanged(page: PageChangedEvent) {
    this.onIitailLoadSalesBill({
      Start_Page: this.start_Page,
      Limit_Page: this.limit_Page,
    });
  }

  onClickSearch(){
    this.onIitailLoadSalesBill({
      Search_Text: this.search_Text,
      Search_Type: this.search_Type,
      Start_Page: this.start_Page,
      Limit_Page: this.limit_Page,
    });
  }

  onIitailLoadSalesBill(option: ISearchOption) {
    this.salesService.onGetSalesBillProduct(option, this.accessTokenService.getAccesstokenStore())
                      .then(salesBill => {
                        this.salesBill = salesBill;
                        console.log(salesBill);
                      })
                      .catch(err => this.alert.error_alert(err.message));
  }
}
