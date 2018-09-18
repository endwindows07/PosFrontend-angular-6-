import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccontService } from '../../services/account.service';
import { AccessTokenService } from '../../services/accesstoken.service';
import { AppUrl } from '../../app.url';
import { AccountUrl } from '../../account/account.url';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private account: AccontService,
    private accessTokenService: AccessTokenService
  ) {
    this.inittailCreateForm();
  }

  form: FormGroup;
  AppUrl = AppUrl;
  Account = AccountUrl;

  ngOnInit() {}

  onSubmit() {
    this.account
      .onLogin(this.form.value)
      .then(res => {
        this.accessTokenService.setAccesstokenStore(res.accessToken);
        this.router.navigate(['/', AppUrl.Account, AccountUrl.Profile]);
      })
      .catch(err => console.log(err.Message));
  }

  private inittailCreateForm() {
    this.form = this.builder.group({
      Username: [''],
      Password: ['']
    });
  }
}
