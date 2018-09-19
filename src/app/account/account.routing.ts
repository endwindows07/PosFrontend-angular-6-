import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountUrl } from '../account/account.url';
import { MembersComponent } from './components/members/members.component';
import { UpdateMemberComponent } from './components/update-member/update-member.component';
import { IRoleAccount } from '../interfaces/role';

const RouteLists: Routes = [
  { path: '', redirectTo: AccountUrl.Profile, pathMatch: 'full' },
  { path: AccountUrl.Profile, component: ProfileComponent },
  {
    path: AccountUrl.Members,
    component: MembersComponent,
    data: {role: [IRoleAccount.Admin]}
  },
  {
    path: AccountUrl.UpdateMember,
    children: [
      { path: '', component: MembersComponent },
      { path: ':id', component: UpdateMemberComponent }
    ],
    data: { role: [IRoleAccount.Admin] }
  }
];
export const AccountRouting = RouterModule.forChild(RouteLists);
