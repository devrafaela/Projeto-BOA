import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:3000"

  constructor(private router: Router, private httpClient: HttpClient) {}
  
  login(name: string, password: string): Observable<any>{
    return this.httpClient.get<any[]>(this.apiUrl + "/users").pipe(
      map((usuarios) => {
        const usuario = usuarios.find(
          (u) => u.name === name && u.password === password
        );
        if(!usuario){
        throw new Error('Usuário ou senha inválidos');
        }
        return usuario;
      }),
      tap((usuario) => {
        sessionStorage.setItem("token", usuario.id)
        sessionStorage.setItem("username", usuario.name)
        this.router.navigate(['/home'])
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      }),
    )
  }

  cadastro(name: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/users", {name, password}).pipe(
        /*tap((usuario) => {
          sessionStorage.setItem("auth-token", usuario.token)
          sessionStorage.setItem("user-name", usuario.name)
        })*/
    )
  }

  logado(){
    return sessionStorage.getItem('token') ? true : false;
  }

  deslogar(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
    
}
