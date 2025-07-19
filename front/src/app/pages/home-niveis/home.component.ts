import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StatusNivel } from './enum/statusNivel.enum';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { GameStateService } from '../../services/gameState/game-state.service';
import { FaseService } from '../../services/fase-service/fase.service';
import { ProgressoService } from '../../services/progresso/progresso.service';
import { filter, Subscription } from 'rxjs';
import {  OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-home',
  imports: [MatIconModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor (private router: Router, private gameState: GameStateService, private faseService: FaseService, private progressoService: ProgressoService) {}

  niveis: any[] = [];
  routerSubscription!: Subscription;

  getImagemNivel(fase: any): string {
    let nivel = '';
    if (fase.nome === 'Nível 1') nivel = '1';
    else if (fase.nome === 'Nível 2') nivel = '2';
    else if (fase.nome === 'Nível 3') nivel = '3';
    else nivel = 'x'; // fallback

    return fase.bloqueado ? `nivel-${nivel}-lock` : `nivel-${nivel}-unlock`;
  }

  ngOnInit(): void {
    console.log("Testando...")
    //this.atualizarNiveis();
    this.faseService.getFases().subscribe(fases => {
    this.niveis = fases.map((fase: any) => ({
      id: fase.id,
      nome: fase.nome,
      status: fase.status || StatusNivel.NAO_INICIADO,
      imagem: this.getImagemNivel(fase),
      bloqueado: fase.bloqueado
    }))

    this.routerSubscription = this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.faseService.getFases().subscribe(fases => {
        this.niveis = fases.map((fase: any) => ({
          id: fase.id,
          nome: fase.nome,
          status: fase.status || StatusNivel.NAO_INICIADO,
          imagem: this.getImagemNivel(fase),
          bloqueado: fase.bloqueado
        }));
      });
    // this.fases = fases; // se quiser salvar no componente
  });
  });
  }

 ngOnDestroy(): void {
    // Cancela a inscrição para evitar memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  /*atualizarNiveis(){
    this.niveis = this.niveis.map(nivel => ({
    ...nivel,
    imagem: this.getImagemNivel(nivel)
  }));
  }*/

  concluirNivel(id: number) {
    const nivel = this.niveis.find(n => n.id === id);
    if (nivel) {
      nivel.status = StatusNivel.CONCLUIDO;
      //this.atualizarNiveis();
    }
  }

  navigateInicio () {
     this.router.navigate(["inicio"])
  }

  /*irParaBusca(id: number, bloqueado: boolean) {
    if(id === 1 && !bloqueado){
      this.router.navigate(["bubble-nivel-um"]);
    }
  }*/

  irParaBusca(nivel: any) {
    if (nivel.bloqueado !== true) {
       this.gameState.setFaseAtual(nivel);
      this.progressoService.iniciarFase(nivel).subscribe(() => {
        if (nivel.id === 3) this.router.navigate(['bubble-nivel-um']);
        // Adapte para outros níveis
      });
    }
  }
}
