import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { AlertService } from '../../../layout/components/services/alert.service';
import { RouterModule } from '@angular/router';
import { IProduct } from '../../../interfaces/Product/product.interface';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { ISearchOption } from '../../../interfaces/search-option.interface';
import { PageChangedEvent } from 'ngx-bootstrap';
import { IOptionKey } from '../../../interfaces/search-key.interface';
import { AppUrl } from '../../../app.url';
import { ProductUrl } from '../../product.url';
import { ICategory } from '../../../interfaces/Product/product-category.interface';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent {
  constructor(
    private productService: ProductService,
    private alert: AlertService,
    private router: RouterModule,
    private accessTokenService: AccessTokenService
  ) {
    this.search_Type = this.search_TypeItem[0];
    this.initailLoadProducts({
      Start_Page: this.start_Page,
      Limit_Page: this.limit_Page,
    });
  }

  AppUrl = AppUrl;
  ProductUrl = ProductUrl;

  search_Text = "";
  search_Type: IOptionKey;
  search_TypeItem: IOptionKey[] = [
    { key: "Name", value: "ค้นหาด้วย ชื่อสินค้า" },
    { key: "Barcode", value: "ค้นหาด้วย รหัสแท่ง" },
    { key: "Barcode_Custom", value: "ค้นหาด้วย รหัสกำหนดเอง" },
    { key: "Cost_Product", value: "ค้นหาด้วย ราคาทุนสินค้า" },
    { key: "Price", value: "ค้นหาด้วย ราคาขายสินค้า" },
    { key: "Amount_Product", value: "ค้นหาด้วย จำนวนสินค้า" },
    { key: "Status", value: "ค้นหาด้วย สถานะ" }
  ];

  category = ICategory;
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

  start_Page = 1;
  limit_Page = 8;
  Products: IProduct;
  SearchOption: ISearchOption;

  searchDefaultType = "ProductCategoryId";
  searchDefaultText;

  getStatus(status: boolean) {
    switch (status) {
      case true:
        return "พร้อมขาย";
      case false:
        return "ไม่พร้อมขาย";
    }
  }

  private get getSearchtext() {
    let responseSearch = null;
    switch (this.search_Type.key) {
      case "updated":
        responseSearch = { from: this.search_Text[0], to: this.search_Text[1] };
        break;
      default:
        responseSearch = this.search_Text;
        break;
    }
    return responseSearch;
  }

  onClickSearch() {
    this.initailLoadProducts({
      Search_Text: this.getSearchtext,
      Search_Type: this.search_Type.key,
      Start_Page: this.start_Page,
      Limit_Page: this.limit_Page,
      Search_DefaultType: this.searchDefaultType,
      Search_DefaultText: this.categorySelected.value
    });
  }

  onPageChanged(page: PageChangedEvent) {
    this.initailLoadProducts({
      Search_Text: this.getSearchtext,
      Search_Type: this.search_Type.key,
      Start_Page: page.page,
      Limit_Page: page.itemsPerPage,
      Search_DefaultType: this.searchDefaultType,
      Search_DefaultText: this.categorySelected.value
    });
  }

  initailLoadProducts(option?: ISearchOption) {
    this.productService
      .onGetProduct(option, this.accessTokenService.getAccesstokenStore())
      .then(products => {
        this.Products = products;
      })
      .catch(err => this.alert.error_alert(err.Message));
  }
}
