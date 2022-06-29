import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, catchError } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../core/authentication/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private readonly authService: AuthService) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isAuth().pipe(catchError(err => {
      localStorage.removeItem('leoni');
      this.router.navigateByUrl('/login');
      return of(err);
    }))
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
    return this.authService.isAuth().pipe(catchError(err => {
      localStorage.removeItem('leoni');
      this.router.navigateByUrl('/login');
      return of(err);
    }))
  }
}
