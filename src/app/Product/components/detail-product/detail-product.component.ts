import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../layout/components/services/alert.service';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { IProduct } from '../../../interfaces/Product/product.interface';
import { AppUrl } from '../../../app.url';
import { ProductUrl } from '../../product.url';

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
    private nativeRoute: ActivatedRoute
  ) {
    this.nativeRoute.params.forEach(query => {
      this.ProductId = query.id;
    });
    this.initailLoadProduct(this.ProductId);
  }

  AppUrl = AppUrl;
  ProductUrl = ProductUrl;
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
}