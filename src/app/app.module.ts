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

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    FieldComponent,
    CellComponent,
    HeaderComponent,
    FooterComponent,
    ShipComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
