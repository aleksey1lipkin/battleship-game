import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { FieldComponent } from './components/field/field.component';
import { CellComponent } from './components/cell/cell.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShipComponent } from './components/ship/ship.component';
import { PlayerComponent } from './components/player/player.component';
import { FleetComponent } from './components/fleet/fleet.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { GameService } from './services/game.service';
import { ArrangeShipsService } from './services/arrange-ships.service';
import { NumberToArrayPipe } from './pipes/number-to-array.pipe';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SortFleetPipe } from './components/fleet/sort-fleet.pipe';

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
  providers: [GameService, ArrangeShipsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
