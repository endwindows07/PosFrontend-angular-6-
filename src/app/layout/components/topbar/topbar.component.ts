import { Component, OnInit } from '@angular/core';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { Router } from '@angular/router';
import { AppUrl } from '../../../app.url';
import { AlertService } from '../services/alert.service';
import { AccountUrl } from 'src/app/account/account.url';
import { ProductService } from 'src/app/services/product.service';
import { ISearchOption } from 'src/app/interfaces/search-option.interface';
import { StockUrl } from 'src/app/stock/stock.url';
import { IProduct } from 'src/app/interfaces/Product/product.interface';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  ngOnInit(): void {
    for (let i = 0; i < this.searchDefaultText.length; i++) {
      this.onLoadProductStockAlert({
        Limit_Page: 0,
        Start_Page: 0,
        Search_DefaultText: this.searchDefaultText[i],
        Search_DefaultType: this.searchDefaultType[i]
      })
    }
  }

  constructor(
    private accessTokenService: AccessTokenService,
    private router: Router,
    private alert: AlertService,
    private productService: ProductService
  ) { }

  AppUrl = AppUrl;
  StockUrl = StockUrl;
  AccountUrl = AccountUrl;
  searchDefaultText: string[] = ["10", "30", "-1"]

  searchDefaultType: string[] = ["Amount_Product", "Expired", "Amount_Product"]

  stockAlert: string[] = [];

  onLogout() {
    this.accessTokenService.clearAccesstokenStore();
    this.router.navigate(['/', AppUrl.Login]);
    this.alert.success_alert('log out success', 'info');
  }

  onLoadProductStockAlert(options: ISearchOption) {
    this.productService.onGetProduct(options, this.accessTokenService.getAccesstokenStore())
      .then(res => {
        this.stockAlert.push(res.product_Total.toString());
        console.log(this.stockAlert);
      });
  }
  
  fullScreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
}
