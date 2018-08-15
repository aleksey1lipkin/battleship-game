import { CellStatus } from './cell.status';

export class Cell {
    constructor(public x: number, public y: number, public status: CellStatus) {}
}
