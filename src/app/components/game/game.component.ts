import { Component, OnInit } from '@angular/core';
import { GameStatus } from '../../models/game/game.status';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  player = this.gameService.player;
  enemy = this.gameService.enemy;
  constructor(private gameService: GameService) {
  }
  ngOnInit() {
  }
}
