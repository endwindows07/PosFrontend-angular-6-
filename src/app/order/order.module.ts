import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './components/orders/orders.component';
import { RouterModule } from '@angular/router';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderUpdateComponent } from './components/order-update/order-update.component';
import { OrderInsertComponent } from './components/order-insert/order-insert.component';
import { LayoutModule } from '../layout/layout.module';
import { OrderRouting } from './order.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    RouterModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    OrderRouting,
  ],
  declarations: [OrdersComponent, OrderDetailComponent, OrderUpdateComponent, OrderInsertComponent]
})
export class OrderModule { }
