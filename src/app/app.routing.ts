import { Routes, RouterModule} from '@angular/router';
import { AppUrl } from './app.url';
import { LoginComponent } from './components/login/login.component';
const RouteLists: Routes = [
    { path: '', redirectTo: AppUrl.Login, pathMatch: 'full'},
    { path: AppUrl.Login, component: LoginComponent },
    { path: AppUrl.Account, loadChildren: './account/account.module#AccountModule'}
];

export const AppRouting = RouterModule.forRoot(RouteLists);

