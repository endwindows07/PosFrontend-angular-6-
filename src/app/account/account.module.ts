import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountRouting } from './account.routing';
import { LayoutModule } from '../layout/layout.module';
import { MembersComponent } from './components/members/members.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRouting,
    LayoutModule
  ],
  declarations: [ProfileComponent, MembersComponent]
})
export class AccountModule { }
