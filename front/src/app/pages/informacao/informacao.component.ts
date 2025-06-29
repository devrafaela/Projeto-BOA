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
  informacoes = 4;

  constructor (private router: Router) {}
 
  proximaParte() {
    if(this.parteAtual <= this.informacoes){
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
    if(rotaAtual === '/inicio' ){
    this.router.navigate(["informacao"])
    }else if (rotaAtual === '/informacao'){
    this.router.navigate(["inicio"])
    }
  }
}
