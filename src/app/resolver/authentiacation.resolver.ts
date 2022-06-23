import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { AuthServiceService } from '../service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentiacationResolver implements Resolve<boolean> {
  constructor(
    private readonly authServiceService: AuthServiceService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authServiceService.checkAuthorization()
      .pipe(data => {
        return data
      }, catchError(error => {
        localStorage.removeItem('leoni');
        this.router.navigateByUrl('/login');
        return of(false)
      }))
  }
}
