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

    const position = this.activatedRoute.snapshot.data['position'];
    this.position$.next(position);
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
    this.position$.subscribe(pos => {
      console.log(JSON.stringify(pos, null, 4));
    })
  }

  ngOnDestroy(): void {
    this.position$.unsubscribe();
    this.err$.unsubscribe();
  }
}
