import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  public departments!: any;
  public positions!: any;
  public shifts!: any;

  form!: FormGroup;


  constructor(
    private readonly departmentService: DepartmentService,
    private readonly employeeService: EmployeeService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.form = this.initForm();

    try {
      this.departmentService.getAllDepartments().subscribe((response: any) => {
        this.departments = response;
        this.form.patchValue(this.departments);
      });

    } catch (err) {
      console.log(err);
    }
  }

  onChangeDepartment(event: any) {
    const selectedId = Number(event.target.value);
    const selectedDepartmentIndex = this.departments.findIndex((d: any) => d.id === selectedId);

    this.positions = this.departments[selectedDepartmentIndex].Positions;
    //this.form.patchValue(this.positions);  ///pathValue not updated the options

    this.shifts = this.positions[0].shift.split(', ');
  }


  onChangePosition(event: any) {
    const selectedId = Number(event.target.value);
    const selectedPositionIndex = this.positions.findIndex((p: any) => p.id === selectedId);

    // this.form.patchValue(this.positions[selectedPositionIndex].shift.split(', ')); ///pathValue not updated the options
    this.shifts = this.positions[selectedPositionIndex].shift.split(', ');
  }

  onSubmit() {
    try {
      const employee = this.form.value;
      this.employeeService.createEmplyee(employee).subscribe((response) => {
        console.log(response);

      })

    } catch (err) {
      console.log(err);
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      department: ['', [Validators.required]],
      position: ['', [Validators.required]],
      shift: ['', [Validators.required]],
    })
  }

}
