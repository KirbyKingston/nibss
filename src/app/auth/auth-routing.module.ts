import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdloginComponent } from './adlogin/adlogin.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: '', component: AdloginComponent},
  {path: 'login', component: AdloginComponent},
  {path: 'normlogin', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
