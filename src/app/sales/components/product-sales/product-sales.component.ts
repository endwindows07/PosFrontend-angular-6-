import { Component } from "@angular/core";
import { TypeaheadMatch } from "ngx-bootstrap";
import { IProduct } from "../../../interfaces/Product/product.interface";
import { ISales } from "../../../interfaces/sales/sales.interface";
import { ISalesOrder } from "../../../interfaces/sales/sales-order.interface";
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
  searchAdvandStatus: boolean = false;
  searchValueSelected: string;
  searchProductAdvand: IProduct[] = [];

  payment: number = 0;
  totalPrice: number = 0;
  calculateChange: number = 0;

  productOrders: ISalesOrder[] = [];
  product: IProduct[] = [];
  productsSelect: IProduct[] = [];
  productSales: ISales = {
    sales_List: null,
    payment: null
  };

  onSearchAdvand() {
    let product = this.product.filter(it => it.name == this.searchValueSelected);
    this.searchProductAdvand = product;
  }

  inittailLoadProductLocalStore(options: ISearchOption) {
    this.productService.onGetProduct(options, this.accessTokenService.getAccesstokenStore())
      .then(res => {
        this.product = res.product_List;
      });
  }

  onSearchBarcodeProduct() {
    let product: IProduct;
    product = this.product.find(
      it => it.barcode == this.searchValueSelected.trim()
    );
    if (product.barcode != "") {
      this.onInsertProductSelected(product);
    }
  }

  onSelect(event: TypeaheadMatch): void {
    this.onInsertProductSelected(event.item);
  }

  onInsertProductSelected(product: IProduct) {
    let productSelected = this.onSearchProductSelectedById(product.id);

    if (this.onSearchProductSelectedById(product.id) != null) {
      product.countOrder++;
    } else {
      product.countOrder = 1;
      this.productsSelect.unshift(product);
    }
    console.log(this.productsSelect);
    this.onGetTotalPrice();
  }

  // สินค้าที่ขายทั้งหมด ต้องเอาไปใส่ใน บิล
  onInsertCountOrder() {
    if (this.productsSelect != null) {
      this.productsSelect.forEach(it => {
        let order: ISalesOrder = {
          productId: it.id,
          // sales_Time: Date.now().toString(),
          sales_Count: it.countOrder.toString()
        };
        this.productOrders.push(order);
      });
    }
    this.onGetTotalPrice();
  }

  private onAdjustSalesProduct() {
    if (this.productsSelect == null) return this.alert.error_alert("กรุณาเลือกรายการขาย");
    if (this.payment < this.totalPrice) return this.alert.error_alert("ใส่จำนวนเงินให้ถูกต้อง");

    this.onInsertCountOrder();
    this.productSales.sales_List = this.productOrders;
    this.productSales.payment = this.payment.toString();

    this.onGetTotalPrice();

    this.salesService.onAdjustProduct(
      this.productSales,
      this.accessTokenService.getAccesstokenStore()).then(res => {
        this.productsSelect = [];
        this.productOrders = [];
        this.alert.success_alert("sales product success");
        window.open('http://localhost:4200/sales/detail-bill/' +  res.id) ;
      })
      .catch(err => {
        this.productsSelect = null;
        this.productOrders = null;
        this.alert.error_alert(err.Message);
      });
  }

  private onPlusProductCount(id: string) {
    this.onSearchProductSelectedById(id).countOrder++;
    this.onGetTotalPrice();
  }

  private onMinusProductCount(id: string, index: number) {
    let productSelect = this.onSearchProductSelectedById(id);

    productSelect.countOrder--;

    if (productSelect.countOrder <= 0) {
      productSelect.countOrder = 0;
      this.productsSelect.splice(index, 1);
      this.onGetTotalPrice();
    }
    this.onGetTotalPrice();
  }

  private onRemoveProduct(index: number, id: string) {
    this.onSearchProductSelectedById(id).countOrder = 0;
    this.onGetTotalPrice();
    this.productsSelect.splice(index, 1);
  }

  private onGetTotalPrice() {
    this.totalPrice = 0;
    if (this.productsSelect.length != 0) {
      this.productsSelect.forEach(it => {
        this.totalPrice += Number.parseInt(it.price) * it.countOrder;
      });
    }
  }

  private onSearchProductById(id: string) {
    return this.product.find(it => it.id == id);
  }

  private onSearchProductSelectedById(id: string) {
    return this.productsSelect.find(it => it.id == id);
  }
}
