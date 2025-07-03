import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  imports: [CommonModule],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.scss'
})
export class TutorialComponent {
  parteAtual = 0;
  informacoes = 5;

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
    if(rotaAtual === '/tutorial' ){
    this.router.navigate(["inicio"])
    }
  }

  navigateLogin() {
    this.router.navigate(["login"])
  }
}
