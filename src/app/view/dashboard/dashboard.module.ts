import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StatisticsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
