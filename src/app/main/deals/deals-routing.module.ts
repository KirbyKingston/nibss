import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DealsDetailsComponent } from './deals-details/deals-details.component';


const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'deal/:id', component: DealsDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealsRoutingModule { }
