import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameStateService } from '../../services/gameState/game-state.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DicasBubbleComponent } from '../../components/dicas-bubble/dicas-bubble.component';
import { EnsinaBubbleComponent } from '../../components/ensina-bubble/ensina-bubble.component';

@Component({
  selector: 'app-play',
  standalone: true,
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class BubbleComponent {
  userAnswer: number | null = null;
  started: boolean = false;
  feedback: 'correct' | 'wrong' | null = null;
  isFinished: boolean = false;
  currentPair: [number, number] = [0, 1];
  step: number = 1;
  maxSteps: number = 10;

  constructor(public gameState: GameStateService, private router: Router) {}

  get array() {
    return this.gameState.getArray();
  }

  get currentIndex() {
    return this.gameState.getCurrentIndex();
  }
  ngOnInit(): void {
    this.start(); // inicia automaticamente ao carregar
  }

  start() {
    this.started = true;
    this.isFinished = false;
    this.step = 1;
    this.userAnswer = null;
    this.feedback = null;
    this.gameState.startGame();
    this.updateCurrentPair();
  }

  checkAnswer() {
    if (this.userAnswer === null || this.isFinished) return;

    const result = this.gameState.checkAnswer(this.userAnswer);
    this.feedback = result.correct ? 'correct' : 'wrong';

    if (result.correct) {
      this.step++;
      if (this.gameState.isSorted()) {
        this.isFinished = true;
      }
    }

    setTimeout(() => {
      this.feedback = null;
    }, 1000);

    this.userAnswer = null;
    this.updateCurrentPair();
  }

  restart() {
    this.started = true;
    this.isFinished = false;
    this.feedback = null;
    this.userAnswer = null;
    this.gameState.startGame();
    this.updateCurrentPair();
  }

 
  readonly dialog = inject(MatDialog);
  showHint() {
    const dialogRef = this.dialog.open(DicasBubbleComponent, {
      width: '800px',
      panelClass: 'custom-dialog-container',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
       console.log(`Dialog result: ${result}`);
   });
  }

  showExplication() {
    const dialogRef = this.dialog.open(EnsinaBubbleComponent, {
      width: '900px',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {
       console.log(`Dialog result: ${result}`);
   });
  }

  updateCurrentPair() {
    this.currentPair = [
      this.gameState.getCurrentIndex(),
      this.gameState.getCurrentIndex() + 1,
    ];
  }

  navigateHome () {
    this.router.navigate(["home"])
 }
}