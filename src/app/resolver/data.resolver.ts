import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, map, Observable, of } from 'rxjs';

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
        this.positionService.count()])
        .pipe(map(data => {
          return {
            employeesCount: data[0],
            departmentsCount: data[1],
            positionsCount: data[2]
          }
        }))
  }
}
