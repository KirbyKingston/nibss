import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [DashboardComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
