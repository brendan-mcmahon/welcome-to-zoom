import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameCardComponent } from './game-card/game-card.component';
import { GoalCardComponent } from './goal-card/goal-card.component';
import { SocketioService } from './socketio.service';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { NeighborComponent } from './neighbor/neighbor.component';

@NgModule({
  declarations: [
    AppComponent,
    GameCardComponent,
    GoalCardComponent,
    GameComponent,
    HomeComponent,
    NeighborComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
