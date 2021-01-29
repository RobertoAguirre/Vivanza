import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tituloTabla = "Tabla desde home";
  public descripcionTabla = "descripcion desde home";

  public valor = 0;
  public resultados;
  public token;
 
  public loginForm;
  public dataset;


  constructor(
    public apiService: ApiService
  ) {


    this.loginForm = new FormGroup({
      usuario: new FormControl,
      pass: new FormControl
    })

 }

  ngOnInit(): void {
    //this.TraePersona();
    this.TraeCiudades();
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

  TraeCiudades() {

    //BuscaUsuario 'admin2','p4ss'

    let data = {
      "appname":"VIVANZA",
      "sp": 'Trae_Ciudades',
      "params": []

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;

      this.dataset = _response.success.recordset;
    })

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
      localStorage.setItem('persona',_response.success.recordset[0].nombres);
      
    })

  }



}
