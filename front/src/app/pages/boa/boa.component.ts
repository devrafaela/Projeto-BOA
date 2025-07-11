import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boa',
  imports: [],
  templateUrl: './boa.component.html',
  styleUrl: './boa.component.scss'
})
export class BoaComponent {
  constructor(private router: Router){}

  navigateInicio(){
     this.router.navigate(["inicio"])
  }
}
