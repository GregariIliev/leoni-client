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
    path: '', component: AdminPanelComponent, canActivateChild: [AuthorizationGuard], title: 'Admin Panel', children: [
      { path: 'hire-employee', component: EmployeeFormComponent, canActivate: [AuthorizationGuard], title: 'Hire Employee' },
      { path: 'create-department', component: DepartmentFormComponent, canActivate: [AuthorizationGuard], title: 'Create Department' },
      { path: 'create-position', component: PositionFormComponent, canActivate: [AuthorizationGuard], title: 'Create Position' },

      { path: 'employees', loadChildren: () => import('../table/table.module').then(m => m.TableModule) },
      { path: 'employees/:id', component: EmployeeCardComponent, canActivate: [AuthorizationGuard], title: 'Employee' },

      { path: 'departments', loadChildren: () => import('../table/table.module').then(m => m.TableModule) },
      { path: 'departments/:id', component: DepartmentCardComponent, canActivate: [AuthorizationGuard], title: 'Department' },

      { path: 'positions', loadChildren: () => import('../table/table.module').then(m => m.TableModule) },
      { path: 'positions/:id', component: PositionCardComponent, canActivate: [AuthorizationGuard], title: 'Position' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
