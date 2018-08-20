import { Component, Input } from '@angular/core';
import { Ship } from '../../models/ship/ship.model';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss']
})
export class ShipComponent {
  @Input() ship: Ship;
  constructor() { }

}
