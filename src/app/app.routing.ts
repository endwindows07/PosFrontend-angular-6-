import { Routes, RouterModule } from "@angular/router";
import { AppUrl } from "./app.url";
import { LoginComponent } from "./components/login/login.component";
import { AuthenticationGuard } from "./guard.services/authentication.guard";
import { UnAuthenticationGuard } from "./guard.services/un-authentication.guard";

const RouteLists: Routes = [
  { path: "", redirectTo: AppUrl.Login, pathMatch: "full" },
  {
    path: AppUrl.Login,
    component: LoginComponent,
    canActivate: [UnAuthenticationGuard]
  },
  {
    path: AppUrl.Account,
    loadChildren: "./account/account.module#AccountModule",
    canActivate: [AuthenticationGuard]
  },
  {
    path: AppUrl.Product,
    loadChildren: "./Product/product.module#ProductModule",
    canActivate: [AuthenticationGuard]
  },
  {
    path: AppUrl.Stock,
    loadChildren: "./stock/stock.module#StockModule",
    canActivate: [AuthenticationGuard]
  },
  {
    path: AppUrl.Sales,
    loadChildren: "./sales/sales.module#SalesModule",
    canActivate: [AuthenticationGuard]
  },
  {
    path: AppUrl.Report,
    loadChildren: "./report/report.module#ReportModule",
    canActivate: [AuthenticationGuard]
  }
];

export const AppRouting = RouterModule.forRoot(RouteLists);
