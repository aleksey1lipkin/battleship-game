import { GameStatus } from './game.status';

export class Game {
    isHumanTurn: boolean;
    gameStatus: GameStatus;
    type: string;
    constructor() {
        this.isHumanTurn = true;
        this.gameStatus = GameStatus.default;
    }
}
