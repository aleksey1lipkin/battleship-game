import { Component, OnInit } from '@angular/core';
import { GameStatus } from './game.status';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public status: number;
  public player1Name: string;
  public player2Name: string;
  private winner: string;
  public isGameVsComputer: Boolean;

  constructor() {
    // default status is none
    this.status = GameStatus.default;
    this.winner = null;
  }
  ngOnInit() {}
  changeStatus(newStatus: number): void {
    this.status = newStatus;
  }
  changeType(type: string): void {
    // this method defines what type of game will be
  }
}
