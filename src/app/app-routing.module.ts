import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';

import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthorizationGuard } from './guards/authorization.guard';
import { TableComponent } from './components/dashboard/table/table.component';
import { AdminPanelComponent } from './components/dashboard/admin-panel/admin-panel.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthorizationGuard],
    canActivateChild: [AuthorizationGuard],
    children: [
      { path: 'admin-panel', component: AdminPanelComponent },
      { path: 'employees', component: TableComponent },
      { path: 'departments', component: TableComponent },
      { path: 'positions', component: TableComponent }
    ]
  },
  { path: 'register', component: RegisterComponent, pathMatch: 'full', title: 'Register', canActivate: [AuthorizationGuard] },
  { path: 'login', component: LoginComponent, pathMatch: 'full', title: 'Login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
