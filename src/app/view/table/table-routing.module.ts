import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table.component';

import { DataResolver } from 'src/app/resolver/data.resolver';

const routes: Routes = [
  { path: '', component: TableComponent, resolve: { table: DataResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
