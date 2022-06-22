import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private readonly API = environment.api;

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.API}/departments`);
  }

  getAllDepartmentsPositions() {
    return this.http.get<any>(`${this.API}/departments-positions`);
  }

  count() {
    return this.http.get<any>(`${this.API}/departments/count`);
  }

  create(department: any): Observable<any> {
    return this.http.post<any>(`${this.API}/departments`, department);
  }
}
