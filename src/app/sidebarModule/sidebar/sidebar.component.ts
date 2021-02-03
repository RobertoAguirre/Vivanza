import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public gruposLogin;
  public menus;
  public id;
  public grupoModulos;
  public modulos;
  public MODULOSPORGRUPO = [];

  constructor(
    public apiService: ApiService,
    private router: Router
  ) { 
    this.id = localStorage.getItem('id');
  }

  ngOnInit(): void {
    this.GeneraMenu();
  }

  Filtrar(nombre_grupo) {
    return this.modulos.filter(function (item) { return (item.nombre_grupo == nombre_grupo); });
  }


  GeneraMenu() {


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

      /*
       selectChildren(data, $event) {
          let parentChecked = data.checked;
          this.hierarchicalData.forEach(obj => {
              obj.forEach(childObj=> {
                value.checked = parentChecked;
            });
          });
        }
      */

    })
  }

  

  

}
