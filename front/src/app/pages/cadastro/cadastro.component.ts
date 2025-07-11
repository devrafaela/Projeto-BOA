import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultInputComponent } from '../../components/default-input/default-input.component';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { catchError, throwError } from 'rxjs';

interface CadastroForm {
  nickname: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-cadastro',
  imports: [LoginLayoutComponent, ReactiveFormsModule, DefaultInputComponent, MatIconModule],
  templateUrl: './cadastro.component.html',
  providers:[LoginService],
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  cadastroForm!: FormGroup<CadastroForm>;

  constructor(private router: Router, private loginService: LoginService, private toastService: ToastrService){
    this.cadastroForm = new FormGroup({
      nickname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })
  }

  submit(){
    this.loginService.cadastro(this.cadastroForm.value.nickname, this.cadastroForm.value.password).subscribe({
      next: () => {
        this.toastService.success("Cadastro realizado com sucesso!");
        this.router.navigate(["/login"]);
      },
      error: (erro) => {
        console.log("Erro", erro);
        let mensagem = "Erro ao cadastrar o usuário. Tente novamente!"
        if (erro.status === 409) {
          mensagem: "Já existe um usuário cadastrado com esse nickname.";
        }
        this.toastService.error(mensagem);
      }
    });
  }

  navigate(){
    this.router.navigate(["/login"])
  }
}
