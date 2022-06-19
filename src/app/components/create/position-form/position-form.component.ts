import { Component, OnInit } from '@angular/core';

import { PositionService } from 'src/app/service/position.service';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss']
})
export class PositionFormComponent implements OnInit {
  form!: any;
  shifts = ['A', 'B', 'C', 'R'];

  constructor(private readonly positionService: PositionService) { }

  ngOnInit(): void {
  }

  onSubmit(position: any) {
    
    this.positionService.create(position).subscribe((response) => {
    })
  }
}
