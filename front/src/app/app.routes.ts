import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { UsuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';
import { UsuarioNaoAutenticadoGuard } from './services/guards/usuario-nao-autenticado.guard';
import { HomeComponent } from './pages/home/home.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { InicioComponent } from './pages/inicio/inicio.component';

export const routes: Routes = [

    {
        path: "inicio",
        component: InicioComponent,
        canActivate: [UsuarioNaoAutenticadoGuard]

    },

    {
        path: "login",
        component: LoginComponent,
        canActivate: [UsuarioNaoAutenticadoGuard]

    },

    {
        path: "cadastro",
        component: CadastroComponent,
        canActivate: [UsuarioNaoAutenticadoGuard]
    },
    {
        path: "",
        component: MainLayoutComponent,
        canActivate: [UsuarioAutenticadoGuard],
        children: [
            {
                path:"home",
                component: HomeComponent
            },
        ]
    },

];