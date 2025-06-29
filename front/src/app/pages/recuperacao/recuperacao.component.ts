import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DefaultInputComponent } from '../../components/default-input/default-input.component';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { LoginService } from '../../services/login.service';

interface RecuperacaoForm {
  name: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
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
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })
  }

  submit(){
    this.loginService.cadastro(this.recuperacaoForm.value.name, this.recuperacaoForm.value.password).subscribe({
    next: () => {this.toastService.success("Recuperação realizado com sucesso!"), this.router.navigate(["/login"])},
      error: () => this.toastService.error("Erro ao tentar recuperar senha do usuário! Tente novamente.")
   


    })
  }

  navigate(){
    this.router.navigate(["/login"])
  }
}
