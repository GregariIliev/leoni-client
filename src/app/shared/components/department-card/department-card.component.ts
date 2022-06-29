import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DepartmentService } from '../../services/department.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-department-card',
  templateUrl: './department-card.component.html',
  styleUrls: ['./department-card.component.scss']
})
export class DepartmentCardComponent implements OnInit, OnDestroy {
  modify: boolean = false

  department$ = new BehaviorSubject<any>({});
  departmentId!: any;
  err$ = new BehaviorSubject<string>('');

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly departmentService: DepartmentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDepartment();
  }

  getDepartment() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.departmentId = id
    })

    this.departmentService.getById(this.departmentId).subscribe({
      next: (dep) => {
        this.department$.next(dep);
      },
      error: (err) => {
        this.err$.next(err.statusText);
      }
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

  onPrint() {
    this.department$.subscribe(data => {
      console.log(JSON.stringify(data, null, 4));
    })

  }

  ngOnDestroy(): void {
    this.department$.unsubscribe();
    this.err$.unsubscribe();
  }
}
