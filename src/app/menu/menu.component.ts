import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

/*   public gruposLogin;
  public menus;
  public id;
  public grupoModulos;
  public modulos;
*/
  public MODULOSPORGRUPO = [];

  /* constructor(
    public apiService: ApiService
  ) {
   this.id = localStorage.getItem('id'); 
  } */

  ngOnInit(): void {
<<<<<<< HEAD
/*     this.GeneraMenu(); */
=======
    this.MODULOSPORGRUPO = JSON.parse(localStorage.getItem('MODULOSPORGRUPO'));
    //this.GeneraMenu();
>>>>>>> 83d8591a3a3e6a41062467d84bcc6ecd8f05713d
  }

/*   Filtrar(nombre_grupo) {

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


<<<<<<< HEAD
      this.menus.forEach(value => {
        this.grupoModulos = {
          'idgrupo': value.id_grupo,
          'nombre_grupo': value.nombre_grupo,
          'modulos': []
        }
        this.modulos = _response.success.recordsets[0];
         this.modulos = this.Filtrar(value.nombre_grupo);
=======
        this.menus = _response.success.recordsets[1];
        this.modulos = _response.success.recordsets[0];

        this.menus.forEach(value => {
          this.grupoModulos = {
            'idgrupo': value.id_grupo,
            'nombre_grupo': value.nombre_grupo,
            'modulos': []
          }
>>>>>>> 83d8591a3a3e6a41062467d84bcc6ecd8f05713d

          this.modulos = _response.success.recordsets[0];
          this.modulos = this.Filtrar(value.nombre_grupo);

<<<<<<< HEAD
        this.MODULOSPORGRUPO.push(this.grupoModulos);
        
=======
          this.modulos.forEach(value => {
            this.grupoModulos['modulos'].push(value);
          })

          this.MODULOSPORGRUPO.push(this.grupoModulos);
>>>>>>> 83d8591a3a3e6a41062467d84bcc6ecd8f05713d


        })

        localStorage.setItem('MODULOSPORGRUPO', JSON.stringify(this.MODULOSPORGRUPO));

      })

    }

  } */

}
