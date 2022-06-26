import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
