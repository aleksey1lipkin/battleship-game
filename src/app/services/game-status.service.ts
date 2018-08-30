import { Injectable } from '@angular/core';
import { GameStatus } from '../components/game/models/game.status';
import { GameService } from './game.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameStatusService {
  public gameStatusChanged = new Subject<GameStatus>();
  private counterReadyPlayer = 0;
  constructor(private gameService: GameService) {}
  public playerIsReady() {
    this.counterReadyPlayer++;
    this.checkGameForStart();
  }
  public changeGameStatus(newStatus: GameStatus): void {
    this.gameService.game.gameStatus = newStatus;
    this.gameStatusChanged.next(newStatus);
  }
  private checkGameForStart() {
    if (this.counterReadyPlayer === 2) {
      this.changeGameStatus(GameStatus.gameStarted);
    }
  }
  public getStatus() {
    return this.gameService.game.gameStatus;
  }
}
