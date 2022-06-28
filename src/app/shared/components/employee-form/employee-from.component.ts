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
    private readonly router: Router,
    private readonly employeeService: EmployeeService,
    private readonly departmentService: DepartmentService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();

    if (this.modify) {
      this.empCard$.subscribe(employee => {
        this.employeeId = employee.id;
        
        this.form.patchValue({
          firstName: employee.firstName,
          middleName: employee.middleName,
          lastName: employee.lastName,
          address: employee.address,
          phone: employee.phone
        })
      })
    }

    this.departmentService.getAll().subscribe((dep: Department[]) => {
      this.departments = dep
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

    if (this.modify) {

      this.employeeService.update(employee, this.employeeId).subscribe({
        next: (employee: Employee) => {
          this.empCard$.next(employee);
          this.modifySaved.emit()
        },
        error: (e) => {
          let error = e.error.errors[0].message;
          this.errorSubject.next(error);
        },
        complete: () => {
        }
      })

    } else {
      this.employeeService.createEmplyee(employee).subscribe({
        next: (employee: Employee) => {
          this.router.navigateByUrl(`/admin-panel/employees/${employee.id}`);
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
      firstName: ['', [Validators.required,]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      department_id: ['', [Validators.required]],
      position_id: ['', [Validators.required]],
      shift: ['', [Validators.required]],
    })
  }

}