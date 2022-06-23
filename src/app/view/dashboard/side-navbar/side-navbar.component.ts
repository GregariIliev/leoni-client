import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavbarComponent implements OnInit {


  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  onLogout() {
    localStorage.removeItem('leoni');
    
    this.router.navigateByUrl('login');
  }
}
