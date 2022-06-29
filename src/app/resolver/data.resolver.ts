import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { EmployeeService } from '../shared/services/employee.service';
import { DepartmentService } from '../shared/services/department.service';
import { PositionService } from '../shared/services/position.service';

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

    } else if (state.url.endsWith('create-department')){
      return this.positionService.getAll();
    }
    return of(false);
  }
}
