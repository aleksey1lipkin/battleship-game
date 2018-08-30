import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { FieldComponent } from './components/field/field.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PlayerComponent } from './components/player/player.component';
import { HomeComponent } from './components/home/home.component';
import { CellComponent } from './components/field/cell/cell.component';
import { FleetComponent } from './components/player/fleet/fleet.component';
import { ShipComponent } from './components/player/fleet/ship/ship.component';
import { StatusBarComponent } from './components/header/status-bar/status-bar.component';
import { GameService } from './services/game.service';
import { ArrangeShipsService } from './services/arrange-ships.service';
import { LoginGuard } from './login-guard.service';
import { SortFleetPipe } from './components/player/fleet/sort-fleet.pipe';
import { NumberToArrayPipe } from './components/player/fleet/ship/number-to-array.pipe';
import { ModifyStatusPipe } from './components/header/status-bar/modify-status.pipe';
import { SettingsService } from './services/settings.service';

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
    SortFleetPipe,
    ModifyStatusPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [GameService, ArrangeShipsService, LoginGuard, SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
