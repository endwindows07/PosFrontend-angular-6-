import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../services/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../layout/components/services/alert.service";
import { AccessTokenService } from "../../../services/accesstoken.service";
import { IProduct } from "../../../interfaces/Product/product.interface";
import { AppUrl } from "../../../app.url";
import { ProductUrl } from "../../product.url";
import { ICategory } from "../../../interfaces/Product/product-category.interface";
import { TypeProduct } from "../../../interfaces/Product/product-type.interface";
import { StockUrl } from "../../../stock/stock.url";
import { ReportUrl } from "../../../report/report.url";
import { IProfile } from "src/app/interfaces/profile.interface";
import { IRoleAccount } from "src/app/interfaces/role";
import { AccontService } from "src/app/services/account.service";

@Component({
  selector: "app-detail-product",
  templateUrl: "./detail-product.component.html",
  styleUrls: ["./detail-product.component.css"]
})
export class DetailProductComponent {
  constructor(
    private productService: ProductService,
    private router: Router,
    private alert: AlertService,
    private accessTokenService: AccessTokenService,
    private nativeRoute: ActivatedRoute,
    private account: AccontService
  ) {
    this.nativeRoute.params.forEach(query => {
      this.ProductId = query.id;
    });
    this.initailLoadProduct(this.ProductId);
    this.initailLoadUserLogin();
  }

  userLogin: IProfile;
  checkRole: IRoleAccount;

  initailLoadUserLogin() {
    this.account
      .onGetProfile(this.accessTokenService.getAccesstokenStore())
      .then(user => {
        this.userLogin = user;
      })
      .catch(err => this.accessTokenService.clearAccesstokenStore());
  }
  
  AppUrl = AppUrl;
  ProductUrl = ProductUrl;
  StockUrl = StockUrl;
  ReportUrl = ReportUrl;
  
  ProductId: number;
  Product: IProduct;

  initailLoadProduct(id: number) {
    this.productService
      .onGetProductById(id, this.accessTokenService.getAccesstokenStore())
      .then(product => {
        this.Product = product;
      })
      .catch(err => this.alert.error_alert(err.Message));
  }

  getCategory(categoryNumber: ICategory) {
    return ICategory[categoryNumber];
  }

  getType(typeNumber: TypeProduct) {
    return TypeProduct[typeNumber];
  }
}
