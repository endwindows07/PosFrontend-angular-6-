import { RouterModule, Routes } from "@angular/router";
import { ReportSalesComponent } from "./components/report-sales/report-sales.component";
import { IRoleAccount } from "../interfaces/role";
import { ReportUrl } from "./report.url";
import { ReportProductsalesComponent } from "./components/report-productsales/report-productsales.component";
import { ProductsComponent } from "../Product/components/products/products.component";
import { CompareProductComponent } from "./components/compare-product/compare-product.component";
import { ProductBestsalesComponent } from "./components/product-bestsales/product-bestsales.component";
import { ReportDashboardComponent } from "./components/report-dashboard/report-dashboard.component";

const RouteLists: Routes = [
    { path: '', redirectTo: ReportUrl.ReportSales, pathMatch: 'full' },
    {
        path: ReportUrl.ReportSales,
        component: ReportSalesComponent,
        data: { role: [IRoleAccount.Admin] }
    },
    {
        path: ReportUrl.ReportProductSales,
        children: [
            { path: '', component: ReportProductsalesComponent },
            { path: ':id', component: ReportProductsalesComponent },
        ],
        data: { role: [IRoleAccount.Admin] }
    },
    {
        path: ReportUrl.ReportCompareProductSale,
        component: CompareProductComponent,
        data: { role: [IRoleAccount.Admin] }
    },
    {
        path: ReportUrl.ReportProductBestSales,
        component: ProductBestsalesComponent,
        data: { role: [IRoleAccount.Admin] }
    },
    {
        path: ReportUrl.ReportDashboard,
        component: ReportDashboardComponent,
        data: { role: [IRoleAccount.Admin] }
    }
];
export const ReportRouting = RouterModule.forChild(RouteLists);