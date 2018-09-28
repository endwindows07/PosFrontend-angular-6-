import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FootbarComponent } from './components/footbar/footbar.component';
import { ContentComponent } from './components/content/content.component';
import { RouterModule } from '@angular/router';
import { AlertModule, BsDropdownModule, PaginationModule, BsDatepickerModule } from 'ngx-bootstrap';
import { AlertService } from './components/services/alert.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  exports: [
    TopbarComponent,
    SidebarComponent,
    FootbarComponent,
    ContentComponent,
    BsDropdownModule,
    AlertModule,
    PaginationModule,
    BsDropdownModule,
    BsDatepickerModule
  ],
  declarations: [TopbarComponent, SidebarComponent, FootbarComponent, ContentComponent],
  providers: [
    AlertService
  ]
})
export class LayoutModule { }
