import { GameStatus } from './game.status';

export class Game {
    turnNumber: number;
    isHumanTurn: boolean;
    gameStatus: GameStatus;
    type: string;
    constructor() {
        this.isHumanTurn = true;
        this.turnNumber = 0;
    }
}
