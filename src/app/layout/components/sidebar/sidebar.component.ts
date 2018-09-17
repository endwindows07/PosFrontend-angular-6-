import { Component, OnInit } from '@angular/core';
import { AppUrl } from '../../../app.url';
import { AccountUrl } from '../../../account/account.url';
import { AccontService } from '../../../services/account.service';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { IProfile } from '../../../interfaces/profile.interface';
declare const App: any;
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  constructor(
    private account: AccontService,
    private accessTokenService: AccessTokenService
  ) {
    this.inittalLoadForm();
    
    setTimeout(() => App.loadCommonScript(), 100);
  }

  MemberProfile: IProfile;
  AppUrl = AppUrl;
  AccountUrl = AccountUrl;

  ngOnInit() {
  }

  inittalLoadForm() {
    this.account
      .onGetProfile(this.accessTokenService.getAccesstokenStore())
      .then(profile => {
        this.MemberProfile = profile;
        console.log(profile);
        console.log("load profile success");
      })
      .catch(err => console.log(err.Message));
  }
}
