import { Injectable } from '@angular/core';
import { Cell } from '../models/cell/cell.model';

@Injectable({
  providedIn: 'root'
})
export class GetCellNeighborsService {

  constructor() { }
  getCellNeighbors = (x: number, y: number, field: Array<Cell>) => {
    const result: Array<Cell> = [];
    const neighbors: Array<Array<number>> = [
        [x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
        [x, y - 1],     [x, y],     [x, y + 1],
        [x + 1, y - 1], [x + 1, y], [x + 1, y + 1],
    ];
    field.forEach(elem => {
        neighbors.forEach(item => {
            if (elem.x === item[0] && elem.y === item[1]) {
                result.push(elem);
            }
        });
    });
    return result;
}
}
