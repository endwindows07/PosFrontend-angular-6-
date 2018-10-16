import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/layout/components/services/alert.service';
import { AccessTokenService } from 'src/app/services/accesstoken.service';
import { ISearchOption } from 'src/app/interfaces/search-option.interface';
import { IBestsalesList } from 'src/app/interfaces/report/report.bestsalesList.interface';

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
      Search_DefaultText: this.Search_DefaultText,
      Search_DefaultType: this.Search_DefaultType
    });
   }
  Start_Page: number = 1;
  Limit_Page: number = 10;

  Search_Text: string;
  Search_Type: string;

  productBestSalesList: IBestsalesList ;

  Search_DefaultType: string = 'SalesNow';
  Search_DefaultText: string = "SalesNow";
  // SalesTime 

  onInitailloadProductBestSales(option: ISearchOption){
    this.reportService.onGetProductBestSales(option, this.accessTokenService.getAccesstokenStore())
         .then(bestSalesList => {
           this.productBestSalesList = bestSalesList;
           console.log(bestSalesList);
         })
         .catch(err => {
          this.alert.error_alert(err.Message);
         });
  }
}
