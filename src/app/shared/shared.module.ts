import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        SideNavbarComponent,
        AdminNavbarComponent
    ],
    exports: [CommonModule, FormsModule, SideNavbarComponent, AdminNavbarComponent]
})
export class SharedModule { }