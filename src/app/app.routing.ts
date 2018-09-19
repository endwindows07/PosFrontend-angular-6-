import { Routes, RouterModule} from '@angular/router';
import { AppUrl } from './app.url';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationGuard } from './guard.services/authentication.guard';
import { UnAuthenticationGuard } from './guard.services/un-authentication.guard';
const RouteLists: Routes = [
    { path: '', redirectTo: AppUrl.Login, pathMatch: 'full'},
    {
        path: AppUrl.Login,
        component: LoginComponent,
        canActivate: [UnAuthenticationGuard]
    },
    {
        path: AppUrl.Account,
        loadChildren: './account/account.module#AccountModule',
        canActivate: [AuthenticationGuard]
    }
];

export const AppRouting = RouterModule.forRoot(RouteLists);

