import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { SalesService } from 'src/app/services/sales.service';
import { AlertService } from 'src/app/layout/components/services/alert.service';
import { Router } from '@angular/router';
import { AccessTokenService } from 'src/app/services/accesstoken.service';
import { ISearchOption } from 'src/app/interfaces/search-option.interface';
import { ISalesOrder } from 'src/app/interfaces/sales/sales-order.interface';
import { IProduct } from 'src/app/interfaces/Product/product.interface';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { IOrder } from 'src/app/interfaces/order/order.interface';
import { IOrderList } from 'src/app/interfaces/order/order-list.interface';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-insert',
  templateUrl: './order-insert.component.html',
  styleUrls: ['./order-insert.component.css']
})
export class OrderInsertComponent {
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private alert: AlertService,
    private router: Router,
    private accessTokenService: AccessTokenService
  ) {
    this.inittailLoadProductLocalStore({
      Start_Page: 0,
      Limit_Page: 0
    })
  }

  dateNow: Date = new Date();

  orderProducts: IOrder[] = [];
  orderName: string;
  orderList: IOrderList = {
    order_Name: null,
    product_List: null
  };

  product: IProduct[] = [];

  searchAdvandStatus: boolean = false;
  searchValueSelected: string;


  searchProductAdvand: IProduct[] = [];

  productsSelect: IProduct[] = [];

  private onInsertCountOrder() {
    if (this.productsSelect != null) {
      this.productsSelect.forEach(it => {
        let order: IOrder = {
          productId: it.id,
          order_Count: it.countOrder.toString()
        };
        this.orderProducts.push(order);
      });
    }
  }

  onAdjustSalesProduct() {
    if (this.productsSelect.length == 0) return this.alert.error_alert("กรุณาเลือกรายการสินค้าที่ต้องการจัดซื้อ");
    this.orderName = this.orderName.trim();
    if (this.orderName == "") return this.alert.error_alert("กรุณาตั้งชื่อรายการจัดซื้อ");

    this.onInsertCountOrder();
    this.orderList.product_List = this.orderProducts;
    this.orderList.order_Name = this.orderName;

    this.orderService.onInsertOrder(this.orderList, this.accessTokenService.getAccesstokenStore())
      .then(res => {
        console.log(res);
        this.onClearAllData();
        this.alert.success_alert("สร้างรายการจัดซื้อเสร็จสิ้น");
      })
      .catch(err => {
        this.alert.error_alert(err.Message);
        this.onClearAllData();
      });
  }

  private onClearAllData() {
    this.orderProducts = [];
    this.orderName = "";
    this.orderList = {
      order_Name: null,
      product_List: null
    };
    this.searchAdvandStatus = false;
    this.searchValueSelected = "";
    this.searchProductAdvand = [];
    this.productsSelect = [];
  }

  inittailLoadProductLocalStore(options: ISearchOption) {
    this.productService.onGetProduct(options, this.accessTokenService.getAccesstokenStore())
      .then(res => {
        this.product = res.product_List;
      });
  }

  onSearchBarcodeProduct() {
    let product: IProduct;

    if (this.searchValueSelected.trim().length < 13) return;

    product = this.product.find(
      it => it.barcode == this.searchValueSelected.trim()
    );

    if (product) {
      this.onInsertProductSelected(product);
    }
  }

  onSelect(event: TypeaheadMatch): void {
    this.onInsertProductSelected(event.item);
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
    return this.product.find(it => it.id == id);
  }

  private onSearchProductSelectedById(id: string) {
    return this.productsSelect.find(it => it.id == id);
  }
}
