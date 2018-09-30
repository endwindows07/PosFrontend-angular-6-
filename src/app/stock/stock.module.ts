import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { StockRouting } from "./stock.routing";
import { LayoutModule } from "../layout/layout.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StocksComponent } from "./components/stocks/stocks.component";
import { AdjustStockComponent } from "./components/adjust-stock/adjust-stock.component";
import { OutOfstockComponent } from "./components/out-ofstock/out-ofstock.component";
import { ProductExpiredComponent } from "./components/product-expired/product-expired.component";
import { NagativeProductComponent } from "./components/nagative-product/nagative-product.component";

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule,
    StockRouting,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    StocksComponent,
    AdjustStockComponent,
    OutOfstockComponent,
    ProductExpiredComponent,
    NagativeProductComponent
  ]
})
export class StockModule {}
