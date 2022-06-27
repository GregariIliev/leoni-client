import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {

  modify: boolean = false

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    
    ) { }

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
