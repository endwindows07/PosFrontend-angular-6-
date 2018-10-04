import { Component, OnInit } from "@angular/core";
import { TypeaheadMatch } from "ngx-bootstrap";
import { count } from "rxjs/operators";
import { Key } from "protractor";
import { IProduct } from "../../../interfaces/Product/product.interface";
import { ISales } from "../../../interfaces/sales/sales.interface";
import { ISalesOrder } from "../../../interfaces/sales/sales-order.interface";
import { ICategory } from "../../../interfaces/Product/product-category.interface";
import { ProductService } from "../../../services/product.service";
import { AlertService } from "../../../layout/components/services/alert.service";
import { Router } from "@angular/router";
import { AccessTokenService } from "../../../services/accesstoken.service";
import { SalesService } from "../../../services/sales.service";
import { ISearchOption } from "../../../interfaces/search-option.interface";

@Component({
  selector: "app-product-sales",
  templateUrl: "./product-sales.component.html",
  styleUrls: ["./product-sales.component.css"]
})
export class ProductSalesComponent {
  constructor(
    private productService: ProductService,
    private salesService: SalesService,
    private alert: AlertService,
    private router: Router,
    private accessTokenService: AccessTokenService
  ) {
    this.inittailLoadProductLocalStore({
      Start_Page: this.start_Page,
      Limit_Page: this.limit_Page
    });
  }

  start_Page = 0;
  limit_Page = 0;

  searchValueSelected: string;
  payment: number = 0;
  totalPrice: number = 0;
  calculateChange: number = 0;

  productOrders: ISalesOrder[] = [];

  product: IProduct[] = [];

  productsSelect: IProduct[] = [];

  productSales: ISales = {
    sales_List: null,
    // sales_Time: Date.now.toString(),
    payment: null,
  };

  inittailLoadProductLocalStore(options: ISearchOption) {
    this.salesService
      .onGetProduct(options, this.accessTokenService.getAccesstokenStore())
      .then(res => {
        this.product = res.product_List;
      });
  }

  //  onGetCategory() {
  //   console.log(ICategory[1]);
  //   return ICategory[4].toString();
  // }

  onSelect(event: TypeaheadMatch): void {
    if (this.productsSelect.length == 0) {
      event.item.countOrder = 1;
      this.productsSelect.unshift(event.item);
    } else {
      this.productsSelect.forEach(it => {
        if (it.id == event.item.id) {
          return it.countOrder++;
        } else {
          event.item.countOrder = 1;
          this.productsSelect.unshift(event.item);
        }
      });
    }
    this.onGetTotalPrice();
  }

  // สินค้าที่ขายทั้งหมด ต้องเอาไปใส่ใน บิล
  onInsertCountOrder() {
    if (this.productsSelect != null) {
      this.productsSelect.forEach(it => {
        let order: ISalesOrder = {
          productId: it.id,
          sales_Count: it.countOrder.toString()
        };
        this.productOrders.push(order);
      });
    }
    this.onGetTotalPrice();
  }

  private onAdjustSalesProduct() {
    if (this.productsSelect.length == 0) {
      return this.alert.error_alert("กรุณาเลือกรายการขาย");
    }

    if (this.payment < this.totalPrice) {
      return this.alert.error_alert("ใส่จำนวนเงินให้ถูกต้อง");
    }

    this.onInsertCountOrder();
    // console.log(JSON.stringify(this.productOrders));
    this.productSales.sales_List = this.productOrders;
    this.productSales.payment = this.payment.toString();
    // console.log(this.productSales);
    this.onGetTotalPrice();
    this.salesService.onAdjustProduct(this.productSales, this.accessTokenService.getAccesstokenStore())
                      .then(res => {
                        this.alert.success_alert("sales product success");
                        this.productsSelect = null;
                        this.productOrders = null;
                      })
                      .catch(err => {
                        this.productsSelect = null;
                        this.productOrders = null;
                        this.alert.error_alert(err.Message)
                      });
  }

  private onPlusProductCount(id: string) {
    this.productsSelect.forEach(it => {
      if (it.id == id) {
        it.countOrder++;
      }
    });
    this.onGetTotalPrice();
  }

  private onMinusProductCount(id: string, index: number) {
    this.productsSelect.forEach(it => {
      if (it.id == id) {
        it.countOrder--;
        if (it.countOrder <= 0) {
          it.countOrder = 0;
          this.productsSelect.splice(index, 1);
          this.onGetTotalPrice();
        }
      }
    });
    this.onGetTotalPrice();
  }

  onRemoveProduct(index: number, id: string) {
    this.productsSelect.forEach(it => {
      if (it.id == id) {
        it.countOrder = 0;
        this.onGetTotalPrice();
        this.productsSelect.splice(index, 1);
      }
    });
  }

  private onGetTotalPrice() {
    this.totalPrice = 0;
    if (this.productsSelect.length != 0) {
      this.productsSelect.forEach(it => {
        this.totalPrice += Number.parseInt(it.price) * it.countOrder;
      });
    }
  }
}
