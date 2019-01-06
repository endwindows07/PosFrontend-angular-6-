import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { AlertService } from 'src/app/layout/components/services/alert.service';
import { Router } from '@angular/router';
import { AccessTokenService } from 'src/app/services/accesstoken.service';
import { ISearchOption } from 'src/app/interfaces/search-option.interface';
import { IOrderList } from 'src/app/interfaces/order/order-list.interface';
import { AppUrl } from 'src/app/app.url';
import { OrderUrl } from '../../order.url';
import { PageChangedEvent } from 'ngx-bootstrap';

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent {
  constructor(
    private orderService: OrderService,
    private alert: AlertService,
    private router: Router,
    private accessTokenService: AccessTokenService
  ) {
    this.onIitailLoadOrders({
      Start_Page: this.Start_Page,
      Limit_Page: this.Limit_Page
    });
  }

  AppUrl = AppUrl;
  OrderUrl = OrderUrl;

  Search_Text: string = "";
  Search_Type: string = "Id";
  Start_Page: number = 1;
  Limit_Page: number = 8;
  orderList: IOrderList[] = [];

  onIitailLoadOrders(option: ISearchOption) {
    this.orderService
      .onGetOrders(option, this.accessTokenService.getAccesstokenStore())
      .then(orders => {
        this.orderList = orders;
      })
      .catch(err => {
        this.alert.error_alert(err.Message);
      });
  }

  onClickSearch() {
    this.onIitailLoadOrders({
      Start_Page: this.Start_Page,
      Limit_Page: this.Limit_Page,
      Search_Text: this.Search_Text,
      Search_Type: this.Search_Type
    });
  }

  onGetStatsuSalesString(status: boolean) {
    if (status) {
      return "ลงระบบ";
    } else {
      return "ยังไม่ลงระบบ";
    }
  }

  onPageChanged(page: PageChangedEvent) {}
}
