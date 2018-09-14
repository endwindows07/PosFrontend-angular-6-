import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountRouting } from './account.routing';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    AccountRouting,
    LayoutModule
  ],
  declarations: [ProfileComponent]
})
export class AccountModule { }
