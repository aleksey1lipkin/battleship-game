import { GameLevels } from './game.levels';

export class GameSettings {
    gameLevels: GameLevels[];
    fieldSize: number;
    ships: [{type: string, quantity: number}];
}
