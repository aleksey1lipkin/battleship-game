import { Component, OnInit, Input } from '@angular/core';
import { Ship } from './ship/models/ship.model';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss']
})
export class FleetComponent implements OnInit {
  @Input() fleet: Array<Ship> = [];
  fleetSizes: Number[] = [];
  constructor() { }

  ngOnInit() {
    this.fleet.forEach(ship => {
      if (!this.fleetSizes.includes(ship.size)) {
        this.fleetSizes.push(ship.size);
      }
    });
  }
}
