import { Component } from '@angular/core';
import { GameService } from './game.service';
import { GameCard } from './game-card/game-card.model';
import { faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';
import { GoalCard } from './goal-card/goal-card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'welcome-to';

  faCheck = faCheck;
  faRedo = faRedo;

  columnOne: GameCard[];
  columnTwo: GameCard[];
  goalCards: GoalCard[];

  constructor(private gameService: GameService) {
    this.gameService.deal();
    this.gameService.deal();
    this.columnOne = this.gameService.numberCards;
    this.columnTwo = this.gameService.typeCards;
    this.goalCards = this.gameService.goals;
  }

  flip() {
    this.gameService.deal();
    this.columnOne = this.gameService.numberCards;
    this.columnTwo = this.gameService.typeCards;
  }

  goalAccomplished(index: number) {
    console.log(`goal #${index} accomplished`);

    if (this.goalCards[index].progress === 'f') {
      this.goalCards[index].progress = 'b';
    } else if (this.goalCards[index].progress === 'b') {
      this.goalCards[index].progress = 'x';
    } else if (this.goalCards[index].progress === 'x') {
      this.goalCards[index].progress = 'f';
    }
  }
}
