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
  @Input() modify!: boolean;
  @Input() depCard$!: BehaviorSubject<Department>;

  @Output() modifySaved = new EventEmitter<boolean>();

  errorSubject = new BehaviorSubject<string>('');
  errorMessage = this.errorSubject.asObservable();

  form!: any;
  positions!: Position[];
  departmentId!: string;

  constructor(
    private readonly router: Router,
    private readonly departmentService: DepartmentService,
    private readonly positionService: PositionService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();

    if (this.modify) {
      this.depCard$.subscribe(department => {
        this.departmentId = department.id;

        this.form.patchValue({
          name: department.name,
          maxEmployees: department.maxEmployees,
          salaryMultiplayer: department.salaryMultiplayer
        })
      })
    }

    this.positionService.getAll().subscribe(positions => {
      this.positions = positions
    })
  }

  onSubmit() {
    const department: Department = this.form.value;

    if (this.modify) {
      this.departmentService.update(department, this.departmentId).subscribe({
        next: (id: Department) => {
        },
        error: (e) => {
          let error = e.error.errors[0].message;
          this.errorSubject.next(error);
        },
        complete: () => {
          this.modifySaved.emit()
        }
      })

    } else {
      this.departmentService.create(department).subscribe({
        next: (department: Department) => {
          this.router.navigateByUrl(`/admin-panel/departments/${department.id}`);
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
      name: ['', [Validators.required]],
      maxEmployees: ['', [Validators.required, Validators.min(5), Validators.max(20)]],
      salaryMultiplayer: ['', [Validators.required, Validators.min(1), Validators.max(2)]],
      positions: [[''], Validators.required]
    })
  }
}
