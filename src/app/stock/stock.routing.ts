import { RouterModule, Routes } from "@angular/router";
import { StockUrl } from "./stock.url";
import { StocksComponent } from "./components/stocks/stocks.component";
import { AdjustStockComponent } from "./components/adjust-stock/adjust-stock.component";
import { OutOfstockComponent } from "./components/out-ofstock/out-ofstock.component";
import { ProductExpiredComponent } from "./components/product-expired/product-expired.component";
import { NagativeProductComponent } from "./components/nagative-product/nagative-product.component";


const RouteLists: Routes = [
    { path: '', redirectTo: StockUrl.Stocks, pathMatch: 'full' },
    {
        path: StockUrl.Stocks, component: StocksComponent
    },
    {
        path: StockUrl.AdjsutStock, component: AdjustStockComponent
    },
    {
        path: StockUrl.OutOfStock, component: OutOfstockComponent
    },
    {
        path: StockUrl.ProductsNearExpired, component: ProductExpiredComponent
    },
    {
        path: StockUrl.NegativeProducts, component: NagativeProductComponent
    },
]

export const StockRouting = RouterModule.forChild(RouteLists);