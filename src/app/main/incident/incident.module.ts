import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentRoutingModule } from './incident-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncidentDetailComponent } from './incident-detail/incident-detail.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [DashboardComponent, IncidentDetailComponent],
  imports: [
    CommonModule,
    IncidentRoutingModule,
    FormsModule,
    SharedModule, 
    HttpClientModule
  ]
})
export class IncidentModule { }
