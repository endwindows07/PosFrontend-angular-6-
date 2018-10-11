import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AlertService } from 'src/app/layout/components/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessTokenService } from 'src/app/services/accesstoken.service';
import { IOrderList } from 'src/app/interfaces/order/order-list.interface';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
  constructor(
    private orderService: OrderService,
    private alert: AlertService,
    private router: Router,
    private accessTokenService: AccessTokenService,
    private nativeRoute: ActivatedRoute

  ) {
    this.nativeRoute.params.forEach(query => {
      this.orderId = query.id;
    });
    this.onIitailLoadOrderDetail()

  }

  orderId: number;
  order: IOrderList;

  onIitailLoadOrderDetail() {
    this.orderService.onGetOrderById(this.orderId, this.accessTokenService.getAccesstokenStore())
      .then(order => {
        this.order = order;
      })
      .catch(err => {
        this.alert.error_alert(err.Message);
      })
  }
  
  onGetStatsuSalesString(status: boolean) {
    if (status) {
      return "ลงระบบ"
    } else {
      return "ยังไม่ลงระบบ";
    }
  }
}
