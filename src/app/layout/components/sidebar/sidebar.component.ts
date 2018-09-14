import { Component, OnInit } from '@angular/core';
import { AppUrl } from '../../../app.url';
import { AccountUrl } from '../../../account/account.url';
declare const App: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() 
  {
  }

  ngOnInit() {
    App.loadCommonScript();
  }
  
  AppUrl = AppUrl;
  AccountUrl = AccountUrl;
}
