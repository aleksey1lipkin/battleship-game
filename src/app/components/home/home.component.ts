import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { ComputerAIService } from '../../services/computer-ai.service';
import { Router } from '@angular/router';
import { GameLevels } from '../game/models/game.levels';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    levels: string[] = [];
    types: string[] = ['computer'];
    isGameVsComputer: boolean;
    loginForm: FormGroup;
    constructor(
        private gameService: GameService,
        private computerAIService: ComputerAIService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loginForm = new FormGroup({
            name: new FormControl('', Validators.required),
            gameType: new FormControl('', Validators.required)
        });
        for (const level in GameLevels) {
            if (isNaN(Number(level))) {
                this.levels.push(level);
            }
        }
    }
    onSubmit() {
        const settings = this.loginForm.value;
        this.gameService.setGameType(settings.gameType);
        if (settings.gameLevel) {
            this.computerAIService.setLevel(settings.gameLevel);
        }
        if (this.loginForm.valid) {
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
