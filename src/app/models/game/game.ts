import { GameStatus } from './game.status';

export class Game {
    turnNumber: number;
    isHumanTurn: boolean;
    gameStatus: GameStatus;
    constructor() {
        this.isHumanTurn = true;
        this.turnNumber = 0;
        this.gameStatus = GameStatus.default;
    }
}
