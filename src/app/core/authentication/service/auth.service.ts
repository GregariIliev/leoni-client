import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';

import { Employee } from 'src/app/interface/Employee';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged = new BehaviorSubject<boolean>(false);
  private readonly API = environment.api;

  constructor(private readonly http: HttpClient) { }

  login(admin: any) {
    this.http.post<Employee>(`${this.API}/employees/login`, admin, { withCredentials: true })
      .subscribe(v => {
        console.log(v);

        if (v) {
          this.logged.next(true);
        } else {
          this.logged.next(false);
        }
      })
  }

  get() {
    return this.logged
  }

  checkAuthorization() {
    return this.http.get<any>(`${this.API}/authenticate`)
  }
}
