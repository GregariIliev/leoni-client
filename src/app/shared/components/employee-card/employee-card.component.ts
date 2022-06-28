import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {
  modify: boolean = false

  employee$ = new BehaviorSubject<any>({});
  employeeId!: any;
  employeeFullName!: string;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.employeeId = id;
    })

    this.employeeService.getById(this.employeeId).subscribe(emp => {
      this.employeeFullName = `${emp.firstName} ${emp.middleName} ${emp.lastName}`;
      this.employee$.next(emp);
    })
  }

  onModify() {
    this.getEmployee();
    this.modify = !this.modify;
  }

  onDelete() {
    this.employeeService.delete(this.employeeId).subscribe(data => {
      console.log(data);
      
    })
  }

  onModify(){
    this.modify = true
  }
}
