import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/layout/components/services/alert.service';
import { AccessTokenService } from 'src/app/services/accesstoken.service';
import { ISearchOption } from 'src/app/interfaces/search-option.interface';
import { IBestsalesList } from 'src/app/interfaces/report/report.bestsalesList.interface';
import { PageChangedEvent } from 'ngx-bootstrap';
import { AppUrl } from 'src/app/app.url';
import { ProductUrl } from 'src/app/Product/product.url';

@Component({
  selector: 'app-product-bestsales',
  templateUrl: './product-bestsales.component.html',
  styleUrls: ['./product-bestsales.component.css']
})
export class ProductBestsalesComponent {

  constructor(
    private reportService: ReportService,
    private router: Router,
    private alert: AlertService,
    private accessTokenService: AccessTokenService, 
  ) {
    this.onInitailloadProductBestSales({
      Start_Page: this.Start_Page,
      Limit_Page: this.Limit_Page,
      Search_Text: 'SalesNow',
      Search_Type: 'SalesNow',
      // Search_DefaultText: 'เครื่องเขียน',
      // Search_DefaultType:  'roductCategoryId'
    });
   }

  
  
  AppUrl = AppUrl;
  ProductUrl = ProductUrl;
  
  Start_Page: number = 1;
  Limit_Page: number = 10;


  productBestSalesList: IBestsalesList ;

  Search_DefaultText: string ;
  Search_DefaultType: string ;
  // SalesTime 

  onInitailloadProductBestSales(option: ISearchOption){
    this.reportService.onGetProductBestSales(option, this.accessTokenService.getAccesstokenStore())
         .then(bestSalesList => {
           this.productBestSalesList = bestSalesList;
         })
         .catch(err => {
          this.alert.error_alert(err.Message);
         });
  }

  onClickSearch(){
    if(this.Search_DefaultText){
      this.onInitailloadProductBestSales({
        Start_Page: this.Start_Page,
        Limit_Page: this.Limit_Page,
        Search_DefaultText: this.onDateCut(this.Search_DefaultText[0].toString(), this.Search_DefaultText[1].toString()),
        Search_DefaultType: "SalesTime"
      });
    }else{
      this.onInitailloadProductBestSales({
        Start_Page: this.Start_Page,
        Limit_Page: this.Limit_Page,
        Search_DefaultText: "SalesNow",
        Search_DefaultType: "SalesNow"
      });
    }
  }

  onPageChanged(page: PageChangedEvent) {
    if (this.Search_DefaultText) {
      this.onInitailloadProductBestSales({
        Start_Page: page.page,
        Limit_Page: page.itemsPerPage,
        Search_DefaultText: this.onDateCut(this.Search_DefaultText[0].toString(), this.Search_DefaultText[1].toString()),
        Search_DefaultType: "SalesTime"
      });
    } else {
      this.onInitailloadProductBestSales({
        Start_Page: page.page,
        Limit_Page: page.itemsPerPage,
        Search_DefaultText: "SalesNow",
        Search_DefaultType: "SalesNow"
      });
    }
  }

  onDateCut(dateTo: string, dateFrom: string) {
    return dateTo.replace(" GMT+0700 (เวลาอินโดจีน)", "") + "&" + dateFrom.replace(" GMT+0700 (เวลาอินโดจีน)", "");
  }

}
