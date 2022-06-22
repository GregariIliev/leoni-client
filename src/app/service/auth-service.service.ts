import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly API = environment.api;

  constructor(private readonly http: HttpClient) { }

  checkAuthorization() {
    return this.http.get<any>(`${this.API}/authenticate`)
      
  }
}
