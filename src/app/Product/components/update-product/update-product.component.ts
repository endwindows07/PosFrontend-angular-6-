import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../services/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../layout/components/services/alert.service";
import { AccessTokenService } from "../../../services/accesstoken.service";
import { IProduct } from "../../../interfaces/Product/product.interface";
import { FormGroup, FormBuilder } from "@angular/forms";
import { TypeProduct } from "../../../interfaces/Product/product-type.interface";
import { ICategory } from "../../../interfaces/Product/product-category.interface";
import { IOptionKey } from "../../../interfaces/search-key.interface";
import { AppUrl } from "../../../app.url";
import { ProductUrl } from "../../product.url";

@Component({
  selector: "app-update-product",
  templateUrl: "./update-product.component.html",
  styleUrls: ["./update-product.component.css"]
})
export class UpdateProductComponent {
  constructor(
    private productService: ProductService,
    private router: Router,
    private alert: AlertService,
    private accessTokenService: AccessTokenService,
    private builder: FormBuilder,
    private nativeRoute: ActivatedRoute
  ) {
    this.nativeRoute.params.forEach(query => {
      this.ProductId = query.id;
    });
    this.typeProductKey = this.typeProductItem[0];
    this.categorySelection = this.categoryItem[0];
    this.initailLoadFormCreateProduct();
    this.onLoadProduct(this.ProductId);
  }
  
  form: FormGroup;
  ProductId: number;
  Product: IProduct;
  
  expired: string[];
  
  type = TypeProduct;
  typeProductKey: IOptionKey;
  typeProductItem: IOptionKey[] = [
    { key: this.type.ชิ้น.toString(), value: "ชิ้น" },
    { key: this.type.อัน.toString(), value: "อัน" },
    { key: this.type.แท่ง.toString(), value: "แท่ง" }
  ];
  
  category = ICategory;
  categorySelection: IOptionKey;
  categoryItem: IOptionKey[] = [
    { key: this.category.Game.toString(), value: "Game" },
    { key: this.category.Food.toString(), value: "Food" },
    { key: this.category.ElectronicTool.toString(), value: "ElectronicTool" }
  ];

  onLoadProduct(id: number) {
    this.productService
      .onGetProductById(id, this.accessTokenService.getAccesstokenStore())
      .then(product => {
        this.expired = product.expired.split("T");
        this.expired = this.expired[0].split("-");
        this.form.controls["expired"].setValue( this.expired[1] + "/" + this.expired[2] + "/" + this.expired[0]);
        this.form.controls["name"].setValue(product.name);
        this.form.controls["barcode"].setValue(product.barcode);
        this.form.controls["barcode_Custom"].setValue(product.barcode_Custom);
        this.form.controls["description"].setValue(product.description);
        this.form.controls["cost_Product"].setValue(product.cost_Product);
        this.form.controls["price"].setValue(product.price);
        this.form.controls["amount_Product"].setValue(product.amount_Product);
        this.typeProductKey.key = product.type.toString();
        this.categorySelection.key = product.productCategoryId.toString();
      })
      .catch(err => {
        this.alert.error_alert(err.Message);
        this.router.navigate(["", AppUrl.Product, ProductUrl.Products]);
      });
  }

  initailLoadFormCreateProduct() {
    this.form = this.builder.group({
      barcode: [""],
      barcode_Custom: [""],
      name: [""],
      description: [""],
      image_Url: [""],
      expired: [""],
      cost_Product: [""],
      price: [""],
      amount_Product: [""],
      type: [""],
      productCategoryId: [""]
    });
  }
}
