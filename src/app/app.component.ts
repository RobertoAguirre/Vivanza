import { Component, OnInit } from '@angular/core';
import * as Chart from '../../node_modules/chart.js';
import { ApiService } from './services/api.service.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public gruposLogin;
  public menus;
  public id;
  public grupoModulos;
  public modulos;

  public MODULOSPORGRUPO = [];

  constructor(
    public apiService: ApiService
  ) {
    this.id = localStorage.getItem('id');
  }

  title = 'Vivanza';
  
  ngOnInit() {
    
    this.GeneraMenu();
  }

  Filtrar(nombre_grupo) {

    return this.modulos.filter(function (item) { return (item.nombre_grupo == nombre_grupo); });
  }


  GeneraMenu() {

    this.MODULOSPORGRUPO = JSON.parse(localStorage.getItem('MODULOSPORGRUPO'));
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

        localStorage.setItem('MODULOSPORGRUPO', JSON.stringify(this.MODULOSPORGRUPO));

      })

    }

  }

}
