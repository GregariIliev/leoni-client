import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PositionService } from '../../services/position.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-position-card',
  templateUrl: './position-card.component.html',
  styleUrls: ['./position-card.component.scss']
})
export class PositionCardComponent implements OnInit {
  modify: boolean = false;

  position$ = new BehaviorSubject<any>({});
  positionId!: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly positionService: PositionService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

}
