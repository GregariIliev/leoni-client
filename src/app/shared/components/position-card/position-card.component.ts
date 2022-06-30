import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PositionService } from '../../services/position.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-position-card',
  templateUrl: './position-card.component.html',
  styleUrls: ['./position-card.component.scss']
})
export class PositionCardComponent implements OnInit, OnDestroy {
  modify: boolean = false;

  position$ = new BehaviorSubject<any>({});
  positionId!: string;
  printCard!: string;

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
        this.printCard = JSON.stringify(pos, null, 4);
      },
      error: (err) => {
        this.err$.next(err);
      },
      complete: () => { }
    })
  }

  onModify() {
    this.getPosition();
    this.modify = !this.modify;
  }

  onDelete() {
    this.positionService.delete(this.positionId).subscribe(data => {
      this.router.navigateByUrl('/admin-panel/positions')
    })
  }

  onPrint() {
    console.log(this.printCard);
  }

  ngOnDestroy(): void {
    this.position$.unsubscribe();
    this.err$.unsubscribe();
  }
}
