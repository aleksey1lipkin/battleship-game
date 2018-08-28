import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { FieldComponent } from './components/field/field.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PlayerComponent } from './components/player/player.component';
import { StatusBarComponent } from './components/game/status-bar/status-bar.component';
import { GameService } from './services/game.service';
import { ArrangeShipsService } from './services/arrange-ships.service';
import { NumberToArrayPipe } from './components/player/fleet/ship/number-to-array.pipe';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CellComponent } from './components/field/cell/cell.component';
import { FleetComponent } from './components/player/fleet/fleet.component';
import { SortFleetPipe } from './components/player/fleet/sort-fleet.pipe';
import { ShipComponent } from './components/player/fleet/ship/ship.component';
import { LoginGuard } from './login-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    FieldComponent,
    CellComponent,
    HeaderComponent,
    FooterComponent,
    ShipComponent,
    PlayerComponent,
    FleetComponent,
    NumberToArrayPipe,
    StatusBarComponent,
    HomeComponent,
    SortFleetPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [GameService, ArrangeShipsService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
