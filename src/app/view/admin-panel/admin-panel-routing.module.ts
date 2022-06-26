import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataResolver } from 'src/app/resolver/data.resolver';
import { AuthorizationGuard } from 'src/app/guards/authorization.guard';

import { AdminPanelComponent } from './admin-panel.component';

import { EmployeeFormComponent } from 'src/app/shared/components/employee-form/employee-from.component';
import { DepartmentFormComponent } from 'src/app/shared/components/department-form/department-form.component';
import { PositionFormComponent } from 'src/app/shared/components/position-form/position-form.component';

const routes: Routes = [
  { path: '', component: AdminPanelComponent },
  { path: 'hire-employee', component: EmployeeFormComponent, canActivate: [AuthorizationGuard], resolve: { allDepartments: DataResolver } },
  { path: 'create-department', component: DepartmentFormComponent, canActivate: [AuthorizationGuard], resolve: { allPositions: DataResolver } },
  { path: 'employee-table', loadChildren: () => import('../table/table.module').then(m => m.TableModule) },
  { path: 'department-table', loadChildren: () => import('../table/table.module').then(m => m.TableModule) },
  { path: 'position-table', loadChildren: () => import('../table/table.module').then(m => m.TableModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
