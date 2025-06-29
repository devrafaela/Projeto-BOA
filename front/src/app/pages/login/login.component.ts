import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultInputComponent } from '../../components/default-input/default-input.component';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface LoginForm {
  name: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  imports: [LoginLayoutComponent, ReactiveFormsModule, DefaultInputComponent, MatIconModule],
  templateUrl: './login.component.html',
  providers:[LoginService],
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(private router: Router, private loginService: LoginService, private toastService: ToastrService){
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  submit(){
    this.loginService.login(this.loginForm.value.name, this.loginForm.value.password).subscribe({
      next: () => this.toastService.success("Login realizado com sucesso!"),
      error: () => this.toastService.error("Usuário ou senha inválidos! Tente novamente.")

    })
  }

  navigate(){
    this.router.navigate(["inicio"])
  }
}
