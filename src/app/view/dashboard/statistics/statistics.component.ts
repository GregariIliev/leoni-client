import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  employeeCount!: number;
  departmentCount!: any;
  positionsCount!: any;

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ stats }) => {
      this.employeeCount = stats[0];
      this.departmentCount = stats[1];
      this.positionsCount = stats[2];
    })
  }
}
