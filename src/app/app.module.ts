import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe, CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AppRouting } from './app.routing';
import { LayoutModule } from './layout/layout.module';
import { AccontService } from './services/account.service';
import { ProductService } from './services/product.service';
import { SalesService } from './services/sales.service';
import { ReportService } from './services/report.service';
import { OrderService } from './services/order.service';
import { ImageService } from './services/image.service';
import { PrintBill } from './services/print.service';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    AppRouting,
    HttpClientModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AccontService, ProductService, SalesService, ReportService, OrderService, ImageService, PrintBill],
  bootstrap: [AppComponent]
})
export class AppModule {}
