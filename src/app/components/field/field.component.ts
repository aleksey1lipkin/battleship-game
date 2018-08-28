import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Cell } from './cell/models/cell.model';
@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  @Output() handleClick = new EventEmitter<Cell>();
  @Input() field: Array<Cell>;
  @Input() isShipsVisible: boolean;
  letterAnnotation: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  numberAnnotation: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  constructor() { }
  ngOnInit() {
  }
  onClick(cell: Cell): void {
    this.handleClick.emit(cell);
  }
}
