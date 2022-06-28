import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Employee } from 'src/app/interface/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly API = environment.api;

  private logged = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) { }

  get isLogged(): Observable<boolean> {
    return this.logged;
  }

  login(admin: any): Observable<any> {
    return this.http.post<any>(`${this.API}/employees/login`, admin, { withCredentials: true });
  }

  createEmplyee(employee: any) {
    return this.http.post<any>(`${this.API}/employees/register`, employee);
  }

  getById(employeeId: number) {
    return this.http.get<Employee>(`${this.API}/employees/${employeeId}`);
  }

  update(employee: Employee, employeeId: number) {
    return this.http.put<Employee>(`${this.API}/employees/${employeeId}`, employee);
  }

  delete(employeeId: number) {
    return this.http.delete<Employee>(`${this.API}/employees/${employeeId}`);
  }

  getAll() {
    return this.http.get<Employee[]>(`${this.API}/employees`);
  }

  count() {
    return this.http.get<number>(`${this.API}/employees/count`);
  }

}