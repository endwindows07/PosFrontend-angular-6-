import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule } from '@angular/router';
import { ProductRounting } from './product.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProductRounting,
    LayoutModule,
    FormsModule,

    ReactiveFormsModule
  ],
  declarations: [ProductsComponent, AddProductComponent, UpdateProductComponent, DetailProductComponent]
})
export class ProductModule { }
