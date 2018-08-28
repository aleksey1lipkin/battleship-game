import { Injectable } from '@angular/core';
import { Player } from '../components/player/models/player';
import { Game } from '../components/game/models/game';
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
