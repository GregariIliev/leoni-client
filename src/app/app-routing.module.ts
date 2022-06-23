import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationGuard } from './guards/authorization.guard';

import { AuthentiacationResolver } from './resolver/authentiacation.resolver';
import { UpdateResolver } from './resolver/update.resolver';
import { DataResolver } from './resolver/data.resolver';

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
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { DepartmentCardComponent } from './components/department-card/department-card.component';
import { PositionCardComponent } from './components/position-card/position-card.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent, resolve: { valid: AuthentiacationResolver }, canActivateChild: [AuthorizationGuard],
    title: 'Dashboard',
    children: [
      { path: '', component: StatisticsComponent, resolve: { stats: DataResolver } },
      {
        path: 'admin-panel', component: AdminPanelComponent, resolve: { valid: AuthentiacationResolver }, canActivate: [AuthorizationGuard],
        canActivateChild: [AuthorizationGuard], title: 'Admin Panel',
        children: [
          { path: 'hire-employee', component: EmployeeFormComponent, resolve: { valid: AuthentiacationResolver, allDepartments: DataResolver }, title: 'Hire Employee' },
          { path: 'create-department', component: DepartmentFormComponent, resolve: { valid: AuthentiacationResolver }, title: 'Create Department' },
          { path: 'create-position', component: PositionFormComponent, resolve: { valid: AuthentiacationResolver }, title: 'Create Position' }
        ]
      },
      {
        path: 'employees', component: EmployeesTableComponent, resolve: { valid: AuthentiacationResolver, employees: DataResolver }, title: 'Employees',
        canActivate: [AuthorizationGuard],
      },
      {
        path: 'departments', component: DepartmentsTableComponent, resolve: { valid: AuthentiacationResolver, departments: DataResolver }, title: 'Departments',
        canActivate: [AuthorizationGuard],
      },
      {
        path: 'positions', component: PositionsTableComponent, resolve: { valid: AuthentiacationResolver, positions: DataResolver }, title: 'Positions',
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