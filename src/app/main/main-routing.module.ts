import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';


const routes: Routes = [
  {path: '', component: MainComponent, children: [
    {path: 'leads', loadChildren: () => import('./leads/leads.module').then(m=>m.LeadsModule)},
    {path: 'contacts', loadChildren: () => import('./contact/contact.module').then(m=>m.ContactModule)},
    {path: 'deals', loadChildren: () => import('./deals/deals.module').then(m=>m.DealsModule)},
    {path: 'accounts', loadChildren: () => import('./account/account.module').then(m=>m.AccountModule)},
    {path: 'products', loadChildren: () => import('./products/products.module').then(m=>m.ProductsModule)},
    {path: 'incidents', loadChildren: () => import('./incident/incident.module').then(m=>m.IncidentModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
