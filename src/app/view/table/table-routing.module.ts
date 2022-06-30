import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table.component';

import { DataResolver } from 'src/app/resolver/data.resolver';

import { AuthorizationGuard } from 'src/app/guards/authorization.guard';

const routes: Routes = [
  { path: '', component: TableComponent, canActivate: [AuthorizationGuard], resolve: { table: DataResolver }, title: 'Table' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
