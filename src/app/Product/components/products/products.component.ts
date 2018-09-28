import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { AlertService } from '../../../layout/components/services/alert.service';
import { RouterModule } from '@angular/router';
import { IProduct } from '../../../interfaces/Product/product.interface';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { ISearchOption } from '../../../interfaces/search-option.interface';
import { PageChangedEvent } from 'ngx-bootstrap';
import { ISearchKey } from '../../../interfaces/search-key.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor
    (
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
  search_Text = '';
  search_Type: ISearchKey;
  search_TypeItem: ISearchKey[] = [
    { key: 'Name', value: 'search by name' },
    { key: 'Barcode', value: 'search by barcode' },
    { key: 'Barcode_Custom', value: 'search by barcode custom' },
    { key: 'Cost_Product', value: 'search by cost product' },
    { key: 'Price', value: 'search by price' },
    { key: 'Amount_Product', value: 'search by amount product' },
    { key: 'Status', value: 'search by status' },
  ]

  start_Page = 1;
  limit_Page = 10;
  Products: IProduct;
  SearchOption: ISearchOption;

  ngOnInit() {
  }

  private get getSearchtext() {
    let responseSearch = null;
    switch (this.search_Type.key) {
      case 'updated':
        console.log(this.search_Text[0], "this");
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
    });
  }

  onPageChanged(page: PageChangedEvent) {
    this.initailLoadProducts({
      Search_Text: this.getSearchtext,
      Search_Type: this.search_Type.key,
      Start_Page: page.page,
      Limit_Page: page.itemsPerPage,
    });
  }

  initailLoadProducts(option?: ISearchOption) {
    this.productService.onGetProduct(option, this.accessTokenService.getAccesstokenStore())
      .then(products => {
        this.Products = products;
        console.log(products);
      })
      .catch(err => this.alert.error_alert(err.Message));
  }
}
