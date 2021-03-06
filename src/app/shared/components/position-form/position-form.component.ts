import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { Router } from '@angular/router';

import { PositionService } from '../../services/position.service';

import { Position } from 'src/app/interface/Position';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionFormComponent implements OnInit {
  @Input() modify!: boolean;
  @Input() posCard$!: BehaviorSubject<Position>;

  @Output() modifySaved = new EventEmitter<boolean>();

  errorSubject = new BehaviorSubject<any>('');
  errorMessage = this.errorSubject.asObservable();

  form!: any;
  positionId!: string;
  shifts: string[] = ['A', 'B', 'C', 'R'];

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly positionService: PositionService,
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();

    if (this.modify) {
      this.posCard$.subscribe(position => {
        this.positionId = position.id
        this.form.patchValue({
          name: position.name,
          salaryMultiplayer: position.salaryMultiplayer,
        });
      });
    }
  }

  onSubmit(position: Position) {
    position.shift = position.shift.toString();
    if (this.modify) {

      this.positionService.update(position, this.positionId).subscribe({
        next: (data) => {
        },
        error: (err) => {
          let error = err.error.errors[0].message;
          this.errorSubject.next(error);
        },
        complete: () => {
          this.modifySaved.emit();
        }
      })
    } else {
      this.positionService.create(position).subscribe({
        next: (position: Position) => {
          this.router.navigateByUrl(`/admin-panel/positions/${position.id}`);
        },
        error: (e) => {
          let error = e.error.errors[0].message;
          this.errorSubject.next(error);
        },
        complete: () => {
        }
      })
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      salaryMultiplayer: ['', [Validators.required, Validators.min(1), Validators.max(2)]],
      shift: ['', [Validators.required]],
    })
  }
}
