import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DepartmentService } from '../shared/services/department.service';

@Component({
  selector: 'app-department-card',
  templateUrl: './department-card.component.html',
  styleUrls: ['./department-card.component.scss']
})
export class DepartmentCardComponent implements OnInit {
  modify: boolean = false

  department$ = new BehaviorSubject<any>({});
  departmentId!: any;
  
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.getDepartment();
  }

  getDepartment(){
    this.activatedRoute.params.subscribe(({id}) => {
      this.departmentId = id
    })

    this.departmentService.getById(this.departmentId).subscribe(dep => {
      this.department$.next(dep);
    })
  }

  onModify(){
   this.modify = !this.modify;
  }

  onDelete(){

  }

  onPrint(){

  }
}
