import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccontService } from '../../services/account.service';
import { AccessTokenService } from '../../services/accesstoken.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor
  (
    private builder: FormBuilder,
    private router: Router,
    private account: AccontService,
    private accessTokenService: AccessTokenService
  ) 
  {
    this.inittailCreateForm()
  }

  form: FormGroup;

  ngOnInit() {
  }

  onSubmit () {
    this.account.onLogin(this.form.value)
                .then(res => {
                  this.accessTokenService.setAccesstokenStore(res.accessToken);
                  console.log('success.');
                })
                .catch(err => console.log(err.Message));
  }

  private inittailCreateForm (){
    this.form = this.builder.group({
      Username: [''],
      Password: ['']
    });
  }
}
