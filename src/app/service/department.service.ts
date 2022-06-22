import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Department } from '../interface/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private readonly API = environment.api;

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<Department> {
    return this.http.get<Department>(`${this.API}/departments`);
  }

  getAllDepartmentsPositions(): Observable<Department> {
    return this.http.get<Department>(`${this.API}/departments-positions`);
  }

  count(): Observable<Department> {
    return this.http.get<Department>(`${this.API}/departments/count`);
  }

  create(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.API}/departments`, department);
  }
}
