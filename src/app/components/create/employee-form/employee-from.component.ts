import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { EmployeeService } from 'src/app/service/employee.service';

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

    this.route.data.subscribe(({ departments }) => {
      this.departments = departments
    })
  }

  onChangeDepartment(event: any) {
    const selectedId = Number(event.target.value);

    this.positions = this.departments.find((d: any) => d.id === selectedId).Positions;

    this.shifts = this.positions[0].shift.split(', ');
    // this.form.patchValue({ positions: this.positions });
  }


  onChangePosition(event: any) {
    const selectedId = Number(event.target.value);

    const sifts = this.positions.find((p: any) => p.id === selectedId).shift.split(', ');

    this.shifts = sifts;
    // this.form.patchValue({ shfts: this.shifts });
  }

  onSubmit() {
    try {
      const employee = this.form.value;

      this.employeeService.createEmplyee(employee).subscribe();

    } catch (err) {
      console.log(err);
      this.err = err;
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      shift: ['', [Validators.required]],
      department_id: ['', [Validators.required]],
      position_id: ['', [Validators.required]],
    })
  }

}
