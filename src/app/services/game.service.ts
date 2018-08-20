import { Injectable } from '@angular/core';
import { Player } from '../models/player/player';
import { Game } from '../models/game/game';

@Injectable()
export class GameService {
    public player = new Player();
    public enemy = new Player();
    public game = new Game();
    constructor() {}
}
