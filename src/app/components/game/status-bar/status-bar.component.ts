import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';

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
