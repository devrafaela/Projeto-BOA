import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GetDadosService } from '../../services/get-dados.service';

@Component({
  selector: 'app-home',
  imports: [MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
