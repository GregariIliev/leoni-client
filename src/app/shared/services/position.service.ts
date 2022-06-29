import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Position } from 'src/app/interface/Position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private readonly API = environment.api;

  constructor(private readonly http: HttpClient) { }

  // getAllPositionsInDepartment(department: any): Observable<any> {
  //   return this.http.get<any>(`${this.API}/positions?name=${department}`);
  // }
  getById(id: string) {
    return this.http.get<Position>(`${this.API}/positions/${id}`);
  }

  getAll() {
    return this.http.get<Position[]>(`${this.API}/positions`);
  }

  count() {
    return this.http.get<Position>(`${this.API}/positions/count`);
  }

  create(position: Position) {
    return this.http.post<Position>(`${this.API}/positions`, position);
  }
  }
}
