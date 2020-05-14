import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Neighbor } from './neighbor';
import { Table } from './table';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {


  socket: any;
  public neighbors = new BehaviorSubject<Neighbor[]>([]);
  public table = new BehaviorSubject<Table>(new Table());

  constructor() { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('game-state', (data: any) => {
      console.log(`game-state update: ${data}`);
      this.table.next(data);
    });

    this.socket.on('user-update', (data: any) => { this.neighbors.next(data); });
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

}
