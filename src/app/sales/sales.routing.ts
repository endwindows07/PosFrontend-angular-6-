import { RouterModule, Routes } from "@angular/router";
import { SalesUrl } from "./sales.url";
import { ProductSalesComponent } from "./components/product-sales/product-sales.component";
import { CancelBillsalesComponent } from "./components/cancel-billsales/cancel-billsales.component";
import { IRoleAccount } from "../interfaces/role";

const RouteLists: Routes = [
  { path: "", redirectTo: SalesUrl.ProductSales, pathMatch: "full" },
  {
    path: SalesUrl.ProductSales,
    component: ProductSalesComponent,
    data: { role: [IRoleAccount.Admin] }
  },
  {
    path: SalesUrl.CancelProductSales,
    component: CancelBillsalesComponent,
    data: { role: [IRoleAccount.Admin] }
  }
];

export const SalesRounting = RouterModule.forChild(RouteLists);
