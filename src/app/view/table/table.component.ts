import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
  displayedColumns!: string[];
  data!: any;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly router: Router) { }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: ({ table }) => {
        if (table.length > 0) {
          this.displayedColumns = Object.keys(table[0]);

          this.data = table

          if (table[0].Positions) {
            for (const t of table) {
              t.Positions = t.Positions.map((p: any) => p.name);
            }
          }

        }
      }
    })

  }
  onClick(row : any){
    this.router.navigateByUrl(`${this.router.url}/${row.id}`);
  }
}