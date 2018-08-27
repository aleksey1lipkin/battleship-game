import { CellStatus } from './cell.status';

export class Cell {
    public x: number;
    public y: number;
    public isShipPlaced = false;
    public isFired = false;
    public status: CellStatus = CellStatus.default;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
