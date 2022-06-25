import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPanelComponent } from './admin-panel.component';

const routes: Routes = [
  { path: '', component: AdminPanelComponent },
  { path: 'employee-table', loadChildren: () => import('../table/table.module').then(m => m.TableModule) },
  { path: 'department-table', loadChildren: () => import('../table/table.module').then(m => m.TableModule) },
  { path: 'position-table', loadChildren: () => import('../table/table.module').then(m => m.TableModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
