import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

import { DepartmentService } from '../service/department.service';
import { EmployeeService } from '../service/employee.service';
import { PositionService } from '../service/position.service';

@Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<boolean> {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly deparmtentService: DepartmentService,
    private readonly positionService: PositionService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if (state.url.endsWith('dashboard')) {
      return forkJoin([
        this.employeeService.count(),
        this.deparmtentService.count(),
        this.positionService.count()]);

    } else if (state.url.endsWith('employees')) {
      return this.employeeService.getAll();

    } else if (state.url.endsWith('departments')) {
      return this.deparmtentService.getAll();

    } else if (state.url.endsWith('positions')) {
      return this.positionService.getAll();

    } else if (state.url.endsWith('hire-employee')) {
      return this.deparmtentService.getAllDepartmentsPositions();
    }
    return of(false);
  }
}
