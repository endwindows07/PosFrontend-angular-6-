import { Routes, RouterModule} from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountUrl } from '../account/account.url';
import { MembersComponent } from './components/members/members.component';

const RouteLists: Routes = [
    { path: '', redirectTo: AccountUrl.Profile, pathMatch: 'full' },
    { path: AccountUrl.Profile, component: ProfileComponent },
    { path: AccountUrl.Members, component: MembersComponent }
];

export const AccountRouting = RouterModule.forChild(RouteLists);
