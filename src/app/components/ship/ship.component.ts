import { Component, OnInit } from '@angular/core';
import { Ship } from './ship.model';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss']
})
export class ShipComponent implements OnInit {
  ship: Ship;
  constructor() { }

  ngOnInit() {
  }

}
