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
      Limit_Page: this.limit_Page,
      Search_DefaultText: 'SalesNow',
      Search_DefaultType: 'SalesNow'
    });
    this.search_Type = 'Id';
    this.searchDefaultText = 'SalesNow';
    this.searchDefaultType = 'SalesNow';
  }

  AppUrl = AppUrl;
  SalesUrl = SalesUrl;

  salesBillCountItem: number;
  salesBill: ISalesList;

  search_Text: string;
  search_Type: string;
  searchDefaultText: string;
  searchDefaultType: string;
  dateSearch: string;


  start_Page = 1;
  limit_Page = 8;


  onPageChanged(page: PageChangedEvent) {
    if (!this.dateSearch) {
      this.onIitailLoadSalesBill({
        Search_DefaultText: this.searchDefaultType,
        Search_DefaultType: this.searchDefaultType,
        Search_Text: this.search_Text,
        Search_Type: this.search_Type,
        Start_Page: page.page,
        Limit_Page: page.itemsPerPage
      });
    } else {
      this.onIitailLoadSalesBill({
        Search_DefaultText: this.onDateCut(this.dateSearch[0].toString(), this.dateSearch[1].toString()),
        Search_DefaultType: "SalesTime",
        Search_Text: this.search_Text,
        Search_Type: this.search_Type,
        Start_Page: page.page,
        Limit_Page: page.itemsPerPage
      });
    }
  }

  onClickSearch() {
    if (!this.dateSearch) {
      this.onIitailLoadSalesBill({
        Search_DefaultText: this.searchDefaultType,
        Search_DefaultType: this.searchDefaultType,
        Search_Text: this.search_Text,
        Search_Type: this.search_Type,
        Start_Page: this.start_Page,
        Limit_Page: this.limit_Page,
      });
    } else {
      this.onIitailLoadSalesBill({
        Search_DefaultText: this.onDateCut(this.dateSearch[0].toString(), this.dateSearch[1].toString()),
        Search_DefaultType: "SalesTime",
        Search_Text: this.search_Text,
        Search_Type: this.search_Type,
        Start_Page: this.start_Page,
        Limit_Page: this.limit_Page,
      });
    }
  }

  onIitailLoadSalesBill(option: ISearchOption) {
    this.salesService.onGetSalesBillProduct(option, this.accessTokenService.getAccesstokenStore())
      .then(salesBill => {
        this.salesBill = salesBill;
      })
      .catch(err => this.alert.error_alert(err.message));
  }

  onGetStatsuSalesString(status: boolean) {
    if (status) {
      return "ลงระบบ"
    } else {
      return "ยกเลิกใบเสร็จ";
    }
  }

  onDateCut(dateTo: string, dateFrom: string) {
    return dateTo.replace(" GMT+0700 (เวลาอินโดจีน)", "") + "&" + dateFrom.replace(" GMT+0700 (เวลาอินโดจีน)", "");
  }
}
