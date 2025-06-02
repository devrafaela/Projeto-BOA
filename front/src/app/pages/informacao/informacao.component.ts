import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacao',
  imports: [CommonModule],
  templateUrl: './informacao.component.html',
  styleUrl: './informacao.component.scss'
})
export class InformacaoComponent {
  parteAtual = 0;

  constructor (private router: Router) {}
  informacoes = [
        {1: "Gidevaldo Novais dos Santos"}, 
        {2: "Álisson Natan dos Anjos Pinheiro "},
        {3: "Camille Rodrigues Costa "},
        {4: "Cleiton Galvão Santana "},
        {5: "Larissa Ribeiro Firminio "},
        {6: "Rafaela Pereira Santos (Scrum Master + Designer UX/UI)"},
        {7: "Samanta Souza Barros (Dev Frontend)"},
        {8: "Sanley Pires Ferreira (Analista de Qualidade - QA)"}, 
  ];

  proximaParte() {
    if(this.parteAtual < this.informacoes.length - 1){
      this.parteAtual++;
    }
  }

  parteAnterior() {
    if(this.parteAtual > 0) {
      this.parteAtual--;
    }
  }

  navigateInfo() {
    const rotaAtual = this.router.url;
    if(rotaAtual === '/inicio'){
    this.router.navigate(["informacao"])
    }else if (rotaAtual === '/informacao'){
    this.router.navigate(["inicio"])
    }
  }
}
