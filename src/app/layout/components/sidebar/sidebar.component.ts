import { Component, OnInit } from '@angular/core';
import { AppUrl } from '../../../app.url';
import { AccountUrl } from '../../../account/account.url';
import { AccontService } from '../../../services/account.service';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { IProfile } from '../../../interfaces/profile.interface';
import { IRoleAccount } from '../../../interfaces/role';
import { ProductUrl } from '../../../Product/product.url';
import { StockUrl } from '../../../stock/stock.url';
import { SalesUrl } from '../../../sales/sales.url';
import { ReportUrl } from '../../../report/report.url';
import { OrderUrl } from 'src/app/order/order.url';
declare const App: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(
    private account: AccontService,
    private accessTokenService: AccessTokenService
  ) {
    this.inittalLoadForm();
    setTimeout(() => App.loadCommonScript(), 200);
  }

  MemberProfile: IProfile;

  AppUrl = AppUrl;
  AccountUrl = AccountUrl;
  ProductUrl = ProductUrl;
  StockUrl = StockUrl;
  SalesUrl = SalesUrl;
  ReportUrl = ReportUrl;
  roleAccount = IRoleAccount;
  OrderUrl = OrderUrl;
  
  ngOnInit() {
  }

  inittalLoadForm() {
    this.account
      .onGetProfile(this.accessTokenService.getAccesstokenStore())
      .then(profile => {
        this.MemberProfile = profile;
      })
      .catch(err => this.accessTokenService.clearAccesstokenStore());
  }
}
