import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { Router } from '@angular/router';

import { DepartmentService } from '../../services/department.service';
import { PositionService } from '../../services/position.service';

import { Department } from 'src/app/interface/Department';
import { Position } from 'src/app/interface/Position';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentFormComponent implements OnInit {
  errorSubject = new BehaviorSubject<string>('');
  errorMessage = this.errorSubject.asObservable();

  form!: any;
  positions!: Position[];

  constructor(
    private readonly router: Router,
    private readonly departmentService: DepartmentService,
    private readonly positionService: PositionService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();
    this.activatedRoute.data.subscribe({
      next: ({allPositions}: any) => {
        this.positions = allPositions
      }
    })
  }

  onSubmit(value: any) {
    this.departmentService.create(value).subscribe({
      next: (department: Department) => {

      },
      error: (e) => {
        let error = e.error?.errors[0]?.message;
        this.errorSubject.next(error);
      },
      complete: () => {
        //redirect
      }
    });
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      maxEmployees: ['', [Validators.required, Validators.min(5), Validators.max(20)]],
      salaryMultiplayer: ['', [Validators.required, Validators.min(1), Validators.max(2)]],
      positions: [[''], Validators.required]
    })
  }
}
