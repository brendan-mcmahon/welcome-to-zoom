import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  gameCode: string;
  neighborhoodName: string;
  showJoinDialog = false;
  showCreateDialog = false;

  ngOnInit(): void {
  }

  createGame() {
    this.router.navigate([`/game/${this.neighborhoodName}`]);
  }

  goToGame() {
    this.router.navigate([`/game/${this.neighborhoodName}/${this.gameCode}`]);
  }

}
