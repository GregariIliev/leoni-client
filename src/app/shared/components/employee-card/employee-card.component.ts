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
  printCard!: string;

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
        this.employeeFullName = `${emp.firstName} ${emp.middleName} ${emp.lastName}`
        this.employee$.next(emp);
        this.printCard = JSON.stringify(emp, null, 4);
      },
      error: (err) => {
        this.err$.next(err);
      },
      complete: () => { }
    })
  }

  onModify() {
    this.getEmployee();
    this.modify = !this.modify;
  }

  onDelete() {
    if (this.employeeId === '1') {
      this.err$.next('Cannot delete the admin profile');
    } else {
      this.employeeService.delete(this.employeeId).subscribe(data => {
        this.router.navigateByUrl('/admin-panel/employees');
      })
    }
  }

  onPrint() {
    console.log(this.printCard);
  }

  ngOnDestroy(): void {
    this.employee$.unsubscribe();
    this.err$.unsubscribe();
  }

}
