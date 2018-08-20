import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { ChangeStatusService } from './change-status.service';
import { GameStatus } from '../models/game/game.status';

@Injectable({
    providedIn: 'root'
})
export class SwitchTurnService {
    constructor(
        private gameService: GameService,
        private changeStatusService: ChangeStatusService
    ) {}
    public switchTurn() {
        this.gameService.game.isHumanTurn = !this.gameService.game.isHumanTurn;
        if (this.gameService.game.isHumanTurn) {
            this.changeStatusService.changeGameStatus(GameStatus.playerTurn);
        } else {
            this.changeStatusService.changeGameStatus(GameStatus.enemyTurn);
        }
    }
}
