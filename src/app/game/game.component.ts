import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameCard } from '../game-card/game-card.model';
import { faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';
import { SocketioService } from '../socketio.service';
import { Router } from '@angular/router';
import { Neighbor } from '../neighbor';
import { Table } from '../table';
import { Howl } from 'howler';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game-flex.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  gameCode: string;
  neighborhoodName: string;
  faCheck = faCheck;
  faRedo = faRedo;
  accomplishedGoals = [false, false, false];
  stricken = false;
  ready = false;

  table: Table;
  neighbors: Neighbor[];

  constructor (
    private socketService: SocketioService,
    private router: Router) { }

  ngOnInit() {
    this.socketService.gameInfo.subscribe(gi => {
      if (gi) {
        this.gameCode = gi.gameCode;
        this.neighborhoodName = gi.neighborhoodName;

      } else {
        this.router.navigate(['/']);
      }
    });

    this.socketService.neighbors.subscribe(n => {
      if (n) {
        this.neighbors = n;
      } else {
        this.router.navigate(['/']);
      }
    });

    const flipSound = new Howl({
      src: ['../../assets/sounds/flip.wav']
    });
    const strikeSound = new Howl({
      src: ['../../assets/sounds/error.wav']
    });
    const goalSound = new Howl({
      src: ['../../assets/sounds/success.wav']
    });

    this.socketService.table.subscribe(d => {
      this.stricken = false;
      this.ready = false;
      this.table = d;

      flipSound.play();
    });

    this.socketService.strikeSound.subscribe(s => strikeSound.play());

    this.socketService.goalSound.subscribe(s => goalSound.play());
  }

  ngOnDestroy() {
    this.socketService.leaveGame(this.neighborhoodName);
  }

  iAmReady() {
    this.socketService.iAmReady(this.gameCode, this.neighborhoodName);
    this.ready = true;
  }

  goalAccomplished(index: number) {
    this.accomplishedGoals[index] = true;
    let pointValue;
    switch (this.table.goals[index].progress) {
      case 'f':
        pointValue = this.table.goals[index].first;
        break;
      case 'b':
        pointValue = this.table.goals[index].second;
        break;
      default:
        return;
    }
    this.socketService.goalAccomplished(this.neighborhoodName, this.gameCode, index, pointValue);
  }

  strike() {
    if (this.neighbors.filter(n => n.name === this.neighborhoodName)[0].strikeCount < 2) {
      this.socketService.strike(this.gameCode, this.neighborhoodName);
      console.log('strike');
      this.stricken = true;
    } else {
      console.log('game over!');
    }
  }

  unStrike() {
    if (this.neighbors.filter(n => n.name === this.neighborhoodName)[0].strikeCount > 0) {
      this.socketService.undoStrike(this.gameCode, this.neighborhoodName);
      console.log('undoing strike');
      this.stricken = false;
    }
  }

  unReady() {
    this.socketService.undoReady(this.gameCode, this.neighborhoodName);
    this.ready = false;
  }

  leaveGame() {
    this.socketService.leaveGame(this.neighborhoodName);
    this.router.navigate(['home']);
  }

  getNumber(index: number) {
    if (!this.table.left) { return '?'; }
    return this.table.left[index]?.number ?? '?';
  }

  getTypePath(column: GameCard[], index: number) {
    let typeName = 'QuestionMark';
    if (!column) { typeName = 'QuestionMark'; }
    else { typeName = column[index]?.type ? `${column[index].type}` : 'QuestionMark'; }
    return 'assets/icons/' + typeName + '.png';
  }

  getGoalCardPath(row: number) {
    if (!this.table.goals || !this.table.goals[row]) { return 'assets/icons/QuestionMark.png';}
    if (this.table.goals[row].progress === 'x') { return 'assets/icons/red-x.png'; }
    return `assets/goal-cards/${row + 1}-${this.table.goals[row].index}${this.table.goals[row].progress}.png`;

  }
}
