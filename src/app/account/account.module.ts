import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountRouting } from './account.routing';

@NgModule({
  imports: [
    CommonModule,
    AccountRouting
  ],
  declarations: [ProfileComponent]
})
export class AccountModule { }
