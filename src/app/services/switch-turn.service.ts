import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { GameStatusService } from './game-status.service';
import { GameStatus } from '../components/game/models/game.status';

@Injectable({
    providedIn: 'root'
})
export class SwitchTurnService {
    constructor(
        private gameService: GameService,
        private gameStatusService: GameStatusService
    ) {}
    public switchTurn() {
        this.gameService.game.isHumanTurn = !this.gameService.game.isHumanTurn;
        if (this.gameService.game.isHumanTurn) {
            this.gameStatusService.changeGameStatus(GameStatus.playerTurn);
        } else {
            this.gameStatusService.changeGameStatus(GameStatus.enemyTurn);
        }
    }
}
