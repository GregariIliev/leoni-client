import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {
  form!: any;
 // err!: any;

  constructor(private readonly departmentService: DepartmentService) { }

  ngOnInit(): void {
  }

  onSubmit(value: any) {
    this.departmentService.create(value).subscribe({
      next: (response) => {
        //redirect
        return response
      },
      // error: (err) => {
      //   this.err = err.error;
      //   return err
      // }
    })

  }

}
