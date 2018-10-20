import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../services/product.service";
import { AlertService } from "../../../layout/components/services/alert.service";
import { RouterModule } from "@angular/router";
import { AccessTokenService } from "../../../services/accesstoken.service";
import { AppUrl } from "../../../app.url";
import { ProductUrl } from "../../../Product/product.url";
import { IOptionKey } from "../../../interfaces/search-key.interface";
import { IProduct } from "../../../interfaces/Product/product.interface";
import { ISearchOption } from "../../../interfaces/search-option.interface";
import { PageChangedEvent } from "ngx-bootstrap";
import { DatePipe } from "@angular/common";
import { IProductList } from "../../../interfaces/Product/product-list.interface";
import { ICategory } from "src/app/interfaces/Product/product-category.interface";

@Component({
  selector: "app-product-expired",
  templateUrl: "./product-expired.component.html",
  styleUrls: ["./product-expired.component.css"]
})
export class ProductExpiredComponent {
  constructor(
    private productService: ProductService,
    private alert: AlertService,
    private router: RouterModule,
    private accessTokenService: AccessTokenService
  ) {    
    this.initailLoadProducts({
      Start_Page: this.start_Page,
      Limit_Page: this.limit_Page,
      Search_DefaultType: this.searchDefaultType,
      Search_DefaultText: this.searchDefaultText
    });
  }

  AppUrl = AppUrl;
  ProductUrl = ProductUrl;
  searchDefaultType = "Expired";
  searchDefaultText = 30;

  search_Text: string = "";
  search_Type: string = "Name";

  start_Page = 1;
  limit_Page = 8;
  Products: IProductList;  
  SearchOption: ISearchOption;

  private getTimeRemaining(dateTimeProduct: string) {
    let dateTimeExpiredRemaining: string;

    let dateNow = new Date();
    let day: number;
    let month: number;

    month = Number.parseInt(dateTimeProduct.split("-")[1]);
    day = Number.parseInt(dateTimeProduct.split("-")[2]);
    
    if ((dateNow.getMonth() + 1) > month || dateNow.getDate() > day) {
      return "สินค้าหมดอายุ";
    }

    dateTimeExpiredRemaining = "เหลือ " + ( day - dateNow.getUTCDate()).toString() + " วัน";
    return dateTimeExpiredRemaining;
  }

  onClickSearch() {
    this.initailLoadProducts({
      Search_Text: this.search_Text,
      Search_Type: this.search_Type,
      Start_Page: this.start_Page,
      Limit_Page: this.limit_Page,
      Search_DefaultType: this.searchDefaultType,
      Search_DefaultText: this.searchDefaultText
    });
  }



  onPageChanged(page: PageChangedEvent) {
    this.initailLoadProducts({
      Search_Text: this.search_Text,
      Search_Type: this.search_Type,
      Start_Page: page.page,
      Limit_Page: page.itemsPerPage,
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
      .catch(err => this.alert.error_alert(err.Message));
  }

  getStatus(status: boolean) {
    switch (status) {
      case true:
        return "พร้อมขาย";
      case false:
        return "ไม่พร้อมขาย";
    }
  }
}
