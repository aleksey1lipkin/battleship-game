import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { Cell } from '../components/field/cell/models/cell.model';
import { GetCellNeighborsService } from './get-cell-neighbors.service';
import { GameLevels } from '../components/game/models/game.levels';

@Injectable({
    providedIn: 'root'
})
export class ComputerAIService {
    private level: number;
    private field: Cell[];
    private diagonalCells: Cell[] = [];
    private chessCells: Cell[] = [];
    constructor(
        private gameService: GameService,
        private getCellNeighborsService: GetCellNeighborsService
    ) {
        this.field = this.gameService.player.field;
    }
    public setLevel(level: string) {
        this.level = GameLevels[level];
        if (this.level === GameLevels.hard) {
            this.fillDiagonalCells();
            this.fillChessCells();
        }
    }
    public fire(): Cell {
        let finalTarget = null;
        switch (this.level) {
            case GameLevels.easy:
                finalTarget = this.getRandomCell(this.field);
                break;
            case GameLevels.medium:
                finalTarget = this.dumbShot(this.field);
                break;
            case GameLevels.hard:
                finalTarget = this.smartShot();
                break;
            default:
                break;
        }
        return finalTarget;
    }
    private fillDiagonalCells() {
        this.field.forEach(cell => {
            if (cell.x === cell.y || cell.x + cell.y === 9) {
                this.diagonalCells.push(cell);
            }
        });
    }
    private fillChessCells() {
        this.field.forEach((cell, index) => {
            if (cell.x === 0 || cell.x % 2 === 0) {
                if (index === 0 || index % 2 === 0) {
                    this.chessCells.push(cell);
                }
            } else if (cell.x % 2 !== 0) {
                if (index % 2 !== 0) {
                    this.chessCells.push(cell);
                }
            }
        });
    }
    private getRandomCell(field: Cell[]): Cell {
        const targets: Cell[] = [];
        let finalTarget: Cell;
        field.forEach(cell => {
            if (!cell.isFired) {
                targets.push(cell);
            }
        });
        finalTarget = targets[Math.floor(Math.random() * targets.length)];
        return finalTarget;
    }
    private getNextCell(field: Cell[]): Cell {
        let finalTarget: Cell;
        let isCellFounded = false;
        field.forEach(cell => {
            if (!cell.isFired && !isCellFounded) {
                finalTarget = cell;
                isCellFounded = true;
            }
        });
        return finalTarget;
    }
    private dumbShot(field: Cell[]) {
        const firedTargets: Cell[] = [];
        let finalTarget: Cell;
        this.searchTarget(firedTargets);
        if (firedTargets.length) {
            finalTarget = this.getRandomCell(firedTargets);
        } else {
            this.level === GameLevels.hard ?
            finalTarget = this.getNextCell(field) :
            finalTarget = this.getRandomCell(field);
        }
        return finalTarget;
    }
    private smartShot() {
        let isUntouchedCell: boolean;
        isUntouchedCell = this.diagonalCells.some(cell => {
            return !cell.isFired;
        });
        if (isUntouchedCell) {
            return this.dumbShot(this.diagonalCells);
        } else {
            isUntouchedCell = this.chessCells.some(cell => {
                return !cell.isFired;
            });
            if (isUntouchedCell) {
                return this.dumbShot(this.chessCells);
            } else {
                return this.dumbShot(this.field);
            }
        }
    }
    private searchTarget(firedTargets: Cell[]) {
        this.field.forEach(cell => {
            if (cell.isShipPlaced && cell.isFired) {
                const neighbors = this.getCellNeighborsService.getCellNeighbors(
                    cell.x,
                    cell.y,
                    this.gameService.player.field
                );
                neighbors.forEach(neighbor => {
                    if (!neighbor.isFired) {
                        firedTargets.push(neighbor);
                    }
                });
            }
        });
    }
}
