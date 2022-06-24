import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        SideNavbarComponent
    ],
    exports: [CommonModule, FormsModule, SideNavbarComponent]
})
export class SharedModule { }