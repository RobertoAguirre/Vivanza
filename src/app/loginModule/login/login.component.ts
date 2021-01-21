import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public valor = 0;
  public resultados;
  public token;

  public loginForm;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = new FormGroup({
      usuario: new FormControl,
      pass: new FormControl
    })


  }

  ngOnInit(): void {
  }

  autentificar() {

    //BuscaUsuario 'admin2','p4ss'

    let data = {
      "appname": "VIVANZA",
      "params": {
        "usuario": this.loginForm.email,
        "contrasena": this.loginForm.pass
      }
    }



    this.apiService.autentifica(data).subscribe((response) => {
      let _response;
      _response = response;


      if (_response.acceso !== true) {
        alert(_response.message);
      } else {
        this.token = _response.token;
        this.authService.setToken(this.token);
        let tkn = this.authService.getToken();
        //alert(tkn);
        this.router.navigate(['home']); // tells them they've been logged out (somehow)

      }

    })

  }

}
