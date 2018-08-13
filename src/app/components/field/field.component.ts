import { Component, OnInit } from '@angular/core';
import { Cell } from '../cell/cell.model';
import { CellStatus } from '../cell/cell.status';
@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  size = 10;
  cells: Array<Cell>;
  letterAnnotation: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  numberAnnotation: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  constructor() { }

  ngOnInit() {
    this.init();
  }
  init(): void {
    // tslint:disable-next-line: prefer-const
    let cells: Array<Cell> = [];
    const cellCounter = Math.pow(this.size, 2);
    let x = 0;
    let y = 0;
    for (let i = 0; i < cellCounter; i++) {
      if ( i !== 0 && i % 10 === 0 ) {
        x++;
        y = 0;
      }
      cells[i] = new Cell(x, y, CellStatus.default);
      y++;
    }
    this.cells = cells;
  }
  onChangeCellStatus(cell: Cell): void {
    this.cells.forEach(item => {
        if (item.x === cell.x && item.y === cell.y) {
          switch (cell.status) {
            case 0:
              item.status = CellStatus.miss;
              break;
            case 1:
              item.status = CellStatus.hit;
              break;
            default:
              item.status = CellStatus.default;
              break;
          }
        }
    });
  }
}
