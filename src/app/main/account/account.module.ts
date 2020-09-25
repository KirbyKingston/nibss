import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountDetailsComponent } from './account-details/account-details.component';


@NgModule({
  declarations: [DashboardComponent, AccountDetailsComponent],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
