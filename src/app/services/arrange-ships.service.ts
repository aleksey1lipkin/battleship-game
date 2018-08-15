import { Cell } from '../models/cell/cell.model';
import { CellStatus } from '../models/cell/cell.status';
import { Ship } from '../models/ship/ship.model';
import { ShipStatus } from '../models/ship/ship.status';

export class ArrangeShipsService {
  field: Array<Cell> = [];
  ships: Array<Ship> = [];
  constructor() { }
  placeShips(cells: Array<Cell>, ships: Array<Ship>) {
    this.field = cells;
    this.ships = ships;
    /*1) принять массив ячеек и корабли, которые надо поставить +
      2) сохранить себе их +
      3) запустить цикл по кораблям
      5) взять рандомную ячейку
      4) проверять каждый корабль на возможность его поставить
      5) если можно - ставим
      6) если нет - берём новую ячейку и ищем дальше
      7) проверять все ли корабли поставили */
    this.startRanking();
    return {'field': this.field, 'ships': this.ships};
  }
  startRanking() {
    this.ships.forEach(ship => {
      if (ship.status === ShipStatus.default) {
        const startPosition = this.getRandomCell();
        const direction = Math.round(Math.random()) === 1 ? 'right' : 'bottom';
        if (
            this.checkCellsForEmptyStatus(startPosition, ship.size, direction) &&
            this.checkFieldForLineBreak(startPosition, ship.size)
            ) {
          this.placeShipOnField(startPosition, ship, direction);
        }
      }
    });
    if (!this.checkRankingForFinish()) {
      try {
        this.startRanking();
      } catch (ex) {
        // TODO need to do smth with error
      }
    }
  }
  checkRankingForFinish(): boolean {
    let isFinished = true;
    this.ships.forEach(ship => {
      if (ship.status !== ShipStatus.placed) {
        isFinished = false;
      }
    });
    return isFinished;
  }
  getRandomCell(): number {
    return Math.floor(Math.random() * 100);
  }
  placeShipOnField(startPosition: number, ship: Ship, direction: string) {
    const cellsArray: Array<Cell> = [];
    const multiplier = direction === 'right' ? 1 : 10;
    for (let i = 0; i < ship.size; i++) {
      // console.log(startPosition + i + additive);
      this.field[startPosition + i * multiplier].status = CellStatus.shipPlaced;
      cellsArray.push(this.field[startPosition + i * multiplier]);
    }
    ship.status = ShipStatus.placed;
    this.createBufferZone(cellsArray);
  }
  createBufferZone(cellsArray: Array<Cell>) {
    cellsArray.forEach(cell => {
      const {x, y} = cell;
      this.field.forEach(item => {
        if (
          ( item.x === x - 1 && item.y === y - 1 ) ||
          ( item.x === x - 1 && item.y === y ) ||
          ( item.x === x - 1 && item.y === y + 1 ) ||
          ( item.x === x && item.y === y - 1 ) ||
          ( item.x === x && item.y === y ) ||
          ( item.x === x && item.y === y + 1 ) ||
          ( item.x === x + 1 && item.y === y - 1 ) ||
          ( item.x === x + 1 && item.y === y ) ||
          ( item.x === x + 1 && item.y === y + 1 )
          ) {
            if (item.status === CellStatus.default) {
              item.status = CellStatus.buffer;
            }
            }
      });
    });
    /*1) взять ячейки, вокруг которых нужно создать зону
      2) запустить цикл по этим ячейкам
      3) в цикле нужно что-то написать, чтобы вокруг ячейки соседние изменили статус */
  }
  checkCellsForEmptyStatus(startPosition: number, shipSize: number, direction: string): boolean {
    /* нужно проверить направление, если вправо, то ничего не меняем
      если вниз, то надо че то сделать, по факту прибавить к i 10 */
      const multiplier = direction === 'right' ? 1 : 10;
    for (let i = 0; i < shipSize; i++) {
      if (startPosition + i * multiplier > this.field.length - 1) {
        return false;
      }
      if (this.field[startPosition + i * multiplier].status === CellStatus.shipPlaced ||
          this.field[startPosition + i * multiplier].status === CellStatus.buffer) {
          return false;
        }
    }
    return true;
    /*1) взять начальную позицию и длину коробля +
      2) инициализировать цикл по массиву ячеек
      3) в цикле нужно проверять свободны ли ячейки, чтобы влез корабль
      4) если нет вернуть false и выбрать новую ячейку
      5) если да вернуть true и пусть кто-то посадит туда корабли*/
  }
  checkFieldForLineBreak(startPosition: number, shipSize: number): boolean {
    const {x, y} = this.field[startPosition];
    for (let i = 0; i < shipSize; i++) {
      // this condition check field for line break
      if (
          Math.abs(this.field[startPosition + i].x - x) >= shipSize ||
          Math.abs(this.field[startPosition + i].y - y) >= shipSize) {
        return false;
      }
    }
    return true;
    /*есть стартовая ячейка и корабль, нужно проверить не кончится ли поле пока мы ставим корабль
      1) взять координаты стартовой ячейки х, у
      2) взять длину коробля
      3) идём в какую-то сторону и смотрим кончилось ли поле:
      4) если изменилась та координата в сторону которой идём, то кончилось*/
  }
}
