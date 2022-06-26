import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';

import { Employee } from 'src/app/interface/Employee';

@Component({
  selector: 'app-employee-from',
  templateUrl: './employee-from.component.html',
  styleUrls: ['./employee-from.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit {
  public departments!: any;
  public positions!: any;
  public shifts!: any;

  err!: any;
  form!: FormGroup;


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
    this.positions = this.departments.find((d: any) => d.id === this.departmentId?.value).Positions;

    this.shifts = this.positions[0].shift.split(', ');
    // this.form.patchValue({ positions: this.positions });
  }


  onChangePosition(event: any) {
    const sifts = this.positions.find((p: any) => p.id === this.positionId?.value).shift.split(', ');

    this.shifts = sifts;
    // this.form.patchValue({ shfts: this.shifts });
  }

  onSubmit() {
    try {
      const employee: Employee = this.form.value;

      this.employeeService.createEmplyee(employee).subscribe({
        next: (employee: Employee) => {
          if (employee) {
            ///navigate to employee
          }
        },
        error: (error) => {
          console.log(error);

        }
      })

    } catch (err) {
      console.log(err);
      this.err = err;
    }
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