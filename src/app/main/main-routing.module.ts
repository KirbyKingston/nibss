import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailsComponent } from './emails/emails.component';
import { MainComponent } from './main.component';


const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'leads', loadChildren: () => import('./leads/leads.module').then(m => m.LeadsModule) },
      { path: 'contacts', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
      { path: 'deals', loadChildren: () => import('./deals/deals.module').then(m => m.DealsModule) },
      { path: 'accounts', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
      { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
      { path: 'incidents', loadChildren: () => import('./incident/incident.module').then(m => m.IncidentModule) },
      { path: 'email/:id', component: EmailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
