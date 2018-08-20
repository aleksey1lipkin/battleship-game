import { Injectable } from '@angular/core';
import { Cell } from '../models/cell/cell.model';
import { SwitchTurnService } from './switch-turn.service';
import { GameService } from './game.service';
import { MovesHistoryService } from './moves-history.service';
import { ComputerAIService } from './computer-ai.service';

@Injectable({
    providedIn: 'root'
})
export class FireService {
    constructor(
        private switchTurnService: SwitchTurnService,
        private gameService: GameService,
        private movesHistoryService: MovesHistoryService,
        private computerAIService: ComputerAIService
    ) {}
    public makeShot(cell: Cell) {
        if (!this.checkShotForLegal() || !this.gameService.game.isHumanTurn) {
            return;
        }
        cell.isFired = true;
        let cellStatus = this.gameService.enemy.getFired(cell);
        let message = `coordinates of the shot x:${cell.x}, y:${cell.y}; Status: ${cellStatus}`;
        this.movesHistoryService.addInHistory('player', message);
        this.switchTurnService.switchTurn();

        const self = this;
        setTimeout(() => {
            const aiTarget = self.computerAIService.fire();
            cellStatus = self.gameService.player.getFired(aiTarget);
            message = `coordinates of the shot x:${aiTarget.x}, y:${aiTarget.y}; Status: ${cellStatus}`;
            this.movesHistoryService.addInHistory('AI', message);
            self.switchTurnService.switchTurn();
        }, 300);
    }
    checkShotForLegal() {
        switch (this.gameService.game.gameStatus) {
            case 0:
            case 1:
            case 5:
                return false;
            default:
                return true;
        }
    }
}
