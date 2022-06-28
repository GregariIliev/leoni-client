import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { Router } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';

import { Employee } from 'src/app/interface/Employee';
import { Department } from 'src/app/interface/Department';
import { Position } from 'src/app/interface/Position';

@Component({
  selector: 'app-employee-from',
  templateUrl: './employee-from.component.html',
  styleUrls: ['./employee-from.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit {
  @Input() modify!: boolean;
  @Input() empCard$!: BehaviorSubject<Employee>;
  
  @Output() modifySaved = new EventEmitter<boolean>();
  
  errorSubject = new BehaviorSubject<any>('');
  errorMessage = this.errorSubject.asObservable();
  
  public departments!: any;
  public positions!: any;
  public shifts!: any;
  
  form!: FormGroup;
  employeeId!: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly employeeService: EmployeeService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();

    this.route.data.subscribe(({ allDepartments }) => {
      this.departments = allDepartments
    })
  }

  onChangeDepartment(event: any) {
    this.positions = this.departments.find((d: Department) => d.id === event.value).Positions;

    this.shifts = [];
  }


  onChangePosition(event: any) {
    this.shifts = this.positions.find((p: any) => p.id === event.value).shift.split(', ');
  }

  onSubmit() {
      const employee: Employee = this.form.value;

      this.employeeService.createEmplyee(employee).subscribe({
        next: (employee: Employee) => {
          
        },
        error: (e) => {
          let error = e.error.errors[0].message;
          this.errorSubject.next(error);
        },
        complete: () => {

        }
      })
  }

  initForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.min(4)]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      shift: ['', [Validators.required]],
      department_id: ['', [Validators.required]],
      position_id: ['', [Validators.required]],
    })
  }

  get departmentId() { return this.form.get('department_id') }
  get positionId() { return this.form.get('position_id') }
}
