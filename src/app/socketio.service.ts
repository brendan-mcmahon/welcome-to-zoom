import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
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
  public strikeSound = new Subject();
  public goalSound = new Subject();

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

    this.socket.on('strike-update', (_: any) => this.strikeSound.next());

    this.socket.on('goal-update', (_: any) => this.goalSound.next());
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

  undoReady(roomName: string, neighborhoodName: string) {
    this.socket.emit('undo-ready', roomName, neighborhoodName);
  }
  strike(roomName: string, neighborhoodName: string) {
    this.socket.emit('strike', roomName, neighborhoodName);
  }

  undoStrike(roomName: string, neighborhoodName: string) {
    console.log('undoing strike');
    this.socket.emit('undo-strike', roomName, neighborhoodName);
  }

  goalAccomplished(neighborhoodName: string, roomName: string, index: number, pointValue: number) {
    console.log(`got goal ${roomName}, ${index}`);
    this.socket.emit('goal-accomplished', neighborhoodName, roomName, index, pointValue);
  }

  leaveGame(neighborhoodName: string) {
    this.socket.emit('leave', neighborhoodName);
    this.connected.next(false);
  }

}
