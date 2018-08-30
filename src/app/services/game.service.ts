import { Injectable } from '@angular/core';
import { Player } from '../components/player/models/player';
import { Game } from '../components/game/models/game';
import { Subject } from 'rxjs';
import { GameSettings } from '../components/game/models/game.settings';

@Injectable()
export class GameService {
    public player = new Player();
    public enemy = new Player();
    public game = new Game();
    settings: GameSettings;
    gameWinner = new Subject<string>();
    settingsChanged = new Subject<{}>();
    constructor() {
    }
    setSettings(settings: GameSettings) {
        this.settings = settings;
        this.player.fillField(this.settings.fieldSize);
        this.enemy.fillField(this.settings.fieldSize);
        this.player.initShipArray(this.settings.ships);
        this.enemy.initShipArray(this.settings.ships);
        this.settingsChanged.next(settings);
    }
    getGameSettings() {
        return this.settings;
    }
    setGameType(type: string) {
        this.game.type = type;
    }
    defineWinner(winner: string) {
        this.gameWinner.next(winner);
    }
}
