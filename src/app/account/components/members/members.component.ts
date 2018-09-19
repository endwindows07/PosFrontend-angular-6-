import { Component, OnInit } from "@angular/core";
import { AccontService } from "../../../services/account.service";
import { Router } from "@angular/router";
import { AccessTokenService } from "../../../services/accesstoken.service";
import { IMember } from "../../../interfaces/member.interface";
import { AppUrl } from "../../../app.url";
import { AccountUrl } from '../../account.url';
import { IAccount } from '../../../interfaces/account.interface';
import { AlertService } from "../../../layout/components/services/alert.service";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  constructor(
    private account: AccontService,
    private accessTokenService: AccessTokenService,
    private alert: AlertService,
    private router: Router
  ) {
    this.initLoadAllMember();
  }

  MemberList: IMember;
  AppUrl = AppUrl;
  AccountUrl = AccountUrl;

  ngOnInit() { }

  initLoadAllMember() {
    this.account
      .onGetAllMember(this.accessTokenService.getAccesstokenStore())
      .then(members => {
        this.MemberList = members;
      })
      .catch(err => console.log('load false'));
  }
  onUpdate(member: IAccount) {
    this.router.navigate(['/', AppUrl.Account, AccountUrl.UpdateMember, member.Id])
      .then(() => this.alert.success_alert('update success'))
      .catch(err => this.alert.error_alert(err.Message));
  }
}
