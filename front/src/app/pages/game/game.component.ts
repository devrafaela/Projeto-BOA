import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameStateService } from '../../services/gameState/game-state.service';

@Component({
  selector: 'app-play',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class GameComponent {
  userAnswer: number | null = null;
  started: boolean = false;
  feedback: 'correct' | 'wrong' | null = null;
  isFinished: boolean = false;
  currentPair: [number, number] = [0, 1];
  step: number = 1;
  maxSteps: number = 10;

  constructor(public gameState: GameStateService) {}

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

  showHint() {
    alert(
      'Compare os dois números. Se o da esquerda for maior, ele troca com o da direita.'
    );
  }

  updateCurrentPair() {
    this.currentPair = [
      this.gameState.getCurrentIndex(),
      this.gameState.getCurrentIndex() + 1,
    ];
  }
}
