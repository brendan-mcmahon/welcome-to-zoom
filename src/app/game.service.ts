import { Injectable } from '@angular/core';
import { GameCard } from './game-card/game-card.model';
import baseDeck from '../assets/cards.json';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  deck: GameCard[];

  numberCards: GameCard[];
  typeCards: GameCard[];

  constructor() {
    this.shuffle();
  }

  deal() {
    if (this.deck.length <= 3) {
      this.shuffle();
    }

    this.typeCards = this.numberCards;

    this.numberCards = [this.drawCard(), this.drawCard(), this.drawCard()];

    // console.log(`${this.deck.length} cards remaining`);
  }

  drawCard(): GameCard {
    const randIndex = Math.floor(Math.random() * this.deck.length);
    const rand = this.deck[randIndex];
    this.deck.splice(randIndex, 1);
    return rand;
  }

  shuffle() {
    console.log('shuffling...');
    console.log(baseDeck.cards.length);

    this.deck  = Object.assign([], baseDeck.cards);

    // this.deck = baseDeck.cards;
  }
}
