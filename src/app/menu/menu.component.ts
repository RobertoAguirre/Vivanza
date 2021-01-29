import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

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

  ngOnInit(): void {
    this.GeneraMenu();
  }


  //var par = ", @nId_Usuario ?== " + $rootScope.id_usuario +
  //", @nId_Institucion ?== " + $scope.institucion +
  //", @nId_Puesto ?== " + $scope.puesto;

  /*   $rootScope.filtrar = function (grupo) {
      //disque filtro
      return $rootScope.menus.filter(function (item) { return (item.grupo == grupo); });
    } */

  Filtrar(grupo) {
    return this.menus.filter(function (item) { return (item.grupo == grupo); });
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

      this.gruposLogin = _response.success.recordsets[0];
      this.menus = _response.success.recordsets[1];

      this.gruposLogin.forEach(value => {
        this.grupoModulos = {
          'nombre_grupo': value.nombre_grupo,
          'nombre_modulo':value.nombre_modulo,
          'nivel_seguridad':value.nivel_seguridad,
          'idgrupo': value.id_grupo,
          'modulos': []
        }

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



  //Trae_Menu_Usuario

}
