import { Pipe, PipeTransform } from '@angular/core';
import { GameStatus } from '../../game/models/game.status';

@Pipe({
    name: 'modifyStatus'
})
export class ModifyStatusPipe implements PipeTransform {
    transform(status: GameStatus): string {
        let transformedStatus = '';
        switch (status) {
            case GameStatus.waitingForPlayers:
                transformedStatus = 'Waiting for players';
                break;
            case GameStatus.gameStarted:
                transformedStatus = 'Game is started';
                break;
            case GameStatus.playerTurn:
                transformedStatus = 'Player turn';
                break;
            case GameStatus.enemyTurn:
                transformedStatus = 'Enemy turn';
                break;
            case GameStatus.finished:
                transformedStatus = 'Game is finished';
                break;
            default:
                transformedStatus = 'Waiting for players';
                break;
        }
        return transformedStatus;
    }
}
