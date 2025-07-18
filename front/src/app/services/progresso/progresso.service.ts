import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Nivel } from '../../pages/home-niveis/enum/nivel.enum';

@Injectable({
  providedIn: 'root',
})
export class ProgressoService {
  apiUrl: string = "http://localhost:8080";
  constructor (private router: Router, private httpClient: HttpClient) {}
  
  iniciarFase(nivel: any) {
    return this.httpClient.post(this.apiUrl + '/progresso', {
      faseId: nivel.id,
      status: nivel.status !== 'Concluído' ? "Em andamento" : "Concluído"
    });
  }

  finalizarFase(faseId: number) {
    return this.httpClient.post(this.apiUrl + '/progresso/finalizar', { id: faseId });
  }

}