import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GameStatusService } from './services/game-status.service';
import { GameStatus } from './components/game/models/game.status';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private gameStatusService: GameStatusService,
                private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const gameStatus: GameStatus = this.gameStatusService.getStatus();
        if (gameStatus >= GameStatus.default) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
