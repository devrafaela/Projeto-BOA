import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StatusNivel } from './enum/statusNivel.enum';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameStateService } from '../../services/gameState/game-state.service';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor (private router: Router, private gameState: GameStateService) {}

  niveis = [
    { id: 1, nome: 'Nível 1', status: StatusNivel.NAO_INICIADO, imagem: '', bloqueado: false },
    { id: 2, nome: 'Nível 2', status: StatusNivel.NAO_INICIADO, imagem: '', bloqueado: true },
    { id: 3, nome: 'Nível 3', status: StatusNivel.NAO_INICIADO, imagem: '', bloqueado: true }
  ]

  ngOnInit(): void {
    this.atualizarNiveis();
    this.gameState.getFases();
  }

  atualizarNiveis(){
    for(let i = 0; i < this.niveis.length; i++){
      const nivel = this.niveis[i];
      const nivelAnterior = this.niveis[i -1];

      if(i === 0) {
        nivel.bloqueado = false;
        nivel.imagem = 'nivel-1-unlock'
        nivel.status = StatusNivel.NAO_INICIADO;
      } else {
        if(nivelAnterior.status === StatusNivel.CONCLUIDO) {
          nivel.bloqueado = false;
          nivel.imagem = `nivel-${nivel.id}-unlock`;
        } else {
          nivel.bloqueado = true;
          nivel.imagem = `nivel-${nivel.id}-lock`;
        }
      }
    }
  }

  concluirNivel(id: number) {
    const nivel = this.niveis.find(n => n.id === id);
    if (nivel) {
      nivel.status = StatusNivel.CONCLUIDO;
      this.atualizarNiveis();
    }
  }

  navigateInicio () {
     this.router.navigate(["inicio"])
  }

  irParaBusca(id: number, bloqueado: boolean) {
    if(id === 1 && !bloqueado){
      this.router.navigate(["bubble-nivel-um"]);
    }
  }
}
