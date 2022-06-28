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
    this.activatedRoute.data.subscribe({
      next: (employee) => {

      }
    })
  }

  onModify(){
    this.modify = true
  }
}
