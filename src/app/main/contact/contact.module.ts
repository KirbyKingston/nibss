import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactdetailsComponent } from './contactdetails/contactdetails.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent, ContactdetailsComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ContactModule { }
