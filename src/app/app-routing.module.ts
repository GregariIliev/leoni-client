import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AuthorizationGuard } from './guards/authorization.guard';
import { TableComponent } from './components/dashboard/table/table.component';
import { EmployeesTableComponent } from './components/dashboard/table/employees/employees.table.component';
import { DepartmentsTableComponent } from './components/dashboard/table/departments/departments-table.component';
import { PositionsTableComponent } from './components/dashboard/table/positions/positions-table.component';
import { AdminPanelComponent } from './components/dashboard/admin-panel/admin-panel.component';
import { StatisticsComponent } from './components/dashboard/statistics/statistics.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthorizationGuard],
    canActivateChild: [AuthorizationGuard],
    children: [
      { path: '', component: StatisticsComponent },
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

//function matcherFunction(url: UrlSegment[]) {
//  console.log(url);
//  if (url.length === 1 && url[0].path.endsWith('html')) {
//    const path = url[0].path;
//    if (path.startsWith('employees') || path.startsWith('dashboard/departments') || path.startsWith('dashboard/positions')) {
//      return { consumed: url }
//    }
//  }
//  return null;
//}
//