import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactdetailsComponent } from './contactdetails/contactdetails.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path: "", component: DashboardComponent},
  {path: "contact", component: ContactdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
