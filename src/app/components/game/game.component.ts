import { Component, OnInit } from '@angular/core';
import { GameStatus } from './game.status';
import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [GameService]
})
export class GameComponent implements OnInit {
  readyPlayerCounter = 0;
  player: Player = this.playerService.player;
  enemy: Player = this.playerService.enemy;
  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
  ) {
    this.gameService.changeGameStatus(GameStatus.default);
  }
  ngOnInit() {}
  changeStatusToReady() {
    this.readyPlayerCounter++;
    if (this.readyPlayerCounter === 2) {
      this.gameService.changeGameStatus(GameStatus.gameStarted);
    }
  }
}
