import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaddetailsComponent } from './leaddetails/leaddetails.component';


const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'lead', component: LeaddetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule { }
