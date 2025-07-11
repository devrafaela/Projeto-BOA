import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export interface Usuario {
  id: number;
  nickname: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8080"

  constructor(private router: Router, private httpClient: HttpClient) {}
  login(nickname: string, senha: string): Observable<any> {
  return this.httpClient.post<any>(this.apiUrl + "/auth/login", {
      nickname,
      senha
    }).pipe(
      tap((resposta) => {
        sessionStorage.setItem("token", resposta.token);
        sessionStorage.setItem("usernickname", nickname);
        this.router.navigate(['/home']);
      }),
      catchError((error) => {
        return throwError(() => new Error(error.error || 'Usuário ou senha inválidos'));
      })
    );
  }

  cadastro(nickname: string, senha: string, tipo: string = "usuario"){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/usuarios", {nickname, senha, tipo}).pipe(
        tap((usuario) => {
          sessionStorage.setItem("auth-token", usuario.token)
          sessionStorage.setItem("nickame", usuario.nickname)
        }),
        catchError((error) => {
        return throwError(() => new Error(error.message));
      }),
    )
  }

  buscarPorNickname(nickname: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.apiUrl}/usuarios/nickname/${nickname}`);
  }

  recuperacao(id: number, novaSenha: string): Observable<any> {
    console.log("recuperacao", id, novaSenha)
    return this.httpClient.put(`${this.apiUrl}/usuarios/recuperar-senha/${id}`, { senha: novaSenha });
  }

  logado(){
    return sessionStorage.getItem('token') ? true : false;
  }

  deslogar(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
    
}
