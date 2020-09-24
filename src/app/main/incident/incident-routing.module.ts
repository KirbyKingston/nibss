import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncidentDetailComponent } from './incident-detail/incident-detail.component';


const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'incident', component: IncidentDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentRoutingModule { }
