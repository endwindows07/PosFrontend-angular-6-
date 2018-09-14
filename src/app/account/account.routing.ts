import { Routes, RouterModule} from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountUrl } from '../account/account.url'

const RouteLists: Routes = [
    { path: '', redirectTo: AccountUrl.Profile, pathMatch: 'full'},
    { path: AccountUrl.Profile, component: ProfileComponent }
];

export const AccountRouting = RouterModule.forChild(RouteLists);