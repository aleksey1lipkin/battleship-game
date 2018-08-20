import { Cell } from '../models/cell/cell.model';
import { CellStatus } from '../models/cell/cell.status';
import { Ship } from '../models/ship/ship.model';
import { ShipStatus } from '../models/ship/ship.status';
import { Injectable } from '@angular/core';
import { ChangeStatusService } from './change-status.service';
import { GetCellNeighborsService } from './get-cell-neighbors.service';

@Injectable()
export class ArrangeShipsService {
  field: Array<Cell> = [];
  ships: Array<Ship> = [];
  constructor(
    private changeStatusService: ChangeStatusService,
    private getCellNeighborsService: GetCellNeighborsService
  ) { }
  public placeShips(cells: Array<Cell>, ships: Array<Ship>) {
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
    this.changeStatusService.playerIsReady();
  }
  private startRanking() {
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
  private checkRankingForFinish(): boolean {
    let isFinished = true;
    this.ships.forEach(ship => {
      if (ship.status !== ShipStatus.placed) {
        isFinished = false;
      }
    });
    return isFinished;
  }
  private getRandomCell(): number {
    return Math.floor(Math.random() * 100);
  }
  private placeShipOnField(startPosition: number, ship: Ship, direction: string) {
    const cellsArray: Array<Cell> = [];
    const multiplier = direction === 'right' ? 1 : 10;
    for (let i = 0; i < ship.size; i++) {
      const rate = startPosition + i * multiplier;
      this.field[rate].status = CellStatus.shipPlaced;
      this.field[rate].isShipPlaced = true;
      cellsArray.push(this.field[rate]);
      ship.coordinates.push({x: this.field[rate].x, y: this.field[rate].y});
    }
    ship.status = ShipStatus.placed;
    this.createBufferZone(cellsArray);
  }
  private createBufferZone(cellsArray: Array<Cell>) {
    cellsArray.forEach(cell => {
      const neighbors = this.getCellNeighborsService.getCellNeighbors(cell, this.field);
      neighbors.forEach(neighbor => {
          if (neighbor.status === CellStatus.default) {
            neighbor.status = CellStatus.buffer;
          }
      });
    });
    /*1) взять ячейки, вокруг которых нужно создать зону
      2) запустить цикл по этим ячейкам
      3) в цикле нужно что-то написать, чтобы вокруг ячейки соседние изменили статус */
  }
  private checkCellsForEmptyStatus(startPosition: number, shipSize: number, direction: string): boolean {
    /* нужно проверить направление, если вправо, то ничего не меняем
      если вниз, то надо че то сделать, по факту прибавить к i 10 */
      const multiplier = direction === 'right' ? 1 : 10;
    for (let i = 0; i < shipSize; i++) {
      const rate = startPosition + i * multiplier;
      if (rate > this.field.length - 1) {
        return false;
      }
      if (this.field[rate].status === CellStatus.shipPlaced ||
          this.field[rate].status === CellStatus.buffer) {
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
  private checkFieldForLineBreak(startPosition: number, shipSize: number): boolean {
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
