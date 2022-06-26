import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatInputModule,
        MatSelectModule
    ],
    declarations: [
        SideNavbarComponent,
        AdminNavbarComponent
    ],
    exports: [CommonModule, FormsModule, SideNavbarComponent, AdminNavbarComponent]
})
export class SharedModule { }