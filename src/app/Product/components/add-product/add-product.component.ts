import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../../../layout/components/services/alert.service';
import { TypeProduct } from '../../../interfaces/Product/product-type.interface';
import { IOptionKey } from '../../../interfaces/search-key.interface';
import { ICategory } from '../../../interfaces/Product/product-category.interface';
import { AppUrl } from '../../../app.url';
import { ProductUrl } from '../../product.url';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent {
  constructor(
    private productService: ProductService,
    private accessTokenService: AccessTokenService,
    private roter: Router,
    private builder: FormBuilder,
    private alert: AlertService
  ) {
    this.typeSelected = this.typeItem[0];
    this.categorySelected = this.categoryItem[0];
    this.initailLoadFormCreateProduct();
  }

  form: FormGroup;
  type = TypeProduct;
  category = ICategory;

  typeSelected: IOptionKey;
  typeItem: IOptionKey[] = [
    { key: this.type.ชิ้น.toString(), value: 'ชิ้น' },
    { key: this.type.อัน.toString(), value: 'อัน' },
    { key: this.type.แท่ง.toString(), value: 'แท่ง' }
  ]

  categorySelected: IOptionKey;
  categoryItem: IOptionKey[] = [
    { key: this.category.Game.toString(), value: 'Game' },
    { key: this.category.Food.toString(), value: 'Food' },
    { key: this.category.ElectronicTool.toString(), value: 'ElectronicTool' }
  ]

  onCreateProduct() {
    this.onSetOption();
    this.productService.onAddProduct(this.form.value, this.accessTokenService.getAccesstokenStore())
      .then(res => {
        this.alert.success_alert("Create Product Success");
        this.roter.navigate(['/', AppUrl.Product, ProductUrl.Products]);
      })
      .catch(err => this.alert.error_alert(err.Message));
  }

  onSetOption() {
    this.form.controls["type"].setValue(this.typeSelected.key);
    this.form.controls["productCategoryId"].setValue(this.categorySelected.key);
  }

  initailLoadFormCreateProduct() {
    this.form = this.builder.group({
      barcode: [''],
      barcode_Custom: [''],
      name: [''],
      description: [''],
      image_Url: [''],
      expired: [''],
      cost_Product: [''],
      price: [''],
      amount_Product: [''],
      type: [''],
      productCategoryId: ['']
    })
  }
}
