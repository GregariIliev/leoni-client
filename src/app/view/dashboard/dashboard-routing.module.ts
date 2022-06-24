import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataResolver } from 'src/app/resolver/data.resolver';
import { DashboardComponent } from './dashboard.component';
import { AuthorizationGuard } from 'src/app/guards/authorization.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthorizationGuard], resolve: { stats: DataResolver } },
  { path: 'admin-panel', loadChildren: () => import('../admin-panel/admin-panel.module').then(m => m.AdminPanelModule) },
  { path: 'table', loadChildren: () => import('../table/table.module').then(m => m.TableModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
