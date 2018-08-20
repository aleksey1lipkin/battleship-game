import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { Cell } from '../models/cell/cell.model';
import { GetCellNeighborsService } from './get-cell-neighbors.service';

@Injectable({
  providedIn: 'root'
})
export class ComputerAIService {
  constructor(
    private gameService: GameService,
    private getCellNeighborsService: GetCellNeighborsService
  ) { }
  fire(): Cell {
    const targets: Array<Cell> = [];
    const firedTargets: Array<Cell> = [];
    let finalTarget: Cell;
    this.gameService.player.field.forEach(cell => {
      if (cell.isShipPlaced && cell.isFired) {
        // взять соседей ячейки и добавить в массив firedTargets
        const neighbors = this.getCellNeighborsService.
                            getCellNeighbors(cell, this.gameService.player.field);
        neighbors.forEach(neighbor => {
          if (!neighbor.isFired) {
            firedTargets.push(neighbor);
          }
        });
      }
      if (!cell.isFired) {
        targets.push(cell);
      }
      if (firedTargets.length) {
        finalTarget = firedTargets[Math.floor(Math.random() * firedTargets.length)];
      } else {
        finalTarget = targets[Math.floor(Math.random() * targets.length)];
      }
    });
    return finalTarget;
  }
}
