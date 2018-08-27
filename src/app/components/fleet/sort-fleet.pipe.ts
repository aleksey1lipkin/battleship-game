import { Pipe, PipeTransform } from '@angular/core';
import { Ship } from '../../models/ship/ship.model';

@Pipe({
    name: 'sortFleet'
})
export class SortFleetPipe implements PipeTransform {
    transform(fleet: Ship[], size: number): any {
        const fleetBySize: Ship[] = [];
        fleet.forEach(ship => {
            if (ship.size === size) {
                fleetBySize.push(ship);
            }
        });
        return fleetBySize;
    }
}
