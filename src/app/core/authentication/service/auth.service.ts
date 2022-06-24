import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';

import { Employee } from 'src/app/interface/Employee';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = environment.api;

  constructor(private readonly http: HttpClient) { }

  login(admin: any) {
    return this.http.post<Employee>(`${this.API}/employees/login`, admin, { withCredentials: true });
  }

  isAuth(){
    return this.http.get<boolean>(`${this.API}/authenticate`);
  }
}
