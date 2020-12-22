import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public valor = 0;
  public resultados;
  public token;

  public loginForm;
  
  

  constructor(
    public apiService: ApiService
  ) {


     this.loginForm = new FormGroup({
       usuario: new FormControl,
       pass:new FormControl
     })


   }

  ngOnInit(): void {
  }

  probandoGet() {
    this.apiService.pruebaGet().subscribe((response) => {
      let _response;
      _response = response;

      //response.valor <= esto no jala
      this.valor = _response.valor;
      alert(this.valor);

    })
  }

  probandoGetProtegido() {
    let tkn = this.token;
    this.apiService.pruebaGetProtegido(tkn).subscribe((response) => {
      let _response;
      _response = response;

      //response.valor <= esto no jala
      this.valor = _response.valor;
      alert(this.valor);

    })
  }

  probandoPost() {

    //BuscaUsuario 'admin2','p4ss'

    let data = {
      "sp": 'BuscaUsuario',
      "params":['admin2,','p4ss']

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;

      this.resultados = _response.recordset[0];
      alert(this.resultados.idusuario + " " + this.resultados.usuario);
    })

  }



  autentificar() {

    //BuscaUsuario 'admin2','p4ss'

    let data = {
      "usuario":this.loginForm.usuario,
      "password":this.loginForm.pass
    }

    this.apiService.autentifica(data).subscribe((response) => {
      let _response;
      _response = response;

      this.token = _response.token;
     
    })

  }

}
