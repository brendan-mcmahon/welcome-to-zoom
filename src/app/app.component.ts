import { Component } from '@angular/core';
import { SocketioService } from './socketio.service';
import * as NoSleep from 'nosleep.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'welcome-to';
  noSleep: any;

  constructor(private socketService: SocketioService) {
    window.ontouchstart = (e) => {
      if (!this.noSleep || !this.noSleep.enabled){
        if (!this.noSleep) this.noSleep = new NoSleep.default();
        this.noSleep.enable();
1      }
    }
    this.socketService.setupSocketConnection();
  }
}
