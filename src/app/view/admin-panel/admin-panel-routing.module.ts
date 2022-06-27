import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataResolver } from 'src/app/resolver/data.resolver';
import { AuthorizationGuard } from 'src/app/guards/authorization.guard';

import { AdminPanelComponent } from './admin-panel.component';

import { EmployeeFormComponent } from 'src/app/shared/components/employee-form/employee-from.component';
import { DepartmentFormComponent } from 'src/app/shared/components/department-form/department-form.component';
import { PositionFormComponent } from 'src/app/shared/components/position-form/position-form.component';
import { EmployeeCardComponent } from 'src/app/shared/components/employee-card/employee-card.component';

const routes: Routes = [
  { path: '', component: AdminPanelComponent , children: [
    { path: 'hire-employee', component: EmployeeFormComponent, canActivate: [AuthorizationGuard], resolve: { allDepartments: DataResolver } },
    { path: 'create-department', component: DepartmentFormComponent, canActivate: [AuthorizationGuard], resolve: { allPositions: DataResolver } },
    { path: 'create-position', component: PositionFormComponent, canActivate: [AuthorizationGuard] },

    { path: 'employees', loadChildren: () => import('../table/table.module').then(m => m.TableModule) },
    { path: 'employees/:id', component: EmployeeCardComponent, pathMatch: 'full' },
    
    { path: 'departments', loadChildren: () => import('../table/table.module').then(m => m.TableModule) },
    { path: 'positions', loadChildren: () => import('../table/table.module').then(m => m.TableModule) },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
