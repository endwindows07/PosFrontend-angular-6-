import { Component, OnInit } from '@angular/core';
import { IProfile } from '../../../interfaces/profile.interface';
import { AccontService } from '../../../services/account.service';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { IMember } from '../../../interfaces/member.interface';
import { Router } from '@angular/router';
import { AppUrl } from '../../../app.url'
import { AccountUrl } from '../../account.url';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(
    private account: AccontService,
    private accessTokenService: AccessTokenService,
    private router: Router
  ) {
    this.inittalLoadProfile();

  }

  MemberProfile: IProfile;

  AppUrl = AppUrl;
  AccountUrl = AccountUrl;

  ngOnInit() {}


  inittalLoadProfile() {
    this.account
      .onGetProfile(this.accessTokenService.getAccesstokenStore())
      .then(profile => {
        this.MemberProfile = profile;
        console.log("load profile success", profile);
      })
      .catch(err => {
        this.router.navigate(["/", AppUrl.Login]);
      });
  }


}
