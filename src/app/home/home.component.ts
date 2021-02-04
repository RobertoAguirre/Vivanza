import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

  //para grafica de barras sencilla y pie
  public tipoGraficaBarras = "line";  //line, bar 
  public tipoGraficaPie = "polarArea"; //pie, doughnut,radar,polarArea
  
  public tituloGrafica = "Ventas"; 
  public etiquetasGrafica = ['Enero','Febrero','Marzo','Abril','Mayo'];
  public datasetGrafica =[10,35,22,12,3];
  public coloresGrafica = ['rgba(255, 99, 132, 0.5)','rgba(54, 162, 235, 0.5)','rgba(255, 206, 86, 0.5)','rgba(75, 192, 192, 0.5)','rgba(153, 102, 255, 0.5)']; //se aceptan numeros en hexadecimal, en rgb, y por nombre


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //para grafica de datasets multiples

  public etiquetasEjeX = ['Enero','Febrero','Marzo','Abril','Mayo'];

  public tituloDataset1 = "Recurso 1";
  public multipledataset1 =[10,35,22,12,3];
  public coloresGrafica1 = ['rgba(222, 47, 24, 0.5)','rgba(222, 47, 24, 0.5)','rgba(222, 47, 24, 0.5)','rgba(222, 47, 24, 0.5)','rgba(222, 47, 24, 0.5)']; //se aceptan numeros en hexadecimal, en rgb, y por nombre


  public tituloDataset2 = "Recurso 2";
  public multipledataset2 =[15,40,27,17,8];
  public coloresGrafica2 = ['rgba(85,172,230,0.5)','rgba(85,172,230,0.5)','rgba(85,172,230,0.5)','rgba(85,172,230,0.5)','rgba(85,172,230,0.5)']; //se aceptan numeros en hexadecimal, en rgb, y por nombre


  public tituloDataset3 = "Recurso 3";
  public multipledataset3 =[20,50,32,21,11];
  public coloresGrafica3 = ['rgba(89, 150, 65, 0.5)','rgba(89,150,65,0.5)','rgba(89,150,65,0.5)','rgba(89,150,65,0.5)','rgba(89,150,65,0.5)','rgba(89,150,65,0.5)']; //se aceptan numeros en hexadecimal, en rgb, y por nombre

 
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

  EditarDesdeHome(item){
      item = JSON.stringify(item);
      this.router.navigate(['/asignacion-modulos'],{queryParams:{'item':item}});
  }

  EliminarDesdeHome(item){
    alert("logica para borrar item  " + item);
  }
  
  


}
