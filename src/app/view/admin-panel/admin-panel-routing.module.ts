import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataResolver } from 'src/app/resolver/data.resolver';
import { AuthorizationGuard } from 'src/app/guards/authorization.guard';

import { AdminPanelComponent } from './admin-panel.component';

import { EmployeeFormComponent } from 'src/app/shared/components/employee-form/employee-from.component';
import { DepartmentFormComponent } from 'src/app/shared/components/department-form/department-form.component';
import { PositionFormComponent } from 'src/app/shared/components/position-form/position-form.component';
import { EmployeeCardComponent } from 'src/app/shared/components/employee-card/employee-card.component';
import { DepartmentCardComponent } from 'src/app/shared/components/department-card/department-card.component';
import { PositionCardComponent } from 'src/app/shared/components/position-card/position-card.component';

const routes: Routes = [
  {
    path: '', component: AdminPanelComponent, canActivateChild: [AuthorizationGuard], children: [
      { path: 'hire-employee', component: EmployeeFormComponent, canActivate: [AuthorizationGuard], resolve: { allDepartments: DataResolver } },
      { path: 'create-department', component: DepartmentFormComponent, canActivate: [AuthorizationGuard], resolve: { allPositions: DataResolver } },
      { path: 'create-position', component: PositionFormComponent, canActivate: [AuthorizationGuard] },

      { path: 'employees', loadChildren: () => import('../table/table.module').then(m => m.TableModule) },
      { path: 'employees/:id', component: EmployeeCardComponent, resolve: { employee: DataResolver }, canActivate: [AuthorizationGuard] },

      { path: 'departments', loadChildren: () => import('../table/table.module').then(m => m.TableModule) },
      { path: 'departments/:id', component: DepartmentCardComponent, resolve: { department: DataResolver }, canActivate: [AuthorizationGuard] },

      { path: 'positions', loadChildren: () => import('../table/table.module').then(m => m.TableModule) },
      { path: 'positions/:id', component: PositionCardComponent, resolve: { position: DataResolver }, canActivate: [AuthorizationGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
