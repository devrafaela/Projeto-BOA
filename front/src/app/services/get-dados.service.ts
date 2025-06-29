import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDadosService{
  apiUrl: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}


}
