import { GridData } from "./grid.model";

export class Payment {
    id!: string;
    name!: string;
    amount!: number;
    code!: number;
    grid?: GridData;
}