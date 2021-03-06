import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { getLocaleMonthNames } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public valor = 0;
  public resultados;
  public token;
  public id;

  public loginForm;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private appComponent: AppComponent

  ) {

    this.loginForm = new FormGroup({
      usuario: new FormControl,
      pass: new FormControl
    })


  }

  ngOnInit(): void {

  }

  autentificar() {


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
      localStorage.setItem('id', _response.id);

      if (_response.acceso !== true) {
        alert(_response.message);
      } else {
        this.token = _response.token;
        this.id = _response.id;
        this.authService.setToken(this.token);
        let tkn = this.authService.getToken();
        //alert(tkn);


        localStorage.setItem('tkn', this.token);
        localStorage.setItem('id', this.id);

        this.id = localStorage.getItem('id');
        this.appComponent.GeneraMenu();
        //this.appComponent.GeneraMenu();
        this.router.navigate(['home']); // tells them they've been logged out (somehow)

      }

    })

  }

}
