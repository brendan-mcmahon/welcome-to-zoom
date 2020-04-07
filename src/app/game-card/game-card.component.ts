import { Component, OnInit, Input } from '@angular/core';
import { GameCard } from './game-card.model';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {

  @Input() model: GameCard;

  displayNumber = true;

  constructor() { }

  ngOnInit() {
  }

}
