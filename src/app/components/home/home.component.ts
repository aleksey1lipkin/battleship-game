import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from '../../services/game.service';
import { ComputerAIService } from '../../services/computer-ai.service';
import { GameLevels } from '../game/models/game.levels';
import { GameStatusService } from '../../services/game-status.service';
import { GameStatus } from '../game/models/game.status';
import { GameSettings } from '../game/models/game.settings';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    levels: GameLevels[];
    subscription: Subscription;
    types: string[] = ['computer'];
    isGameVsComputer: boolean;
    loginForm: FormGroup;
    constructor(
        private gameService: GameService,
        private gameStatusService: GameStatusService,
        private computerAIService: ComputerAIService,
        private router: Router
    ) {}

    ngOnInit() {
        this.subscription = this.gameService.settingsChanged
            .subscribe(
                (settings: GameSettings) => {
                    this.levels = settings.gameLevels;
                }
            );
        this.loginForm = new FormGroup({
            name: new FormControl('', Validators.required),
            gameType: new FormControl('', Validators.required)
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    onSubmit() {
        const settings = this.loginForm.value;
        this.gameService.setGameType(settings.gameType);
        if (settings.gameLevel) {
            this.computerAIService.setLevel(settings.gameLevel);
        }
        if (this.loginForm.valid) {
            this.gameStatusService.changeGameStatus(GameStatus.default);
            this.router.navigate(['/game']);
        }
    }
    onSelectChange(gameType: string) {
        const formGroup: FormGroup = <FormGroup>this.loginForm;
        if (gameType === 'computer') {
            formGroup.addControl(
                'gameLevel',
                new FormControl('easy', Validators.required)
            );
        } else {
            formGroup.removeControl('gameLevel');
        }
    }
}
