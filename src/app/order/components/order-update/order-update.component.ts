import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { AlertService } from 'src/app/layout/components/services/alert.service';
import { AccessTokenService } from 'src/app/services/accesstoken.service';
import { AppUrl } from 'src/app/app.url';
import { OrderUrl } from '../../order.url';
import { IProduct } from 'src/app/interfaces/Product/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { ISearchOption } from 'src/app/interfaces/search-option.interface';
import { IOrderList } from 'src/app/interfaces/order/order-list.interface';
import { IOrder } from 'src/app/interfaces/order/order.interface';
import { TypeaheadMatch } from 'ngx-bootstrap';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})

export class OrderUpdateComponent {
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private alert: AlertService,
    private router: Router,
    private accessTokenService: AccessTokenService,
    private nativeRoute: ActivatedRoute
  ) {

    this.onLoadProducts({
      Start_Page: 0,
      Limit_Page: 0
    })

    this.nativeRoute.params.forEach(query => {
      this.orderId = query.id;
    });
  }

  orderId: number;
  orderName: string;
  searchValueSelected: string;

  productsSelect: IProduct[] = [];
  products: IProduct[] = [];

  orders: IOrder[] = [];
  orderList: IOrderList = {
    order_Name: null,
    product_List: null
  };

  onLoadProducts(options: ISearchOption) {
    this.productService.onGetProduct(options, this.accessTokenService.getAccesstokenStore())
      .then(product => {
        this.products = product.product_List;
        this.onIitailLoadOrderById();
      })
      .catch(err => {
        this.alert.error_alert(err.Message);
      });
  }

  onIitailLoadOrderById() {
    this.orderService.onGetOrderById(this.orderId, this.accessTokenService.getAccesstokenStore())
      .then(order => {
        // set name order
        this.orderName = order.order_Name;

        // find product data and set value to productSelected
        order.product_List.forEach(it => {
          console.log(it);
          let productsOrder = this.products.find(pd => pd.id == it.product_Id);
          productsOrder.countOrder = Number.parseInt(it.order_Count);
          this.productsSelect.push(productsOrder);
        });

      })
      .catch(err => {
        this.alert.error_alert(err.Message);
        this.router.navigate(['/', AppUrl.Order, OrderUrl.OrderDetail, this.orderId]);
      })
  }

  onSelect(event: TypeaheadMatch): void {
    this.onInsertProductSelected(event.item);
  }

  onSearchBarcodeProduct() {
    let product: IProduct;

    if (this.searchValueSelected.trim().length < 13) return;

    product = this.products.find(
      it => it.barcode == this.searchValueSelected.trim()
    );
    if (product) {
      this.onInsertProductSelected(product);
    }
  }

  private onInsertCountOrder() {
    if (this.productsSelect != null) {
      this.productsSelect.forEach(it => {
        let order: IOrder = {
          product_Id: it.id,
          order_Count: it.countOrder.toString()
        };
        this.orders.push(order);
      });
    }
  }

  onAdjustSalesProduct() {
    if (this.productsSelect.length == 0) return this.alert.error_alert("กรุณาเลือกรายการสินค้าที่ต้องการจัดซื้อ");
    this.orderName = this.orderName.trim();
    if (this.orderName == "") return this.alert.error_alert("กรุณาตั้งชื่อรายการจัดซื้อ");

    this.onInsertCountOrder();
    this.orderList.product_List = this.orders;
    this.orderList.order_Name = this.orderName;

    this.orderService.onUpdateOrderById(this.orderList, this.orderId, this.accessTokenService.getAccesstokenStore())
      .then(res => {
        this.onClearAllData();
        this.alert.success_alert("สร้างรายการจัดซื้อเสร็จสิ้น");
        this, this.router.navigate(['/', AppUrl.Order, OrderUrl.OrderDetail, this.orderId]);
      })
      .catch(err => {
        this.alert.error_alert(err.Message);
        this.onClearAllData();
      });
  }
  
  onInsertProductSelected(product: IProduct) {
    let productSelected = this.onSearchProductSelectedById(product.id);

    if (productSelected != null) {

      product.countOrder++;
      console.log(this.productsSelect);
    } else {
      product.countOrder = 1;
      this.productsSelect.unshift(product);
    }
    console.log(this.productsSelect);
  }

  private onPlusProductCount(id: string) {
    this.onSearchProductSelectedById(id).countOrder++;
  }

  private onMinusProductCount(id: string, index: number) {
    let productSelect = this.onSearchProductSelectedById(id);

    productSelect.countOrder--;

    if (productSelect.countOrder <= 0) {
      productSelect.countOrder = 0;
      this.productsSelect.splice(index, 1);
    }
  }

  private onRemoveProduct(index: number, id: string) {
    this.onSearchProductSelectedById(id).countOrder = 0;
    this.productsSelect.splice(index, 1);
  }

  private onSearchProductById(id: string) {
    return this.products.find(it => it.id == id);
  }

  private onSearchProductSelectedById(id: string) {
    return this.productsSelect.find(it => it.id == id);
  }

  private onClearAllData() {
    this.orders = [];
    this.orderName = "";
    this.orderList = {
      order_Name: null,
      product_List: null
    };
    this.searchValueSelected = "";
    this.productsSelect = [];
  }
}
