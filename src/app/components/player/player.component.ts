import { Component, OnInit } from '@angular/core';
import { Ship } from '../../models/ship/ship.model';
import { ShipType } from '../../models/ship/ship.type';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  name: string;
  shipsArray: Ship[];
  shotStatistic: {} = {};
  constructor(name: string) {
    this.name = name;
    // each player have names and array of ships (four single-decker, three two-decker and so on)
    this.shipsArray.push(new Ship(ShipType.oneDeck));
  }
  ngOnInit() {}
  // each player can shoot
  onShoot() {
    // the shot goes on two coordinates,
    // it is necessary to check whether there was already a shot at these coordinates or not
    // you must return response from field and send it to shotStatistic
  }
}
