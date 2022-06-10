import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthorizationGuard } from '../guards/authorization.guard';

export interface Employee { }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = environment.api;

  private logged = new BehaviorSubject<boolean>(false);
  private error = ''


  constructor(private readonly http: HttpClient) { }

  get isLogged(): Observable<boolean> {
    return this.logged;
  }

  }

  login(admin: any): Observable<any> {
    return this.http.post<any>(`${this.API}/employees`, admin)
      .pipe(
        map((response) => {
          localStorage.setItem('leoni', admin.email);

          this.logged.next(true);

          return response
        }),
        catchError((err) => {
          localStorage.removeItem('leoni');

          return err
        })
      );
  }



  // update(user: User): Observable<Token> {
  //   return this.http.put<User>(`${this.API}/${user}`, user);  /// change user to user.id
  // }

  // delete(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.API}/${id}`);
  // }
}
