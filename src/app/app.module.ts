import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import * as bootstrap from "bootstrap";
import * as $ from 'jquery';
import { AppComponent } from './app.component';
import { ClientesComponent } from './clientesModule/clientes/clientes.component';
import { AbcclientesComponent } from './clientesModule/abcclientes/abcclientes.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './loginModule/login/login.component';
import { NavbarComponent } from './navbarModule/navbar/navbar.component';
import { SidebarComponent } from './sidebarModule/sidebar/sidebar.component';
import { FooterComponent } from './footerModule/footer/footer.component';
import { TablesComponent } from './examples/tables/tables.component';
import { KeysPipe } from './keys.pipe';
<<<<<<< HEAD
import { ContratosComponent } from './contratos/contratos.component';
=======
import { CrmhomeComponent } from './crmModule/crmhome/crmhome.component';

import { CrmusuariosComponent } from './crmModule/crmusuarios/crmusuarios.component';

import { AsignacionModulosComponent } from './asignacion-modulos/asignacion-modulos.component';
import { AreaComponent } from './examples/charts/area/area.component';
import { PieComponent } from './examples/charts/pie/pie.component';
import { BarsmultipleComponent } from './examples/charts/barsmultiple/barsmultiple.component';
import { CrmeditarusuariosComponent } from './crmModule/crmeditarusuarios/crmeditarusuarios.component';
import { CrmcanalesComponent } from './crmModule/crmcanales/crmcanales.component';
import { CrmeditarcanalComponent } from './crmModule/crmeditarcanal/crmeditarcanal.component';
import { CrmmediosComponent } from './crmModule/crmmedios/crmmedios.component';
import { CrmeditarmediosComponent } from './crmModule/crmeditarmedios/crmeditarmedios.component';
import { CrmsubmediosComponent } from './crmModule/crmsubmedios/crmsubmedios.component';
import { CrmeditarsubmediosComponent } from './crmModule/crmeditarsubmedios/crmeditarsubmedios.component';
import { CrmtipodecreditoComponent } from './crmModule/crmtipodecredito/crmtipodecredito.component';
import { CrmeditartipodecreditoComponent } from './crmModule/crmeditartipodecredito/crmeditartipodecredito.component';
import { CrmeditarcreditoComponent } from './crmModule/crmeditarcredito/crmeditarcredito.component';
import { CrmcreditoComponent } from './crmModule/crmcredito/crmcredito.component';
import { CrminstitucionfinancieraComponent } from './crmModule/crminstitucionfinanciera/crminstitucionfinanciera.component';
import { CrmeditarinstitucionfinancieraComponent } from './crmModule/crmeditarinstitucionfinanciera/crmeditarinstitucionfinanciera.component';

import { ModalComponent } from './examples/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CrmclientesComponent } from './crmModule/crmclientes/crmclientes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrmclientesapartadoComponent } from './crmModule/crmclientesapartado/crmclientesapartado.component';
import { CrmarchivosComponent } from './crmModule/crmarchivos/crmarchivos.component';





>>>>>>> 2f532ccb6b7208c643a3b9e91edef423ab0c779f


@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    AbcclientesComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    TablesComponent,
    KeysPipe,
<<<<<<< HEAD
    ContratosComponent
=======
    CrmhomeComponent,
    CrmusuariosComponent,
    AsignacionModulosComponent,
    CrmeditarusuariosComponent,
    AreaComponent,
    PieComponent,
    BarsmultipleComponent,
    CrmcanalesComponent,
    CrmeditarcanalComponent,
    CrmmediosComponent,
    CrmeditarmediosComponent,
    CrmusuariosComponent,
    CrmsubmediosComponent,
    CrmeditarsubmediosComponent,
    CrmtipodecreditoComponent,
    CrmeditartipodecreditoComponent,
    CrmeditarcreditoComponent,
    CrmcreditoComponent,
    CrminstitucionfinancieraComponent,
    CrmeditarinstitucionfinancieraComponent,
    ModalComponent,
    CrmclientesComponent,
    DashboardComponent,
    CrmclientesapartadoComponent,
    CrmarchivosComponent

>>>>>>> 2f532ccb6b7208c643a3b9e91edef423ab0c779f
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'vivanzaApp' }),
    DataTablesModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents: [
    ModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
