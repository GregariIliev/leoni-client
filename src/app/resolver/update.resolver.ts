import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { EmployeeService } from '../service/employee.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateResolver implements Resolve<boolean> {

  constructor(private readonly employeeService: EmployeeService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.employeeService.getById(route.params['id']);
    
    return of(true);
  }
}
