import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-position-card',
  templateUrl: './position-card.component.html',
  styleUrls: ['./position-card.component.scss']
})
export class PositionCardComponent implements OnInit {
  modify: boolean = false;

  positions$ = new BehaviorSubject<any>({});
  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
