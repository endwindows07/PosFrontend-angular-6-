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
    this.typeSelected = this.typeItem[0];
    this.categorySelected = this.categoryItem[0];
    this.initailLoadFormCreateProduct();
    this.onLoadProduct(this.ProductId);
  }

  form: FormGroup;
  ProductId: number;
  Product: IProduct;

  expired: string[];

  type = TypeProduct;
  typeSelected: IOptionKey;
  typeItem: IOptionKey[] = [
    { key: this.type.ชิ้น.toString(), value: "ชิ้น" },
    { key: this.type.อัน.toString(), value: "อัน" },
    { key: this.type.แท่ง.toString(), value: "แท่ง" }
  ];

  category = ICategory;
  categorySelected: IOptionKey;
  categoryItem: IOptionKey[] = [
    { key: this.category.Game.toString(), value: "Game" },
    { key: this.category.Food.toString(), value: "Food" },
    { key: this.category.ElectronicTool.toString(), value: "ElectronicTool" }
  ];

  onLoadProduct(id: number) {
    this.productService
      .onGetProductById(id, this.accessTokenService.getAccesstokenStore())
      .then(product => {

        this.typeSelected = this.typeItem[product.type];
        this.categorySelected = this.categoryItem[product.productCategoryId];

        this.expired = product.expired.split("T");
        this.expired = this.expired[0].split("-");

        this.form.controls["expired"].setValue( this.expired[1] + "/" + this.expired[2] + "/" + this.expired[0] );
        this.form.controls["name"].setValue(product.name);
        this.form.controls["barcode"].setValue(product.barcode);
        this.form.controls["barcode_Custom"].setValue(product.barcode_Custom);
        this.form.controls["description"].setValue(product.description);
        this.form.controls["cost_Product"].setValue(product.cost_Product);
        this.form.controls["price"].setValue(product.price);
        this.form.controls["amount_Product"].setValue(product.amount_Product);
        this.form.controls["type"].setValue(this.typeSelected.key);
        this.form.controls["productCategoryId"].setValue( this.categorySelected.key );
      })
      .catch(err => {
        this.alert.error_alert(err.Message);
        this.router.navigate(["", AppUrl.Product, ProductUrl.Products]);
      });
  }

  onUpdateProduct() {
    this.onSetOption();
    this.productService
      .onUpdateProduct(this.form.value, this.ProductId, this.accessTokenService.getAccesstokenStore())
        .then(res => {
          this.alert.success_alert("update product success");
          this.router.navigate(["/", AppUrl.Product, ProductUrl.Products]);
        })
        .catch(err => {
          this.alert.error_alert(err.Message);
          this.router.navigate(["/", AppUrl.Product, ProductUrl.Products]);
        });
  }

  onSetOption() {
    this.form.controls["type"].setValue(this.typeSelected.key);
    this.form.controls["productCategoryId"].setValue(
      this.categorySelected.key
    );
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
