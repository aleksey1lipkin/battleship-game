import { Injectable } from '@angular/core';
import { Player } from '../models/player/player';
import { Game } from '../models/game/game';
import { Subject } from 'rxjs';

@Injectable()
export class GameService {
    public player = new Player();
    public enemy = new Player();
    public game = new Game();
    gameWinner = new Subject<string>();
    constructor() {}
    setGameType(type: string) {
        this.game.type = type;
    }
    defineWinner(winner: string) {
        this.gameWinner.next(winner);
    }
}
