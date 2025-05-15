import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultInputComponent } from '../../components/default-input/default-input.component';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface CadastroForm {
  name: FormControl,
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
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })
  }

  submit(){
    this.loginService.cadastro(this.cadastroForm.value.name, this.cadastroForm.value.password).subscribe({
    next: () => {this.toastService.success("Cadastro realizado com sucesso!"), this.router.navigate(["/login"])},
      error: () => this.toastService.error("Erro ao cadastrar usuário! Tente novamente.")
   


    })
  }

  navigate(){
    this.router.navigate(["/login"])
  }
}
