import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {
  errorSubject = new BehaviorSubject<string>('');
  errorMessage = this.errorSubject.asObservable();

  form!: any;

  constructor(private readonly departmentService: DepartmentService) { }

  ngOnInit(): void {
  }

  onSubmit(value: any) {
    this.departmentService.create(value).subscribe({
      next: (v) => {

      },
      error: (e) => {
        let error = e.error?.errors[0]?.message;

        error = error.charAt(0).toUpperCase() + error.slice(1);

        this.errorSubject.next(error);

      },
      complete: () => {
        //redirect
      }
    });
  }

}
