import { Department } from "./Department";
import { Position } from "./Position";

export interface Employee {
    id: number,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    password: string,
    shift: string,
    salary: number,
    address: string,
    phone: string,
    position_id: number,
    department_id: number,
    admin_id: number,
    updatedAt: string,
    createdAt: string,
}