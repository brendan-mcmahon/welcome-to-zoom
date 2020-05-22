import { Component } from '@angular/core';
import { SocketioService } from './socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'welcome-to';

  constructor(private socketService: SocketioService) {
    this.socketService.setupSocketConnection();
  }
}
