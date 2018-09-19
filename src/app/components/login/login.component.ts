import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AccontService } from "../../services/account.service";
import { AccessTokenService } from "../../services/accesstoken.service";
import { AppUrl } from "../../app.url";
import { AccountUrl } from "../../account/account.url";
import { AlertService } from '../../layout/components/services/alert.service';
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
    private accessTokenService: AccessTokenService,
    private alert: AlertService
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
        this.alert.success_alert('login success');
      })
      .catch(err => this.alert.error_alert(err.Message));
  }

  private inittailCreateForm() {
    this.form = this.builder.group({
      Username: [''],
      Password: ['']
    });
  }
}
