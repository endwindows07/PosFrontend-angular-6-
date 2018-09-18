import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountRouting } from './account.routing';
import { LayoutModule } from '../layout/layout.module';
import { MembersComponent } from './components/members/members.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateMemberComponent } from './components/update-member/update-member.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AccountRouting,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ProfileComponent, MembersComponent, UpdateMemberComponent]
})
export class AccountModule {}
