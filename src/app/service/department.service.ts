import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private readonly API = environment.api;

  constructor(private readonly http: HttpClient) { }

  getAllDepartments(): Observable<any> {
    return this.http.get<any>(`${this.API}/departments`);
  }
}
