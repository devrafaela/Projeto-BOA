import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameStateService } from '../../services/gameState/game-state.service';
import { ProgressoService } from '../../services/progresso/progresso.service';

@Component({
  selector: 'app-modal-ordenacao-concluida',
  imports: [MatButtonModule, MatDialogModule, CommonModule],
  templateUrl: './modal-ordenacao-concluida.component.html',
  styleUrl: './modal-ordenacao-concluida.component.scss'
})
export class ModalOrdenacaoConcluidaComponent {
  steps = 10;
  array = [1,2,3,4,5];
  constructor(
    private router: Router,
    private gameState: GameStateService,
    private dialogRef: MatDialogRef<ModalOrdenacaoConcluidaComponent>,
    private progressoService: ProgressoService,
    @Inject(MAT_DIALOG_DATA) public data: { arrayOrdenado: number[]; totalPassos: number }
  ) {}



  continuar () {
    this.dialogRef.close();
    this.router.navigate(['home']);
  }
  
  reiniciar() {
    this.dialogRef.close();
    // Reinicia o jogo e navega
    this.gameState.restartCurrentStep();
    this.gameState.startGame();
  }

}
