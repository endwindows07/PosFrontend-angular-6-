import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductSalesComponent } from "./components/product-sales/product-sales.component";
import { CancelBillsalesComponent } from "./components/cancel-billsales/cancel-billsales.component";
import { RouterModule } from "@angular/router";
import { LayoutModule } from "../layout/layout.module";
import { SalesRounting } from "./sales.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    FormsModule,
    SalesRounting,
    ReactiveFormsModule,
  ],
  declarations: [ProductSalesComponent, CancelBillsalesComponent]
})
export class SalesModule {}
