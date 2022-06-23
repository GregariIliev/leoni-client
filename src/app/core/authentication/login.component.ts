import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

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

  isLogged: boolean = false;

  constructor(private readonly authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.isLogged);

  }

  async onLogin(loginForm: NgForm) {
    const admin = loginForm.value;

    this.authService.login().subscribe((v) => {
      this.isLogged = v;
    })
  }
}