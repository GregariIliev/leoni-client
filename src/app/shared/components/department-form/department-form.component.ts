import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { DepartmentService } from '../../services/department.service';

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

  constructor(private readonly departmentService: DepartmentService, private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  onSubmit(value: any) {
    this.departmentService.create(value).subscribe({
      next: (v) => {

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
