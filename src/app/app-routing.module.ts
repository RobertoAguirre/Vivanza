import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from '../app/clientesModule/clientes/clientes.component';
import { AbcclientesComponent } from '../app/clientesModule/abcclientes/abcclientes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent} from '../app/loginModule/login/login.component';
import { CrmhomeComponent} from '../app/crmModule/crmhome/crmhome.component';
import {AuthService} from '../app/services/auth.service';

import { LoginGuardGuard } from '../app/guards/login-guard.guard';
import { CrmusuariosComponent } from './crmModule/crmusuarios/crmusuarios.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: "full"},
  { path: 'login', component: LoginComponent, pathMatch: "full" },
  { path: 'home', component: HomeComponent, pathMatch: "full"},
  { path: 'clientes', component: ClientesComponent, pathMatch: "full" },
  { path: 'abcclientes', component: AbcclientesComponent, pathMatch: "full" },
  { path: 'crmhome', component: CrmhomeComponent, pathMatch: "full" },
  { path: 'crmusuarios', component: CrmusuariosComponent, pathMatch: "full" }
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
