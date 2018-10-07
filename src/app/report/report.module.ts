import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportSalesComponent } from './components/report-sales/report-sales.component';
import { ReportProductsalesComponent } from './components/report-productsales/report-productsales.component';
import { RouterModule } from '@angular/router';
import { ReportRouting } from './report.routing';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReportRouting,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  declarations: [ReportSalesComponent, ReportProductsalesComponent]
})
export class ReportModule { }
