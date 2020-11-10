import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketioService } from '../socketio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private socketService: SocketioService) { }

  gameCode: string;
  neighborhoodName: string;
  showJoinDialog = false;
  showCreateDialog = false;

  ngOnInit(): void {

    this.socketService.errors.subscribe(e => {
      if (e) {
        alert(`Error: ${e}`);
        this.socketService.errors.next(null);
      }
      console.log('subscribed');
    });

    this.socketService.connected.subscribe(c => { if (c) { this.router.navigate(['/game']); }});
  }

  toggleCreateDialog() {
    console.log('button clicked');
    this.showJoinDialog = false;
    this.showCreateDialog = true;
  }

  toggleJoinDialog() {
    this.showJoinDialog = true;
    this.showCreateDialog = false;
  }

  createGame() {
    console.log('created game');
    this.gameCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.socketService.createRoom(this.gameCode, this.neighborhoodName);
  }

  goToGame() {
    this.socketService.joinRoom(this.gameCode, this.neighborhoodName);
  }

}
