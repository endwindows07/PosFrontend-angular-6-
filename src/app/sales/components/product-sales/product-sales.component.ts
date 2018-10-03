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

@Component({
  selector: "app-product-sales",
  templateUrl: "./product-sales.component.html",
  styleUrls: ["./product-sales.component.css"]
})
export class ProductSalesComponent {
  constructor(
    private productService: ProductService,
    private alert: AlertService,
    private router: Router,
    private accessTokenService: AccessTokenService,
  ) {
    this.inittailLoadProductLocalStore();
  }


  searchValueSelected: string;
  payment: number = 0;
  totalPrice: number = 0;
  calculateChange: number = 0;
  productsSelect: IProduct[] = [];

  productSales: ISales = {
    Sales_List: null,
    Sales_Time: null,
    Payment: null
  };
  
  product: IProduct[] = [];
  // product: IProduct[] = [
  //   {
  //     id: "001",
  //     barcode: "8850019627161",
  //     barcode_Custom: "687",
  //     name: "Nescafe 130g",
  //     description: "More..",
  //     image_Url: "",
  //     expired: "2018-09-30T00:00:00",
  //     cost_Product: "546",
  //     price: "99",
  //     amount_Product: "1",
  //     productCategoryId: "4",
  //     countOrder: 0
  //   },
  //   {
  //     id: "002",
  //     barcode: "8859912627161",
  //     barcode_Custom: "007",
  //     name: "Miro Xl",
  //     description: "More..",
  //     image_Url: "",
  //     expired: "2018-09-30T00:00:00",
  //     cost_Product: "546",
  //     price: "57",
  //     amount_Product: "1",
  //     productCategoryId: "4",
  //     countOrder: 0
  //   },
  //   {
  //     id: "003",
  //     barcode: "8850012637161",
  //     barcode_Custom: "0012",
  //     name: "Auze 130g",
  //     description: "More..",
  //     image_Url: "",
  //     expired: "2018-09-30T00:00:00",
  //     cost_Product: "132",
  //     price: "57",
  //     amount_Product: "1",
  //     productCategoryId: "2",
  //     countOrder: 0
  //   }
  // ];

  productOrders: ISalesOrder[] = [] ;

  onCalculate(){
      this.calculateChange = this.payment - this.totalPrice 
  };

  inittailLoadProductLocalStore(){
    this.product = this.productService.productLocalStore.product_List;
    console.log(this.product);
  }

  //  onGetCategory() {
  //   console.log(ICategory[1]);
  //   return ICategory[4].toString();
  // }

  onSelect(event: TypeaheadMatch): void {
    if (this.productsSelect.length == 0) {
      this.productsSelect.unshift(event.item);
    }
    this.productsSelect.forEach(it => {
      if (it.id == event.item.id) {
        return it.countOrder++;
      } else {
        return this.productsSelect.unshift(event.item);
      }
    });
    this.onGetTotalPrice();
  }

  private onGetTotalPrice() {
    this.onCalculate();
    this.totalPrice = 0;
    if (this.productsSelect.length != 0) {
      this.productsSelect.forEach(it => {
        this.totalPrice += Number.parseInt(it.price) * it.countOrder;
        this.onCalculate();
      });
    }
    console.log(this.totalPrice);
  }

  // สินค้าที่ขายทั้งหมด ต้องเอาไปใส่ใน บิล
  onInsertCountOrder() {
    if (this.productsSelect != null) {
      this.productsSelect.forEach(it => {
        let order: ISalesOrder = {
          ProductId: it.id,
          Sales_Count: it.countOrder.toString()
        };
        this.productOrders.push(order);
      });
    }
    this.onGetTotalPrice();
  }

  private onAdjustSalesProduct() {
    if (this.productsSelect.length == 0) {
      return console.log("กรุณาเลือกรายการขาย");
    }

    this.productSales.Sales_List = this.productOrders;
    this.productSales.Payment = this.payment.toString();
    console.log(this.productSales);
    this.onGetTotalPrice();
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
        }
      }
    });
    this.onGetTotalPrice();
  }

  onRemoveProduct(index: number, id: string) {
    this.productsSelect.forEach(it => {
      if (it.id == id) {
        it.countOrder = 0;
        this.productsSelect.splice(index, 1);
      }
    });
    this.onGetTotalPrice();
  }
}
