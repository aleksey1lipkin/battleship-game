import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { GameSettings } from '../components/game/models/game.settings';

@Injectable()
export class SettingsService {
    constructor(private gameService: GameService,
                private httpClient: HttpClient) {}
    public getSettings() {
        this.httpClient.get('/src/assets/config/app-settings.json')
            .subscribe(
                (settings: GameSettings) => {
                    this.gameService.setSettings(settings);
                }
            );
    }
    public setSettings() {

    }
}
