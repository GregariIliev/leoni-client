import { Department } from "./Department"

export interface Position {
    id: string;
    name: string;
    salaryMultiplayer: number;
    shift: string;
    Departments: Department;
}