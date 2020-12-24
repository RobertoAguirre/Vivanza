import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from '../app/clientesModule/clientes/clientes.component';
import { AbcclientesComponent } from '../app/clientesModule/abcclientes/abcclientes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent} from '../app/loginModule/login/login.component';
import {AuthService} from '../app/services/auth.service';

import { LoginGuardGuard } from '../app/guards/login-guard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: "full",canActivate: [LoginGuardGuard] },
  { path: 'login', component: LoginComponent, pathMatch: "full" },
  { path: 'home', component: HomeComponent, pathMatch: "full", canActivate: [LoginGuardGuard]},
  { path: 'clientes', component: ClientesComponent, pathMatch: "full" },
  { path: 'abcclientes', component: AbcclientesComponent, pathMatch: "full" }
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
