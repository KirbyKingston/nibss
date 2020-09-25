import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealsRoutingModule } from './deals-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DealsDetailsComponent } from './deals-details/deals-details.component';


@NgModule({
  declarations: [DashboardComponent, DealsDetailsComponent],
  imports: [
    CommonModule,
    DealsRoutingModule
  ]
})
export class DealsModule { }
