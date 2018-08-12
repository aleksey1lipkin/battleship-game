import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from './cell.model';

@Component({
    selector: 'app-cell',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
    @Input() cell: Cell;
    @Output() changeCellStatus = new EventEmitter<Cell>();
    constructor() {}

    ngOnInit() {}
    handleClick() {
      this.changeCellStatus.emit(this.cell);
    }
}
