import { Component, OnInit } from '@angular/core';
import { GameStatus } from '../../models/game/game.status';
import { GameService } from '../../services/game.service';
import { Player } from '../../models/player/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  player: Player;
  enemy: Player;
  constructor(private gameService: GameService,
              private router: Router) {
  }
  ngOnInit() {
    this.player = this.gameService.player;
    this.enemy = this.gameService.enemy;
    this.gameService.gameWinner
      .subscribe(
        (winner: string) => {
          alert(`The winner is ${winner}`);
          this.router.navigate(['/']);
        }
      );
  }
}
