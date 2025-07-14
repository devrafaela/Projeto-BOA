import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-ordenacao-concluida',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './modal-ordenacao-concluida.component.html',
  styleUrl: './modal-ordenacao-concluida.component.scss'
})
export class ModalOrdenacaoConcluidaComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<ModalOrdenacaoConcluidaComponent>
  ) {}

  continuar() {
    this.dialogRef.close(false);
    //console.log("Clique no botão próximo")
  }

  navigate() {
    this.dialogRef.close();
    //this.router.navigate(['home']);
    //console.log("Cique no botão Reiniciar")
  }

}
