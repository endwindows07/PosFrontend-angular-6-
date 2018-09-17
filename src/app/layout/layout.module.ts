import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FootbarComponent } from './components/footbar/footbar.component';
import { ContentComponent } from './components/content/content.component';
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TopbarComponent, 
    SidebarComponent, 
    FootbarComponent, 
    ContentComponent
  ],
  declarations: [TopbarComponent, SidebarComponent, FootbarComponent, ContentComponent]
})
export class LayoutModule { }
