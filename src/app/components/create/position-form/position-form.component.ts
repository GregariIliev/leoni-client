import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PositionService } from 'src/app/service/position.service';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss']
})
export class PositionFormComponent implements OnInit {
  errorSubject = new BehaviorSubject<any>('');
  errorMessage = this.errorSubject.asObservable();

  form!: any;
  shifts = ['A', 'B', 'C', 'R'];

  constructor(private readonly positionService: PositionService) { }

  ngOnInit(): void {
  }

  onSubmit(position: any) {

    this.positionService.create(position).subscribe({
      next: (v) => {

      },
      error: (e) => {
        let error = e.error.errors[0].message;

        error = error.charAt(0).toUpperCase() + error.slice(1);

        this.errorSubject.next(error);
      },
      complete: () => {

      }
    })
  }
}
