import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit, OnDestroy {
  modify: boolean = false

  employee$ = new BehaviorSubject<any>({});
  employeeId!: any;
  employeeFullName!: string;

  err$ = new BehaviorSubject<string>('');

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly employeeService: EmployeeService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.employeeId = id;
    })

    this.employeeService.getById(this.employeeId).subscribe({
      next: (emp) => {
        this.employeeFullName = `${emp.firstName} ${emp.middleName} ${emp.lastName}`;
        this.employee$.next(emp);
      },
      error: (err) => {
        this.err$.next(err.statusText);
      }
    })
  }

  onModify() {
    this.getEmployee();
    this.modify = !this.modify;
  }

  onDelete() {
    this.employeeService.delete(this.employeeId).subscribe(data => {
      this.router.navigateByUrl('/admin-panel/employees');
    })
  }

  onPrint() {
    this.employee$.subscribe(emp => {
      console.log(JSON.stringify(emp, null, 4));
    })
  }

  ngOnDestroy(): void {
   this.employee$.unsubscribe();
  }

}
