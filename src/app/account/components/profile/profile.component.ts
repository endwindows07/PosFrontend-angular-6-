import { Component, OnInit } from '@angular/core';
import { IProfile } from '../../../interfaces/profile.interface';
import { AccontService } from '../../../services/account.service';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { Router } from '@angular/router';
import { AppUrl } from '../../../app.url';
import { AccountUrl } from '../../account.url';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertService } from '../../../layout/components/services/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(
    private account: AccontService,
    private accessTokenService: AccessTokenService,
    private router: Router,
    private builder: FormBuilder,
    private alert: AlertService,

  ) {
    this.initialLoadProfile();
    this.initialLoadFromUpdate();
    this.initailLoadFormChangePassword();
  }

  MemberProfile: IProfile;
  AppUrl = AppUrl;
  AccountUrl = AccountUrl;
  form: FormGroup;
  formPassword: FormGroup;

  ngOnInit() { }

  initialLoadProfile() {
    this.account
      .onGetProfile(this.accessTokenService.getAccesstokenStore())
      .then(profile => {
        this.MemberProfile = profile;
        this.form.controls['username'].setValue(profile.username);
        this.form.controls['fristname'].setValue(profile.fristname);
        this.form.controls['lastname'].setValue(profile.lastname);
      })
      .catch(err => {
        this.router.navigate(['/', AppUrl.Login]);
      });
  }

  onSubmitUpdate() {
    this.account
      .onUpdateProfile(this.form.value, this.accessTokenService.getAccesstokenStore())
      .then(res => {
        this.router.navigate(['/', AppUrl.Account, AccountUrl.Profile]);
        this.alert.success_alert('update success');
        this.initialLoadProfile();
      })
      .catch(err => this.alert.error_alert(err.Message));
  }

  initialLoadFromUpdate() {
    this.form = this.builder.group({
      username: [],
      fristname: [],
      lastname: [],
      image: []
    });
  }

  // change password form
  onChangePassword() {
    this.account
      .onChangePassword(
        this.formPassword.value,
        this.accessTokenService.getAccesstokenStore()
      )
      .then(res => {
        this.router.navigate(['/', AppUrl.Account, AccountUrl.Profile]);
        console.log('change password success');
        this.alert.success_alert('change password success');
      })
      .catch(err => this.alert.error_alert(err.Message));
  }

  initailLoadFormChangePassword() {
    this.formPassword = this.builder.group({
      new_Password: [],
      old_Password: [],
      cnew_password: []
    });
  }
}
