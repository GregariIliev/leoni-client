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

  err$ = new BehaviorSubject<string>('');

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly positionService: PositionService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.getPosition();
  }

  getPosition() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.positionId = id;
    })

    this.positionService.getById(this.positionId).subscribe({
      next: (pos) => {
        this.position$.next(pos);
      },
      error: (err) => {
        this.err$.next(err.statusText);
      }
    })
  }

  onModify() {
    this.modify = !this.modify;
  }
}
