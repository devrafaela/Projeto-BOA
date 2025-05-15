import { CanActivateFn } from '@angular/router';

export const usuarioNaoAutenticadoGuard: CanActivateFn = (route, state) => {
  return true;
};

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioNaoAutenticadoGuard implements CanActivate{
    constructor(
      private loginService: LoginService,
      private router: Router) { }
    canActivate(){
      if (this.loginService.logado()) {
        this.router.navigate(['']);
        return false;
      }
      return true;
    }
}
