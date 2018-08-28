import { Injectable } from '@angular/core';
import { GameStatus } from '../components/game/models/game.status';
import { GameService } from './game.service';

@Injectable({
    providedIn: 'root'
})
export class ChangeStatusService {
  private counterReadyPlayer = 0;
  constructor(private gameService: GameService) {}
  playerIsReady() {
    this.counterReadyPlayer++;
    this.checkGameForStart();
  }
  public changeGameStatus(newStatus: GameStatus): void {
    this.gameService.game.gameStatus = newStatus;
  }
  private checkGameForStart() {
    if (this.counterReadyPlayer === 2) {
      this.changeGameStatus(GameStatus.gameStarted);
      // this.switchTurnService.switchTurn();
    }
  }
}
