import { GameCard } from './game-card/game-card.model';
import { GoalCard } from './goal-card/goal-card.model';

export class Table {
  left: GameCard[] = [];
  right: GameCard[] = [];
  goals: GoalCard[] = [];
}
