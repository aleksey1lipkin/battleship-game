import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GameStatus } from '../../models/game/game.status';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
  status = this.gameService.game.gameStatus;
  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

}
