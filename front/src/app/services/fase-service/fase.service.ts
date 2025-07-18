import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaseService {
  apiUrl: string = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {}

  getFases(): Observable<any> {
    console.log("Entrou em getFases");
    return this.httpClient.get<any>(`${this.apiUrl}/fases/status`);
  }


}
