import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Cell } from '../../models/cell/cell.model';
import { ArrangeShipsService } from '../../services/arrange-ships.service';
import { PlayerService } from '../../services/player.service';
import { CellStatus } from '../../models/cell/cell.status';
import { Player } from '../../models/player';
@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Input() field: Array<Cell>;
  @Input() isShipsVisible: boolean;
  @Output() sendReadyStatus = new EventEmitter<void>();
  letterAnnotation: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  numberAnnotation: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  player: Player = this.playerService.player;
  constructor(private playerService: PlayerService) { }
  ngOnInit() {
  }
  arrangeShips(): void {
    this.playerService.onArrangeShips();
    // this.sendReadyStatus.emit();
  }
}
