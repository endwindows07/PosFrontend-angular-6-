import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { AlertService } from '../../../layout/components/services/alert.service';
import { TypeProduct, TypeProductList } from '../../../interfaces/Product/product-type.interface';
import { IOptionKey } from '../../../interfaces/search-key.interface';
import { ICategory } from '../../../interfaces/Product/product-category.interface';
import { AppUrl } from '../../../app.url';
import { ProductUrl } from '../../product.url';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent {
  constructor(
    private productService: ProductService,
    private accessTokenService: AccessTokenService,
    private roter: Router,
    private builder: FormBuilder,
    private alert: AlertService,
    private imageService: ImageService
  ) {
    this.typeSelected = this.typeItem[0];
    this.categorySelected = this.categoryItem[0];
    this.initailLoadFormCreateProduct();
  }
  AppUrl = AppUrl;
  ProductUrl = ProductUrl;
  
  form: FormGroup;
  type = TypeProduct;
  category = ICategory;

  typeSelected: IOptionKey
  typeItem: IOptionKey[] = [
    { key: this.type.อัน.toString(), value: "อัน" },
    { key: this.type.ขวด.toString(), value: "ขวด" },
    { key: this.type.ชิ้น.toString(), value: "ชิ้น" },
    { key: this.type.ด้าม.toString(), value: "ด้าม" },
    { key: this.type.เล่ม.toString(), value: "เล่ม" },
    { key: this.type.ห่อ.toString(), value: "ห่อ" },
    { key: this.type.เครื่อง.toString(), value: "เครื่อง" },
    { key: this.type.แท่ง.toString(), value: "แท่ง" },
    { key: this.type.ลูก.toString(), value: "ลูก" },
    { key: this.type.แผ่น.toString(), value: "แผ่น" },
    { key: this.type.เส้น.toString(), value: "เส้น" }
  ];

  categorySelected: IOptionKey;
  categoryItem: IOptionKey[] = [
    { key: this.category.ของใช้ทั่วไป.toString(), value: "ของใช้ทั่วไป" },
    { key: this.category.ขนม.toString(), value: "ขนม" },
    { key: this.category.อาหารสำเร็จรูป.toString(), value: "อาหารสำเร็จรูป" },
    { key: this.category.เครื่องดื่ม.toString(), value: "เครื่องดื่ม" },
    { key: this.category.เครื่องครัว.toString(), value: "เครื่องครัว" },
    { key: this.category.เครื่องสำอาง.toString(), value: "เครื่องสำอาง" },
    { key: this.category.อุปกรณ์ห้องน้ำ.toString(), value: "อุปกรณ์ห้องน้ำ" },
    { key: this.category.เครื่องเขียน.toString(), value: "เครื่องเขียน" },
    { key: this.category.เครื่องมือ.toString(), value: "เครื่องมือ" },
    { key: this.category.เครื่อใช้ไฟฟ้า.toString(), value: "เครื่อใช้ไฟฟ้า" },
    { key: this.category.ยา.toString(), value: "ยา" },
    { key: this.category.ของเล่นเด็ก.toString(), value: "ของเล่นเด็ก" },
    { key: this.category.ไม่มีหมวดหมู่.toString(), value: "ไม่มีหมวดหมู่" }
  ];
  
  onCreateProduct() {
    this.form.controls["description"].setValue("รายละเอียดสินค้าเพิ่มเติม");
    this.form.controls["expired"].setValue("2022-06-18");
    this.form.controls["status"].setValue(true);
    console.log(this.form);
    this.onSetOption();
    if(this.form.invalid){
      return this.alert.error_alert("กรุณากรอกข้อมูล");
    }

    this.productService
      .onAddProduct(
        this.form.value,
        this.accessTokenService.getAccesstokenStore()
      )
      .then(res => {
        this.alert.success_alert("Create Product Success");
        this.roter.navigate(["/", AppUrl.Product, ProductUrl.Products]);
      })
      .catch(err => this.alert.error_alert(err.Message));
  }

  onSetOption() {
    this.form.controls["type"].setValue(this.typeSelected.key);
    this.form.controls["productCategoryId"].setValue(this.categorySelected.key);
  }

  initailLoadFormCreateProduct() {
    this.form = this.builder.group({
      barcode: ["", [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      // barcode_Custom: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: [""],
      image_Url: [""],
      expired: [""],
      cost_Product: ["", [Validators.required]],
      price: ["", [Validators.required]],
      amount_Product: ["", [Validators.required]],
      type: [""],
      productCategoryId: [""],
      status: [""]
    });
  }

  randomBarcode(){
    this.form.controls["barcode"].setValue(Math.floor(1000000000000 + Math.random() * 9000000000000));
    console.log(Math.floor(1000000000000 + Math.random() * 9000000000000));
  }

  onCovertImage(input: HTMLInputElement) {
    const imageControl = this.form.controls['image_Url'];
    this.imageService
      .onConvertImage(input)
      .then(base64 => {
        imageControl.setValue(base64);
      })
      .catch(err => this.alert.error_alert(err.Message));
  }
}
