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
import { CrmeditarmediosComponent } from './crmModule/crmeditarmedios/crmeditarmedios.component';
import { CrmeditarsubmediosComponent } from './crmModule/crmeditarsubmedios/crmeditarsubmedios.component';
import { CrmsubmediosComponent } from './crmModule/crmsubmedios/crmsubmedios.component';
import { CrmtipodecreditoComponent } from './crmModule/crmtipodecredito/crmtipodecredito.component';
import { CrmeditartipodecreditoComponent } from './crmModule/crmeditartipodecredito/crmeditartipodecredito.component';
import { CrmcreditoComponent } from './crmModule/crmcredito/crmcredito.component';
import { CrmeditarcreditoComponent } from './crmModule/crmeditarcredito/crmeditarcredito.component';
import { CrminstitucionfinancieraComponent } from './crmModule/crminstitucionfinanciera/crminstitucionfinanciera.component';
import { CrmeditarinstitucionfinancieraComponent } from './crmModule/crmeditarinstitucionfinanciera/crmeditarinstitucionfinanciera.component';
import { CrmclientesComponent } from './crmModule/crmclientes/crmclientes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrmarchivosComponent } from './crmModule/crmarchivos/crmarchivos.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: "full"},
  { path: 'login', component: LoginComponent, pathMatch: "full" },
  { path: 'home', component: DashboardComponent, pathMatch: "full"},
  { path: 'clientes', component: ClientesComponent, pathMatch: "full" },
  { path: 'abcclientes', component: AbcclientesComponent, pathMatch: "full" },
  { path: 'crmhome', component: CrmhomeComponent, pathMatch: "full" },
  { path: 'crmusuarios', component: CrmusuariosComponent, pathMatch: "full" },
  { path: 'asignacion-modulos', component: AsignacionModulosComponent, pathMatch:"full" },
  { path: 'crmeditarusuarios', component: CrmeditarusuariosComponent, pathMatch:"full" },
  { path: 'crmcanales', component: CrmcanalesComponent, pathMatch:"full" },
  { path: 'crmeditarcanal', component: CrmeditarcanalComponent, pathMatch:"full" },
  { path: 'crmmedios', component: CrmmediosComponent, pathMatch:"full" },
  { path: 'crmeditarmedios', component: CrmeditarmediosComponent, pathMatch:"full" },
  { path: 'crmsubmedios', component: CrmsubmediosComponent, pathMatch:"full" },
  { path: 'crmeditarsubmedios', component: CrmeditarsubmediosComponent, pathMatch:"full" },
  { path: 'crmtipodecredito', component: CrmtipodecreditoComponent, pathMatch:"full" },
  { path: 'crmeditartipodecredito', component: CrmeditartipodecreditoComponent, pathMatch:"full" },
  { path: 'crmcredito', component: CrmcreditoComponent, pathMatch:"full" },
  { path: 'crmeditarcredito', component: CrmeditarcreditoComponent, pathMatch:"full" },
  { path: 'crminstitucionfinanciera', component: CrminstitucionfinancieraComponent, pathMatch:"full" },
  { path: 'crmeditarinstitucionfinanciera', component: CrmeditarinstitucionfinancieraComponent, pathMatch:"full" },
  { path: 'crmclientes', component: CrmclientesComponent, pathMatch:"full" },
  { path: 'crmarchivos', component: CrmarchivosComponent, pathMatch:"full" },
  { path: 'dashboard', component: DashboardComponent, pathMatch:"full" }

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
