import { Injectable } from '@angular/core';
import { GameCard } from './game-card/game-card.model';
import baseDeck from '../assets/cards.json';
import { GoalCard } from './goal-card/goal-card.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  deck: GameCard[];

  numberCards: GameCard[];
  typeCards: GameCard[];
  goals: GoalCard[];

  constructor() {
    this.shuffle();
    this.dealGoals();
  }

  dealGoals() {
    this.goals =  [this.drawGoalCard(), this.drawGoalCard(), this.drawGoalCard()]
  }

  deal() {
    if (this.deck.length <= 3) {
      this.shuffle();
    }

    this.typeCards = this.numberCards;

    this.numberCards = [this.drawCard(), this.drawCard(), this.drawCard()];
  }

  drawGoalCard(): GoalCard {
    const newGoal = new GoalCard();
    newGoal.accomplishedCount = 0;
    newGoal.index = Math.floor(Math.random() * 5) + 1;

    return newGoal;
  }

  drawCard(): GameCard {
    const randIndex = Math.floor(Math.random() * this.deck.length);
    const rand = this.deck[randIndex];
    this.deck.splice(randIndex, 1);
    return rand;
  }

  shuffle() {
    this.deck  = Object.assign([], baseDeck.cards);
  }
}
