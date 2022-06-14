import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthorizationGuard } from './guards/authorization.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full', title: 'Dashboard', canActivate: [AuthorizationGuard] },
  { path: 'register', component: RegisterComponent, title: 'Register'},
  { path: 'login', component: LoginComponent, title: 'Login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
