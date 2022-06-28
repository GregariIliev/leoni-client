import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DepartmentService } from '../../services/department.service';

import { Router } from '@angular/router';

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
    private readonly departmentService: DepartmentService,
    private router: Router
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

  onModify() {
    this.getDepartment();
    this.modify = !this.modify;
  }

  onDelete() {
    this.departmentService.delete(this.departmentId).subscribe(data => {
      this.router.navigateByUrl('/admin-panel/departments');
    })
  }

  onPrint(){

  }
}
