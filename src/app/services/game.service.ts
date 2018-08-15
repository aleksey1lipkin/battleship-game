import { Injectable } from '@angular/core';
import { GameStatus } from '../components/game/game.status';
import { PlayerService } from './player.service';

@Injectable()
export class GameService {
  status: GameStatus = GameStatus.default;
  player;
  constructor() {}
  /* игра всем управляет, заинициализировали компонент - инит игры
    1) в игре два игрока
    2) у игроков поле и корабли
    3) игра управляет тем кто щас ходит
    4) игра отдаёт статус игры */
  changeGameStatus(newStatus: GameStatus): void {
    this.status = newStatus;
    console.log(`game status: ${GameStatus[this.status]}`);
    if (this.status === GameStatus.gameStarted) {
      this.changeGameStatus(GameStatus.playerOneTurn);
      // нужно отдать ход игроку какому-то
    }
  }
}
