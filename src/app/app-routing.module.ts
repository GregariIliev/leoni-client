import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './core/authentication/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'dashboard', loadChildren: () => import('./view/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'admin-panel', loadChildren: () => import('./view/admin-panel/admin-panel.module').then(m => m.AdminPanelModule) },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }