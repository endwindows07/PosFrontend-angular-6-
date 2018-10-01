import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { AlertService } from '../../../layout/components/services/alert.service';
import { RouterModule } from '@angular/router';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { AppUrl } from '../../../app.url';
import { ProductUrl } from '../../../Product/product.url';
import { IOptionKey } from '../../../interfaces/search-key.interface';
import { IProduct } from '../../../interfaces/Product/product.interface';
import { ISearchOption } from '../../../interfaces/search-option.interface';
import { PageChangedEvent } from 'ngx-bootstrap';

@Component({
  selector: "app-nagative-product",
  templateUrl: "./nagative-product.component.html",
  styleUrls: ["./nagative-product.component.css"]
})
export class NagativeProductComponent {
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
      Search_DefaultType: this.searchDefaultType,
      Search_DefaultText: this.searchDefaultText
    });
  }

  AppUrl = AppUrl;
  ProductUrl = ProductUrl;
  searchDefaultType = "Amount_Product";
  searchDefaultText = -1;

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

  start_Page = 1;
  limit_Page = 8;
  Products: IProduct;
  SearchOption: ISearchOption;

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
      Start_Page: this.start_Page,
      Limit_Page: this.limit_Page,
      Search_Text: this.getSearchtext,
      Search_Type: this.search_Type.key,
      Search_DefaultType: this.searchDefaultType,
      Search_DefaultText: this.searchDefaultText
    });
  }

  onPageChanged(page: PageChangedEvent) {
    this.initailLoadProducts({
      Start_Page: page.page,
      Limit_Page: page.itemsPerPage,
      Search_Text: this.getSearchtext,
      Search_Type: this.search_Type.key,
      Search_DefaultType: this.searchDefaultType,
      Search_DefaultText: this.searchDefaultText
    });
  }

  initailLoadProducts(option?: ISearchOption) {
    this.productService
      .onGetProduct(option, this.accessTokenService.getAccesstokenStore())
      .then(products => {
        this.Products = products;
        console.log(products);
      })
      .catch(err => this.Products.cost_Product = "1");
  }
}
