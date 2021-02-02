import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from '../app/clientesModule/clientes/clientes.component';
import { AbcclientesComponent } from '../app/clientesModule/abcclientes/abcclientes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent} from '../app/loginModule/login/login.component';
import { CrmhomeComponent} from '../app/crmModule/crmhome/crmhome.component';
import {AuthService} from '../app/services/auth.service';

import { LoginGuardGuard } from '../app/guards/login-guard.guard';
<<<<<<< HEAD
import { CrmusuariosComponent } from './crmModule/crmusuarios/crmusuarios.component';
=======
import { AsignacionModulosComponent } from './asignacion-modulos/asignacion-modulos.component';
>>>>>>> d7178bb29163603ed82561e2837df1f074897eb2

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: "full"},
  { path: 'login', component: LoginComponent, pathMatch: "full" },
  { path: 'home', component: HomeComponent, pathMatch: "full"},
  { path: 'clientes', component: ClientesComponent, pathMatch: "full" },
  { path: 'abcclientes', component: AbcclientesComponent, pathMatch: "full" },
  { path: 'crmhome', component: CrmhomeComponent, pathMatch: "full" },
<<<<<<< HEAD
  { path: 'crmusuarios', component: CrmusuariosComponent, pathMatch: "full" }
=======
  { path: 'asignacion-modulos', component: AsignacionModulosComponent, pathMatch:"full" }
>>>>>>> d7178bb29163603ed82561e2837df1f074897eb2
]


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { 

  public title = "";

}
