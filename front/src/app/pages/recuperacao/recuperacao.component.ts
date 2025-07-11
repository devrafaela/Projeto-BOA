import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DefaultInputComponent } from '../../components/default-input/default-input.component';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { LoginService } from '../../services/login.service';
import { catchError, switchMap, throwError } from 'rxjs';

interface RecuperacaoForm {
  nickname: FormControl,
  novaSenha: FormControl,
  confirmaNovaSenha: FormControl
}

@Component({
  selector: 'app-cadastro',
  imports: [LoginLayoutComponent, ReactiveFormsModule, DefaultInputComponent, MatIconModule],
  templateUrl: './recuperacao.component.html',
  providers:[LoginService],
  styleUrl: './recuperacao.component.scss'
})
export class RecuperacaoComponent {
  recuperacaoForm!: FormGroup<RecuperacaoForm>;

  constructor(private router: Router, private loginService: LoginService, private toastService: ToastrService){
    this.recuperacaoForm = new FormGroup({
      nickname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      novaSenha: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmaNovaSenha: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })
  }

   recuperarSenha(): void {
    if (this.recuperacaoForm.invalid) return;

    const nickname = this.recuperacaoForm.value.nickname;
    const novaSenha = this.recuperacaoForm.value.novaSenha;
    const confirmaNovaSenha = this.recuperacaoForm.value.confirmaNovaSenha;

    if (novaSenha !== confirmaNovaSenha) {
      this.toastService.error('As senhas não coincidem!')
      return;
    }

    this.loginService.buscarPorNickname(nickname).pipe(
      switchMap(usuario => {
        return this.loginService.recuperacao(usuario.id, novaSenha);
      }),
      catchError(err => {
        this.toastService.error('Erro ao recuperar senha:' + (err.error.erro || 'Tente Novamente!'))
        return throwError(() => err);
      })
    ).subscribe(() => {
      this.toastService.success('Senha atualizada com sucesso!');
      this.router.navigate(["/login"]);
    });
  }

  navigate() {
    this.router.navigate(['login']);
  }
}
