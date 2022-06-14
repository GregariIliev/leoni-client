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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(registerForm: NgForm): void {
    const userRegister = registerForm.value;
  }

}
