import { Component } from '@angular/core';
import { GameService } from './game.service';
import { GameCard } from './game-card/game-card.model';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'welcome-to';

  faCoffee = faCoffee;
  columnOne: GameCard[];
  columnTwo: GameCard[];

  constructor(private gameService: GameService) {
    this.gameService.deal();
    this.gameService.deal();
    this.columnOne = this.gameService.numberCards;
    this.columnTwo = this.gameService.typeCards;
  }

  flip() {
    this.gameService.deal();
    this.columnOne = this.gameService.numberCards;
    this.columnTwo = this.gameService.typeCards;
    console.log(`${this.gameService.deck.length} cards remaining`);

  }
}
