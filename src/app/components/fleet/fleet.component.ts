import { Component, OnInit, Input } from '@angular/core';
import { Ship } from '../../models/ship/ship.model';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss']
})
export class FleetComponent implements OnInit {
  @Input() fleet: Array<Ship> = [];
  oneDeckFleet: Array<Ship> = [];
  twoDeckFleet: Array<Ship> = [];
  threeDeckFleet: Array<Ship> = [];
  fourDeckFleet: Array<Ship> = [];
  constructor() { }

  ngOnInit() {
    this.fleet.forEach(ship => {
      switch (ship.size) {
        case 1:
        this.oneDeckFleet.push(ship);
          break;
        case 2:
        this.twoDeckFleet.push(ship);
          break;
        case 3:
        this.threeDeckFleet.push(ship);
          break;
        default:
        this.fourDeckFleet.push(ship);
          break;
      }
    });
  }

}
