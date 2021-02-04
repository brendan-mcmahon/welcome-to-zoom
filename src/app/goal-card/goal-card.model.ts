export class GoalCard {
  accomplishedCount = 0;
  index: number;
  progress = 'f';
  first: number;
  second: number;
  sets: GoalSet[];
}

export class GoalSet {
  houseCount: number;
  setCount: number;
}
