import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public personal;
  constructor(
    public apiService: ApiService,
    public router:Router
  ) { }

  ngOnInit(): void {
    this.TraePersona();
  }

  TraePersona() {

    //BuscaUsuario 'admin2','p4ss'
    // let p = localStorage.getItem('id');
    let data = {
      "appname": "VIVANZA",
      "sp": 'Trae_Usuario',
      "params": [localStorage.getItem('id')]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;

      localStorage.setItem('persona', _response.success.recordset[0].nombres + " " + _response.success.recordset[0].apellidos);
      localStorage.setItem('sucursal', _response.success.recordset[0].id_sucursal);
      /*let _persona = localStorage.getItem('persona') */
      this.personal = localStorage.getItem('persona');
    })

  }

  CerrarSesion() {

    var txt;
    var r = confirm("Esta cerrando sesión, ¿está seguro?");
    if (r == true) {
      localStorage.clear();
      this.router.navigate(['login']); // tells them they've been logged out (somehow)

    } else {
      //txt = "You pressed Cancel!";
    }


    
  }

}
