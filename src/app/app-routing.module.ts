import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/core/guards/authguard/auth.guard';


const routes: Routes = [
  {path: '', loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)},
  {path: 'app', loadChildren: () => import('./main/main.module').then(m=>m.MainModule), canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
