import { Injectable } from '@angular/core';
import { Cell } from '../models/cell/cell.model';
import { SwitchTurnService } from './switch-turn.service';
import { GameService } from './game.service';
import { MovesHistoryService } from './moves-history.service';
import { ComputerAIService } from './computer-ai.service';
import { GetCellNeighborsService } from './get-cell-neighbors.service';
import { CellStatus } from '../models/cell/cell.status';

@Injectable({
    providedIn: 'root'
})
export class FireService {
    constructor(
        private switchTurnService: SwitchTurnService,
        private gameService: GameService,
        private movesHistoryService: MovesHistoryService,
        private computerAIService: ComputerAIService,
        private getCellNeighborsService: GetCellNeighborsService
    ) {}
    public makeShot(cell: Cell) {
        if (!this.checkShotForLegal() || !this.gameService.game.isHumanTurn) {
            return;
        }
        cell.isFired = true;
        const cellStatus = this.gameService.enemy.getFired(cell);
        const message = `coordinates of the shot x:${cell.x}, y:${cell.y}; Status: ${cellStatus}`;
        this.movesHistoryService.addInHistory('player', message);
        if (CellStatus[cellStatus] === CellStatus.shipIsDead) {
            const field = this.gameService.enemy.field;
            const fleet = this.gameService.enemy.fleet;
            fleet.forEach(ship => {
                if (ship.lifes === 0) {
                    ship.coordinates.forEach(coord => {
                        this.markCellsAroundShip(coord.x, coord.y, field);
                    });
                }
            });
        }
        if (this.gameService.enemy.fleet.length === this.gameService.enemy.deadShipCounter) {
            this.gameService.defineWinner('Player');
        }
        this.switchTurnService.switchTurn();
        this.makeComputerShot();
    }
    private makeComputerShot() {
        const self = this;
        setTimeout(() => {
            const aiTarget = self.computerAIService.fire();
            const cellStatus = self.gameService.player.getFired(aiTarget);
            if (CellStatus[cellStatus] === CellStatus.shipIsDead) {
                const field = this.gameService.player.field;
                const fleet = this.gameService.player.fleet;
                fleet.forEach(ship => {
                    if (ship.lifes === 0) {
                        ship.coordinates.forEach(coord => {
                            this.markCellsAroundShip(coord.x, coord.y, field);
                        });
                    }
                });
            }
            if (this.gameService.player.fleet.length === this.gameService.player.deadShipCounter) {
                this.gameService.defineWinner('Computer');
            }
            const message = `coordinates of the shot x:${aiTarget.x}, y:${aiTarget.y}; Status: ${cellStatus}`;
            self.movesHistoryService.addInHistory('AI', message);
            self.switchTurnService.switchTurn();
        }, 300);
    }
    private checkShotForLegal() {
        switch (this.gameService.game.gameStatus) {
            case 0:
            case 1:
            case 5:
                return false;
            default:
                return true;
        }
    }
    private markCellsAroundShip(x: number, y: number, field: Cell[]) {
        const neighbors = this.getCellNeighborsService.getCellNeighbors(
            x,
            y,
            field
        );
        neighbors.forEach(neighbor => {
            if (!neighbor.isShipPlaced) {
                neighbor.status = CellStatus.miss;
                neighbor.isFired = true;
            }
        });
    }
}
