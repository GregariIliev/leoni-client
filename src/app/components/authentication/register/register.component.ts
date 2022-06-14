import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

import { DepartmentInterface } from '../../../interfaces/DepartmentInterface';
import { PositionInterface } from 'src/app/interfaces/PositionInterface';

import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public departments!: any;
  public positions!: any;
  public shifts!: any;

  form!: FormGroup;


  constructor(
    private readonly departmentService: DepartmentService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.form = this.initForm();

  }

  onSubmit(registerForm: NgForm): void {
    const userRegister = registerForm.value;

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
