# LeoniClient

## This client work together whit leoni-server.
## You can login whit EMAIL: admin@abv.bg and PASSWORD: admin

Use the Development server.

This application helps you to management Employees, Departments and Positions in one company.

The Employee have the next attribues: names, address, phone, salary, shift, Departmyn, Position, Admin, email, password.
One Employee can be Admin (self reference). The logic to create or convert one Employee to Admin is not implemented.

Departments and Positions has relationship many to many.

You can create update and delete the Employees, Departments and Positions.

See the leoni-server to view the API.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
