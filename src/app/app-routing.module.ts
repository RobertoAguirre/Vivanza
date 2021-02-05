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
import { AsignacionModulosComponent } from './asignacion-modulos/asignacion-modulos.component';
import { CrmeditarusuariosComponent } from './crmModule/crmeditarusuarios/crmeditarusuarios.component';
import { CrmcanalesComponent } from './crmModule/crmcanales/crmcanales.component';
import { CrmeditarcanalComponent } from './crmModule/crmeditarcanal/crmeditarcanal.component';
import { CrmmediosComponent } from './crmModule/crmmedios/crmmedios.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: "full"},
  { path: 'login', component: LoginComponent, pathMatch: "full" },
  { path: 'home', component: HomeComponent, pathMatch: "full"},
  { path: 'clientes', component: ClientesComponent, pathMatch: "full" },
  { path: 'abcclientes', component: AbcclientesComponent, pathMatch: "full" },
  { path: 'crmhome', component: CrmhomeComponent, pathMatch: "full" },
  { path: 'crmusuarios', component: CrmusuariosComponent, pathMatch: "full" },
  { path: 'asignacion-modulos', component: AsignacionModulosComponent, pathMatch:"full" },
  { path: 'crmeditarusuarios', component: CrmeditarusuariosComponent, pathMatch:"full" },
  { path: 'crmcanales', component: CrmcanalesComponent, pathMatch:"full" },
  { path: 'crmeditarcanal', component: CrmeditarcanalComponent, pathMatch:"full" },
  { path: 'crmmedios', component: CrmmediosComponent, pathMatch:"full" },
  { path: 'crmeditarmedios', component: CrmcanalesComponent, pathMatch:"full" }

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
