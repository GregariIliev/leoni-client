import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

import { DepartmentInterface } from '../../../interfaces/DepartmentInterface';
import { PositionInterface } from 'src/app/interfaces/PositionInterface';

import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(registerForm: NgForm): void {
    const userRegister = registerForm.value;
  }

}
