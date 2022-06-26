import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

import { PositionService } from '../../services/position.service';

import { Position } from 'src/app/interface/Position';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionFormComponent implements OnInit {
  errorSubject = new BehaviorSubject<any>('');
  errorMessage = this.errorSubject.asObservable();

  form!: any;
  shifts: string[] = ['A', 'B', 'C', 'R'];

  constructor(private readonly positionService: PositionService, private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.initForm();
    this.shifts = this.form.get('shift').value
  }

  onSubmit(position: any) {
    this.positionService.create(position).subscribe({
      next: (v) => {
        //vanigate to position or table
      },
      error: (e) => {
        let error = e.error.errors[0].message;
        this.errorSubject.next(error);
      },
      complete: () => { }
    })
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      salaryMultiplayer: ['', [Validators.required, Validators.min(1), Validators.max(2)]],
      shift: [['A', 'B', 'C', 'R'], [Validators.required]],
    })
  }


}
