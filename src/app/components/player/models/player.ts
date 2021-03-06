import { Cell } from '../../field/cell/models/cell.model';
import { CellStatus } from '../../field/cell/models/cell.status';
import { Ship } from '../fleet/ship/models/ship.model';
import { ShipType } from '../fleet/ship/models/ship.type';
import { ShipStatus } from '../fleet/ship/models/ship.status';

export class Player {
    field: Array<Cell> = [];
    fleet: Array<Ship> = [];
    deadShipCounter = 0;
    movesHistory: Array<string> = [];
    constructor() {
    }
    public fillField(fieldSize: number): void {
        // tslint:disable-next-line: prefer-const
        let cells: Array<Cell> = [];
        const cellCounter = fieldSize * fieldSize;
        let x = 0;
        let y = 0;
        for (let i = 0; i < cellCounter; i++) {
            if (i !== 0 && i % fieldSize === 0) {
                x++;
                y = 0;
            }
            cells[i] = new Cell(x, y);
            y++;
        }
        this.field = cells;
    }
    public initShipArray(shipsArray: [{type: string, quantity: number}]) {
        shipsArray.forEach(ship => {
            const type = ship.type;
            for (let i = 0; i < ship.quantity; i++) {
                this.fleet.push(new Ship(ShipType[type]));
            }
        });
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
