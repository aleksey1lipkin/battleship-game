import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameStatus } from '../../game/models/game.status';
import { GameStatusService } from '../../../services/game-status.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit, OnDestroy {
  status: GameStatus;
  subscription: Subscription;
  constructor(private gameStatusService: GameStatusService) { }

  ngOnInit() {
    this.status = this.gameStatusService.getStatus();
    this.subscription = this.gameStatusService.gameStatusChanged
      .subscribe(
        (newStatus: GameStatus) => this.status = newStatus
      );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
