import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Neighbor } from './neighbor';
import { Table } from './table';
import { GameInfo } from './game-info';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any;
  public gameInfo = new BehaviorSubject<GameInfo>(null);
  public neighbors = new BehaviorSubject<Neighbor[]>([]);
  public table = new BehaviorSubject<Table>(new Table());
  public errors = new BehaviorSubject<string>(null);
  public connected = new BehaviorSubject<boolean>(false);

  constructor() { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('error', (data: any) => {
      console.log(`Error: ${data}`);
      this.errors.next(data);
    });

    this.socket.on('game-confirmation', (data: any) => {
      this.connected.next(true);
      this.gameInfo.next(data);
    });

    this.socket.on('game-state', (data: any) => this.table.next(data));

    this.socket.on('user-update', (data: any) => this.neighbors.next(data));
  }

  createRoom(roomName: string, neighborhoodName: string) {
    this.socket.emit('create', roomName, neighborhoodName);
  }

  joinRoom(roomName: string, neighborhoodName: string) {
    this.socket.emit('join', roomName, neighborhoodName);
  }

  iAmReady(roomName: string, neighborhoodName: string) {
    this.socket.emit('ready', roomName, neighborhoodName);
  }

  strike(roomName: string, neighborhoodName: string) {
    this.socket.emit('strike', roomName, neighborhoodName);
  }

  goalAccomplished(index: number) {
    this.socket.emit('goal-accomplished', index);
  }

  leaveGame(neighborhoodName: string) {
    this.socket.emit('leave', neighborhoodName);
    this.connected.next(false);
  }

}
