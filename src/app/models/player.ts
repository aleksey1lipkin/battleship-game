import { Cell } from './cell/cell.model';
import { CellStatus } from './cell/cell.status';
import { Ship } from './ship/ship.model';
import { ShipType } from './ship/ship.type';

export class Player {
    field: Array<Cell> = [];
    ships: Array<Ship> = [];
    constructor() {
        this.fillField();
        this.initShipArray();
    }
    private fillField(): void {
        // tslint:disable-next-line: prefer-const
        let cells: Array<Cell> = [];
        const cellCounter = 100;
        let x = 0;
        let y = 0;
        for (let i = 0; i < cellCounter; i++) {
          if ( i !== 0 && i % 10 === 0 ) {
            x++;
            y = 0;
          }
          cells[i] = new Cell(x, y, CellStatus.default);
          y++;
        }
        this.field = cells;
    }
    private initShipArray() {
    // TODO change trash below for function
        this.ships.push(new Ship(ShipType.oneDeck));
        this.ships.push(new Ship(ShipType.oneDeck));
        this.ships.push(new Ship(ShipType.oneDeck));
        this.ships.push(new Ship(ShipType.oneDeck));
        this.ships.push(new Ship(ShipType.twoDeck));
        this.ships.push(new Ship(ShipType.twoDeck));
        this.ships.push(new Ship(ShipType.twoDeck));
        this.ships.push(new Ship(ShipType.threeDeck));
        this.ships.push(new Ship(ShipType.threeDeck));
        this.ships.push(new Ship(ShipType.fourDeck));
    }
}
