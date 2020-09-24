import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentRoutingModule } from './incident-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncidentDetailComponent } from './incident-detail/incident-detail.component';


@NgModule({
  declarations: [DashboardComponent, IncidentDetailComponent],
  imports: [
    CommonModule,
    IncidentRoutingModule
  ]
})
export class IncidentModule { }
