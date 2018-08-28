import { ShipType } from './ship.type';
import { ShipStatus } from './ship.status';

export class Ship {
    // ship type (oneDeck, etc)
    type: ShipType;
    // shipe size and lifes depending on type
    size: number;
    lifes: number;
    // ship coords in the field
    coordinates: Array<{x: number, y: number}> = [];
    status: ShipStatus = ShipStatus.default;
    constructor(type: ShipType) {
        this.type = type;
        switch (this.type) {
            case 1: {
                this.size = 2;
                break;
            }
            case 2: {
                this.size = 3;
                break;
            }
            case 3: {
                this.size = 3;
                break;
            }
            case 4: {
                this.size = 4;
                break;
            }
        }
        this.size = type;
        this.lifes = type;
    }
}
