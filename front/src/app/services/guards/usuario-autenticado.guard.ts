import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate{
    constructor(
      private loginService: LoginService,
      private router: Router) { }
    canActivate(){
      if (this.loginService.logado()) {
        return true;
      }
      this.router.navigate(['login']);
      return false;
    }
}
