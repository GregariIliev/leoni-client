import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    return this.http.post<any>(`${this.API}/employees/login`, admin, { withCredentials: true })
  }

  createEmplyee(employee: any) {
    return this.http.post<any>(`${this.API}/employees/register`, employee);
  }

  getAll() {
    return this.http.get<any>(`${this.API}/employees`);
  }

  count() {
    return this.http.get<any>(`${this.API}/employees/count`)
  }

  getById(id: number) {
    return this.http.get<any>(`${this.API}/employees/${id}`);
  }
}