import { Cell } from '../components/field/cell/models/cell.model';
import { CellStatus } from '../components/field/cell/models/cell.status';
import { Injectable } from '@angular/core';
import { GameStatusService } from './game-status.service';
import { GetCellNeighborsService } from './get-cell-neighbors.service';
import { Ship } from '../components/player/fleet/ship/models/ship.model';
import { ShipStatus } from '../components/player/fleet/ship/models/ship.status';

@Injectable()
export class ArrangeShipsService {
  field: Array<Cell> = [];
  ships: Array<Ship> = [];
  constructor(
    private gameStatusService: GameStatusService,
    private getCellNeighborsService: GetCellNeighborsService
  ) { }

  public placeShips(cells: Array<Cell>, ships: Array<Ship>) {
    this.field = cells;
    this.ships = ships;
    this.startRanking();
    this.gameStatusService.playerIsReady();
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

  /**
  * Check if all ships are placed on the field
  */
  private checkRankingForFinish(): boolean {
    let isFinished = true;
    this.ships.forEach(ship => {
      if (ship.status !== ShipStatus.placed) {
        isFinished = false;
      }
    });
    return isFinished;
  }

  /**
  * get random number from 0 to 100
  */
  private getRandomCell(): number {
    return Math.floor(Math.random() * 100);
  }

  /**
  * put the ship on the cells
  */
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

  /**
  * mark all neighbor cells
  */
  private createBufferZone(cellsArray: Array<Cell>) {
    cellsArray.forEach(cell => {
      const neighbors = this.getCellNeighborsService.getCellNeighbors(cell.x, cell.y, this.field);
      neighbors.forEach(neighbor => {
          if (neighbor.status === CellStatus.default) {
            neighbor.status = CellStatus.buffer;
          }
      });
    });
  }

  /**
  * check cell status, return true if it is suitable for the ship
  */
  private checkCellsForEmptyStatus(startPosition: number, shipSize: number, direction: string): boolean {
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
  }

  /**
  * check field line for break, returns true if ship is placed on the line
  */
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
  }
}
