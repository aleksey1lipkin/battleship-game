import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from './models/cell.model';

@Component({
    selector: 'app-cell',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
    @Input() cell: Cell;
    @Input() isShipsVisible: boolean;
    constructor() {}

    ngOnInit() {}
    handleClick() {}
}
