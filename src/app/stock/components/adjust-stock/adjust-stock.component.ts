import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProductService } from "../../../services/product.service";
import { AlertService } from "../../../layout/components/services/alert.service";
import { RouterModule, Router, ActivatedRoute } from "@angular/router";
import { AccessTokenService } from "../../../services/accesstoken.service";
import { AppUrl } from "../../../app.url";
import { StockUrl } from "../../stock.url";
import { ProductUrl } from "../../../Product/product.url";
import { IProduct } from "../../../interfaces/Product/product.interface";
import { TypeProduct } from "src/app/interfaces/Product/product-type.interface";

@Component({
  selector: "app-adjust-stock",
  templateUrl: "./adjust-stock.component.html",
  styleUrls: ["./adjust-stock.component.css"]
})
export class AdjustStockComponent {
  constructor(
    private productService: ProductService,
    private alert: AlertService,
    private router: Router,
    private accessTokenService: AccessTokenService,
    private builder: FormBuilder,
    private nativeRoute: ActivatedRoute
  ) {
    this.intailLoadFormAdjust();
    this.nativeRoute.params.forEach(qurey => {
      this.productId = qurey.id;
    });
    this.initailLoadProduct(this.productId);
  }

  productId: number;
  product: IProduct;
  form: FormGroup;

  onAdjustAmountProduct() {
    this.productService
      .onUpdateProductInStock(
        this.form.value,
        this.productId,
        this.accessTokenService.getAccesstokenStore()
      )
      .then(res => {
        this.alert.success_alert("ปรับยอดสินเค้าสำเร็จ");
        this.router.navigate(["/", AppUrl.Product, ProductUrl.DetailProduct, this.productId]);
      })
      .catch(err => {
        this.alert.error_alert(err.Message);
        this.router.navigate(["/", AppUrl.Stock, StockUrl.Stocks]);
      });
  }

  initailLoadProduct(id: number) {
    this.productService
      .onGetProductById(id, this.accessTokenService.getAccesstokenStore())
      .then(product => (this.product = product))
      .catch(err => {
        this.alert.error_alert(err.Message);
        this.router.navigate(["/", AppUrl.Stock, StockUrl.Stocks]);
      });
  }

  intailLoadFormAdjust() {
    this.form = this.builder.group({ amount_Product: [""] });
  }

  
  getType(typeNumber: TypeProduct) {
    return TypeProduct[typeNumber];
  }
}
