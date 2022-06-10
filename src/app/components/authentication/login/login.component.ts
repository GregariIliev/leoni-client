import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private readonly authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onLogin(loginForm: NgForm) {
    try {
      const admin = loginForm.value;

      if (!admin.email.trim() || !admin.password.trim()) {
        // make more validations to avoid send invalid request
  }
}
