import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealsRoutingModule } from './deals-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DealsDetailsComponent } from './deals-details/deals-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [DashboardComponent, DealsDetailsComponent],
  imports: [
    CommonModule,
    DealsRoutingModule,
    SharedModule,
    FormsModule,
    NgMultiSelectDropDownModule
  ]
})
export class DealsModule { }
