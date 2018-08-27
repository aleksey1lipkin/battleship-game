import { Cell } from '../cell/cell.model';
import { CellStatus } from '../cell/cell.status';
import { Ship } from '../ship/ship.model';
import { ShipType } from '../ship/ship.type';
import { ShipStatus } from '../ship/ship.status';

export class Player {
    field: Array<Cell> = [];
    fleet: Array<Ship> = [];
    deadShipCounter = 0;
    movesHistory: Array<string> = [];
    constructor() {
        this.fillField();
        this.initShipArray();
    }
    public fillField(): void {
        // tslint:disable-next-line: prefer-const
        let cells: Array<Cell> = [];
        const cellCounter = 100;
        let x = 0;
        let y = 0;
        for (let i = 0; i < cellCounter; i++) {
            if (i !== 0 && i % 10 === 0) {
                x++;
                y = 0;
            }
            cells[i] = new Cell(x, y);
            y++;
        }
        this.field = cells;
    }
    private initShipArray() {
        // TODO change trash below for function
        this.fleet.push(new Ship(ShipType.oneDeck));
        this.fleet.push(new Ship(ShipType.oneDeck));
        this.fleet.push(new Ship(ShipType.oneDeck));
        this.fleet.push(new Ship(ShipType.oneDeck));
        this.fleet.push(new Ship(ShipType.twoDeck));
        this.fleet.push(new Ship(ShipType.twoDeck));
        this.fleet.push(new Ship(ShipType.twoDeck));
        this.fleet.push(new Ship(ShipType.threeDeck));
        this.fleet.push(new Ship(ShipType.threeDeck));
        this.fleet.push(new Ship(ShipType.fourDeck));
    }
    public getFired(cell: Cell): string {
      const {x, y} = cell;
      const result = this.passDmgToShip(x, y);
      cell.status = CellStatus[result];
      cell.isFired = true;
      return CellStatus[cell.status];
    }
    private passDmgToShip(x: number, y: number): string {
      let result = 'miss';
      this.fleet.forEach(ship => {
        ship.coordinates.forEach(mark => {
          if (mark.x === x && mark.y === y) {
            ship.lifes--;
            if (ship.lifes === 0) {
                result = 'shipIsDead';
                ship.status = ShipStatus.dead;
                this.deadShipCounter++;
            } else {
                result = 'hit';
            }
            return result;
          }
        });
      });
      return result;
    }
}
