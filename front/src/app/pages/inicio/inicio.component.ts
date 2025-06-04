import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  constructor(private router: Router){}

  navigateLogin(){
    this.router.navigate(["login"])
  }

  navigateTutorial(){
    console.log("Iniciar tutorial...")
  }

  navigateSair(){
    console.log("Saindo...")
  }

  navigateInfo(){
    const rotaAtual = this.router.url;
    if(rotaAtual === '/inicio'){
    this.router.navigate(["informacao"])
    }else if (rotaAtual === '/informacao'){
    this.router.navigate(["inicio"])
    }
  }

}
