import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  errorSubject = new BehaviorSubject<string>('');
  errorMessage$ = this.errorSubject.asObservable();

  constructor(private readonly authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  async onLogin(loginForm: NgForm) {
    const admin = loginForm.value;

    this.authService.login(admin).subscribe({
      next: ({ email }) => {
        localStorage.setItem('leoni', email);
      },
      error: (err) => {
        localStorage.removeItem('leoni');
        this.errorSubject.next(err.error);

      },
      complete: () => {
        this.router.navigateByUrl('/dashboard');
      }
    })
  }
}