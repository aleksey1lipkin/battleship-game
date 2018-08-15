import { Injectable } from '@angular/core';
import { Ship } from '../models/ship/ship.model';
import { ShipType } from '../models/ship/ship.type';
import { ArrangeShipsService } from './arrange-ships.service';
import { Cell } from '../models/cell/cell.model';
import { Player } from '../models/player';

@Injectable()
export class PlayerService {
  player: Player = new Player();
  enemy: Player = new Player();
  constructor(private arrangeShipsService: ArrangeShipsService) { }

  onArrangeShips() {
    const result = this.arrangeShipsService.placeShips(this.player.field, this.player.ships);
    this.player.field = result.field;
    this.player.ships = result.ships;
  }
}
