import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  constructor(private readonly employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
  }

  async onLogin(loginForm: NgForm) {
    try {
      const admin = loginForm.value;

      if (!admin.email.trim() || !admin.password.trim()) {
        // make more validations to avoid send invalid request
        throw new Error('Invalid email or password')
      }


      this.employeeService.login(admin).subscribe(async (response: any) => {
        response ? this.router.navigate(['']) : this.router.navigate(['/login']);
      })

    } catch (err) {
      console.log(err);
      
      //// create error component
    }
  }
}
