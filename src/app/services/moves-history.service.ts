import { Injectable } from '@angular/core';
import { GameService } from './game.service';

@Injectable({
    providedIn: 'root'
})
export class MovesHistoryService {
    constructor(private gameService: GameService) {}
    addInHistory(address: string, message: string) {
      if (address === 'player') {
        this.gameService.player.movesHistory.push(message);
      } else {
        this.gameService.enemy.movesHistory.push(message);
      }
    }
}
