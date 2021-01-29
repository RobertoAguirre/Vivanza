import { Component, OnInit } from '@angular/core';
import { ApiService } from 'c:/Vivanza/Vivanza/src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public personal;
  constructor(
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.TraePersona();
  }

  TraePersona() {

    //BuscaUsuario 'admin2','p4ss'
   // let p = localStorage.getItem('id');
    let data = {
      "appname":"VIVANZA",
      "sp": 'Trae_Usuario',
      "params": [localStorage.getItem('id')]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      
      localStorage.setItem('persona', _response.success.recordset[0].nombres + " " + _response.success.recordset[0].apellidos);
      /*let _persona = localStorage.getItem('persona') */
      this.personal = localStorage.getItem('persona');
    })

  }

}
