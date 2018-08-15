import { ShipType } from './ship.type';
import { ShipStatus } from './ship.status';

export class Ship {
    // ship type (oneDeck, etc)
    type: ShipType;
    // shipe size and lifes depending on type
    size: number;
    lifes: number;
    // ship coords in the field
    coordinates: {};
    status: ShipStatus = ShipStatus.default;
    // when you init Ship define characteristics
    x: number = null;
    y: number = null;
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
    // define ship reaction on hit
    onHit() {
        this.lifes = this.lifes - 1;
        if (this.lifes === 0) {
            // needs to return some event or function for outside classes when ship is destroyed
        }
    }
    onChangePosition() {
        // this method determine coords of the ship
    }
}
