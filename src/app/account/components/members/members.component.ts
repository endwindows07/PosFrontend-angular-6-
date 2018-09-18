import { Component, OnInit } from '@angular/core';
import { AccontService } from '../../../services/account.service';
import { Router } from '@angular/router';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { IMember } from '../../../interfaces/member.interface';
import { AppUrl } from '../../../app.url';
import { AccountUrl } from '../../account.url';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  constructor(
    private account: AccontService,
    private accessTokenService: AccessTokenService,
    private router: Router
  ) {
    this.initLoadAllMember();
  }

  MemberList: IMember;
  AppUrl = AppUrl;
  AccountUrl = AccountUrl;

  ngOnInit() {}
  initLoadAllMember() {
    this.account
      .onGetAllMember(this.accessTokenService.getAccesstokenStore())
      .then(members => {
        this.MemberList = members;
        console.log(members, 'this');
      })
      .catch(err => console.log('load false'));
  }
}
