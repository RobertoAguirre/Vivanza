import { Component, OnInit,PLATFORM_ID,Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
public id;
public gruposLogin;
public menus;
public MODULOSPORGRUPO = [];
public grupoModulos;
public modulos;
  constructor(
    public apiService: ApiService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 

    this.id =localStorage.getItem('id');
    //this.TraeIdPersona();
  }


    
  TraeIdPersona(){

   
      return localStorage.getItem('id');
    
   
  }

  


  ngOnInit() {
    this.GeneraMenu();
  
  }

  Filtrar(nombre_grupo) {

    return this.modulos.filter(function (item) { return (item.nombre_grupo == nombre_grupo); });
  }


  GeneraMenu() {

    /* this.MODULOSPORGRUPO = JSON.parse(localStorage.getItem('MODULOSPORGRUPO')); */
    if (this.MODULOSPORGRUPO.length <= 0) {

      let data = {
        "appname": "VIVANZA",
        "sp": "Trae_Modulos_Web_Usuario",
        "params": [parseInt(this.id)]

      }

      this.apiService.ejecuta(data).subscribe((response) => {
        let _response;
        _response = response;


        this.menus = _response.success.recordsets[1];
        this.modulos = _response.success.recordsets[0];

        this.menus.forEach(value => {
          this.grupoModulos = {
            'idgrupo': value.id_grupo,
            'nombre_grupo': value.nombre_grupo,
            'modulos': []
          }

          this.modulos = _response.success.recordsets[0];
          this.modulos = this.Filtrar(value.nombre_grupo);

          this.modulos.forEach(value => {
            this.grupoModulos['modulos'].push(value);
          })

          this.MODULOSPORGRUPO.push(this.grupoModulos);


        })

        //localStorage.setItem('MODULOSPORGRUPO', JSON.stringify(this.MODULOSPORGRUPO));

      })

    }

  }




}
