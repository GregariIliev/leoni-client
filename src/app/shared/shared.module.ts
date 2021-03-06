import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { EmployeeFormComponent } from './components/employee-form/employee-from.component';
import { DepartmentFormComponent } from './components/department-form/department-form.component';
import { PositionFormComponent } from './components/position-form/position-form.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { DepartmentCardComponent } from './components/department-card/department-card.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PositionCardComponent } from './components/position-card/position-card.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatSelectModule
    ],
    declarations: [
        SideNavbarComponent,
        AdminNavbarComponent,
        EmployeeFormComponent,
        DepartmentFormComponent,
        PositionFormComponent,
        EmployeeCardComponent,
        DepartmentCardComponent,
        PositionCardComponent
    ],
    exports: [
        CommonModule,
        SideNavbarComponent,
        AdminNavbarComponent,
        EmployeeFormComponent,
        DepartmentFormComponent,
        PositionFormComponent,
        EmployeeCardComponent,
        DepartmentCardComponent,
        PositionCardComponent
    ],
})
export class SharedModule { }