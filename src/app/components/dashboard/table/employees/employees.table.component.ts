import { Component, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './employees.table.component.html',
  styleUrls: ['./employees.table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesTableComponent implements OnInit, OnChanges {
  employees!: any;
  departments!: any;
  positions!: any;

  constructor(private readonly route: ActivatedRoute) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

  }

  ngOnInit(): void {
    this.route.data.subscribe(({ employees }) => {
      this.employees = employees;
    })
  }
}
