import { Position } from "./Position";

export interface Department {
    id: string;
    name: string;
    maxEmployees: number;
    salaryMultiplayer: number;
    Positions: Position;
}