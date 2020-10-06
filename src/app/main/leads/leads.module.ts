import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadsRoutingModule } from './leads-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaddetailsComponent } from './leaddetails/leaddetails.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent, LeaddetailsComponent],
  imports: [
    CommonModule,
    LeadsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class LeadsModule { }
