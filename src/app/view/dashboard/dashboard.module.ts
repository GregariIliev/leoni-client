import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    StatisticsComponent,
    SideNavbarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
