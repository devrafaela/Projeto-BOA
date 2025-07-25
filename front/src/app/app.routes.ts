import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { UsuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';
import { UsuarioNaoAutenticadoGuard } from './services/guards/usuario-nao-autenticado.guard';
import { HomeComponent } from './pages/home-niveis/home.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RecuperacaoComponent } from './pages/recuperacao/recuperacao.component';
import { InformacaoComponent } from './pages/informacao/informacao.component';
import { BubbleComponent } from './pages/bubble/bubble.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';
import { BoaComponent } from './pages/boa/boa.component';

export const routes: Routes = [
    { path: '', redirectTo: 'boa', pathMatch: 'full' },
    {
        path: "boa",
        component: BoaComponent,
    },

    {
        path: "inicio",
        component: InicioComponent,
    },

    {   
        path: "login",
        component: LoginComponent,
    },
    {
        path: "cadastro",
        component: CadastroComponent,
    },
    {
        path: "recuperacao",
        component: RecuperacaoComponent,
    },
    {
        path: "informacao",
        component: InformacaoComponent,
    },
     {
        path: "tutorial",
        component: TutorialComponent,
    },
    {
        path: "home",
        component: HomeComponent,
        canActivate: [UsuarioAutenticadoGuard],
        /*children: [
            {
                path:"bubble-nivel-um",
                component: BubbleComponent
            },
        ]*/
    },
    {
        path:"bubble-nivel-um",
        component: BubbleComponent,
        canActivate: [UsuarioAutenticadoGuard],
    },
];