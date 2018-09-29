import { Component, OnInit } from '@angular/core';
import { AccessTokenService } from '../../../services/accesstoken.service';
import { Router } from '@angular/router';
import { AppUrl } from '../../../app.url';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(
    private accessTokenService: AccessTokenService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit() {
  }
  
  onLogout() {
    this.accessTokenService.clearAccesstokenStore();
    this.router.navigate(['/', AppUrl.Login]);
    this.alert.success_alert('log out success', 'info');
  }
}