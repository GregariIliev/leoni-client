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
  // titles!: any;
  hide = true;
  left!: any;
  top!: any;

  constructor(private readonly route: ActivatedRoute) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

  }

  ngOnInit(): void {
    this.route.data.subscribe(({ employees }) => {
      this.employees = employees;

      //this.titles = Object.keys(employees[0]);              set titles on table dinamicaly
    })
  }

  onClick(employee: any, event: any) {
    console.log(event);

    this.left = event.pageX;
    this.top = event.pageY;

    this.hide = false
  }

  mouseleave(event: any) {
    this.hide = true
  }
}
