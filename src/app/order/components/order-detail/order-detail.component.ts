import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AlertService } from 'src/app/layout/components/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessTokenService } from 'src/app/services/accesstoken.service';
import { IOrderList } from 'src/app/interfaces/order/order-list.interface';
import { AppUrl } from 'src/app/app.url';
import { OrderUrl } from '../../order.url';
import { ProductUrl } from 'src/app/Product/product.url';

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

  AppUrl = AppUrl;
  OrderUrl = OrderUrl;
  ProductUrl = ProductUrl;
  
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

  onAdjustOrder() {
    this.orderService.onAdjustOrderById(this.orderId, this.accessTokenService.getAccesstokenStore())
      .then(res => {
        this.alert.success_alert("รายจากจัดซื้อสินค้าลงระบบสำเร็จ");
        this.router.navigate(['/', AppUrl.Order, OrderUrl.Orders]);
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
