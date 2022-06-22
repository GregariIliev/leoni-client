import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationGuard } from './guards/authorization.guard';

import { DataResolver } from './interfaces/resolver/data.resolver';
import { AuthentiacationResolver } from './interfaces/resolver/authentiacation.resolver';

import { LoginComponent } from './components/authentication/login/login.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminPanelComponent } from './components/dashboard/admin-panel/admin-panel.component';
import { StatisticsComponent } from './components/dashboard/statistics/statistics.component';
import { EmployeesTableComponent } from './components/dashboard/table/employees/employees.table.component';
import { DepartmentsTableComponent } from './components/dashboard/table/departments/departments-table.component';
import { PositionsTableComponent } from './components/dashboard/table/positions/positions-table.component';
import { EmployeeFormComponent } from './components/create/employee-form/employee-from.component';
import { DepartmentFormComponent } from './components/create/department-form/department-form.component';
import { PositionFormComponent } from './components/create/position-form/position-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent, canActivateChild: [AuthorizationGuard],
    title: 'Dashboard',
    children: [{ path: '', component: StatisticsComponent, resolve: { stats: DataResolver } },
    {
      path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthorizationGuard],
      canActivateChild: [AuthorizationGuard], title: 'Admin Panel',
      children: [
        { path: 'hire-employee', component: RegisterComponent, resolve: { departments: DataResolver }, title: 'Hire Employee' },
        { path: 'create-department', component: DepartmentFormComponent, title: 'Create Department' },
        { path: 'create-position', component: PositionFormComponent, title: 'Create Position' }
      ]
    },
    {
      path: 'employees', component: EmployeesTableComponent, resolve: { employees: DataResolver }, title: 'Employees',
      canActivate: [AuthorizationGuard],
    },
    {
      path: 'departments', component: DepartmentsTableComponent, resolve: { departments: DataResolver }, title: 'Departments',
      canActivate: [AuthorizationGuard],
    },
    {
      path: 'positions', component: PositionsTableComponent, resolve: { positions: DataResolver }, title: 'Positions',
      canActivate: [AuthorizationGuard],
    }
    ]
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full', title: 'Login' },
  { path: '**', redirectTo: 'login' }
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