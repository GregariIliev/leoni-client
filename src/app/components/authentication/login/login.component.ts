import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  errorSubject = new BehaviorSubject<string>('');
  errorMessage$ = this.errorSubject.asObservable();

  constructor(private readonly employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void { }

  async onLogin(loginForm: NgForm) {
    const admin = loginForm.value;

    this.employeeService.login(admin).subscribe({
      next: (v) => {

      },
      error: (e) => {
        this.errorSubject.next(e.statusText);

      },
      complete: () => {
        this.router.navigateByUrl('/');
        localStorage.setItem('leoni', admin.email);
      }
    })
  }
}