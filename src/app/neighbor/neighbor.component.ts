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
    return Array.from(Array(this.neighbor.strikeCount), (x, i) => i);
  }

  getEmptyStrikes() {
    return Array.from(Array(3 - this.neighbor.strikeCount), (x, i) => i);
  }

}
