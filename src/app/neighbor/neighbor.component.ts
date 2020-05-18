import { Component, OnInit, Input } from '@angular/core';
import { Neighbor } from '../neighbor';

@Component({
  selector: 'app-neighbor',
  templateUrl: './neighbor.component.html',
  styleUrls: ['./neighbor.component.css']
})
export class NeighborComponent implements OnInit {

  @Input() neighbor: Neighbor;

  constructor() { }

  ngOnInit(): void {
  }

  getStrikes() {
    if (this.neighbor.strikeCount < 3) {
      return Array.from(Array(this.neighbor.strikeCount), (x, i) => i);
    }
    return [true, true, true];
  }

  getEmptyStrikes() {
    if (this.neighbor.strikeCount < 3) {
      return Array.from(Array(3 - this.neighbor.strikeCount), (x, i) => i);
    }
  }

}
