import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavbarComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }
}
