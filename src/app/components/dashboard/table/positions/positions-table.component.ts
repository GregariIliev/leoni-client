import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-positions-table',
  templateUrl: './positions-table.component.html',
  styleUrls: ['./positions-table.component.scss']
})
export class PositionsTableComponent implements OnInit {
  positions!: any;

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ positions }) => {
      this.positions = positions
    })
  }

}
