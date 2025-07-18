import { Component, inject, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameStateService } from '../../services/gameState/game-state.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DicasBubbleComponent } from '../../components/dicas-bubble/dicas-bubble.component';
import { EnsinaBubbleComponent } from '../../components/ensina-bubble/ensina-bubble.component';
import { ModalOrdenacaoConcluidaComponent } from '../../components/modal-ordenacao-concluida/modal-ordenacao-concluida.component';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProgressoService } from '../../services/progresso/progresso.service';

@Component({
  selector: 'app-play',
  standalone: true,
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss'],
  imports: [CommonModule, FormsModule, MatTooltipModule],
})
export class BubbleComponent {
  userAnswer: number | null = null;
  started: boolean = false;
  feedback: 'correct' | 'wrong' | null = null;
  isFinished: boolean = false;
  currentPair: [number, number] = [0, 1];
  step: number = 1;
  errorMessage: string = '';
  quantidadeBox = [0,0,0,0,0];

  constructor(public gameState: GameStateService, private router: Router, private toastr: ToastrService, private progressoService: ProgressoService) {}
  get maxSteps () {
    return this.gameState.calculateMaxBubbleSortSteps(this.gameState.getArray().length);
  }

  get currentStep () {
    return this.gameState.getCurrentStep();
  }
  get atualSteps() {
  return this.gameState.getTotalSteps();
}
  get array() {
    return this.gameState.getArray();
  }

  get currentIndex() {
    return this.gameState.getCurrentIndex();
  }
  /*ngOnInit(): void {
    this.start(); // inicia automaticamente ao carregar
  }*/

  iniciarGame () {
     this.start();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isFinished'] && changes['isFinished'].currentValue === true) {
      this.showOrdenacaoConcluida();
    }
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
    if (result === null) {
      const msg = this.gameState.getErrorMessage();
      this.toastr.error(msg, 'Entrada inválida');
      return;
    }
    if (!result.correct) {
      this.feedback = 'wrong';
      this.toastr.error(result.errorMessage!, 'Resposta incorreta');
      return;
    }

    //this.feedback = result.correct ? 'correct' : 'wrong';
    this.feedback = 'correct';

    if (result.correct) {
      if (this.gameState.isSorted()) {
        this.isFinished = true;
        this.showOrdenacaoConcluida();
      }
      this.step++;
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
    this.gameState.restartCurrentStep();
    this.gameState.startGame();
    this.updateCurrentPair();
    //this.progressoService.iniciarFase(this.faseId).subscribe();
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

  showExplication () {
    const dialogRef = this.dialog.open(EnsinaBubbleComponent, {
      width: '800px',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {
       console.log(`Dialog result: ${result}`);
   });
  }

  showOrdenacaoConcluida () {
    const dialogRef = this.dialog.open(ModalOrdenacaoConcluidaComponent, {
      height: '700px',
      width: '1000px',
      maxHeight: '90vh',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-rounded',
      data: {
        arrayOrdenado: this.gameState.getArray(),
        totalPassos: this.gameState.getCurrentStep(),
    }
    });

    dialogRef.afterClosed().subscribe(result => {
       console.log(`Dialog result: ${result}`);
   });
  }

  updateCurrentPair () {
    this.currentPair = [
      this.gameState.getCurrentIndex(),
      this.gameState.getCurrentIndex() + 1,
    ];
  }

  navigateHome () {
    this.router.navigate(["home"]);
    console.log(sessionStorage.getItem('token'));
  }
}