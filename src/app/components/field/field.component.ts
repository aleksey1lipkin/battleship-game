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
  cells: Array<Array<Cell>>;
  letterAnnotation: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  numberAnnotation: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  constructor() { }

  ngOnInit() {
    this.init();
  }
  init(): void {
    // tslint:disable-next-line: prefer-const
    let cells: Array<Array<Cell>> = [];

    for (let i = 0; i < this.size; i++) {
      cells[i] = [];
      for (let j = 0; j < this.size; j++) {
        cells[i][j] = new Cell(i, j, CellStatus.default);
      }
    }
    this.cells = cells;
  }
  onChangeCellStatus(cell: Cell): void {
    this.cells.forEach(row => {
      row.forEach(elem => {
        if (elem.x === cell.x && elem.y === cell.y) {
          switch (cell.status) {
            case 0:
              elem.status = CellStatus.miss;
              break;
            case 1:
              elem.status = CellStatus.hit;
              break;
            default:
              elem.status = CellStatus.default;
              break;
          }
        }
      });
    });
  }
}
