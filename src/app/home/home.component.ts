import { Component, OnInit, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../examples/modal/modal.component';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  public id;

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
  public etiquetasGrafica = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];
  public datasetGrafica = [10, 35, 22, 12, 3];
  public coloresGrafica = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)']; //se aceptan numeros en hexadecimal, en rgb, y por nombre


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //para grafica de datasets multiples

  public etiquetasEjeX = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];

  public tituloDataset1 = "Recurso 1";
  public multipledataset1 = [10, 35, 22, 12, 3];
  public coloresGrafica1 = ['rgba(222, 47, 24, 0.5)', 'rgba(222, 47, 24, 0.5)', 'rgba(222, 47, 24, 0.5)', 'rgba(222, 47, 24, 0.5)', 'rgba(222, 47, 24, 0.5)']; //se aceptan numeros en hexadecimal, en rgb, y por nombre


  public tituloDataset2 = "Recurso 2";
  public multipledataset2 = [15, 40, 27, 17, 8];
  public coloresGrafica2 = ['rgba(85,172,230,0.5)', 'rgba(85,172,230,0.5)', 'rgba(85,172,230,0.5)', 'rgba(85,172,230,0.5)', 'rgba(85,172,230,0.5)']; //se aceptan numeros en hexadecimal, en rgb, y por nombre


  public tituloDataset3 = "Recurso 3";
  public multipledataset3 = [20, 50, 32, 21, 11];
  public coloresGrafica3 = ['rgba(89, 150, 65, 0.5)', 'rgba(89,150,65,0.5)', 'rgba(89,150,65,0.5)', 'rgba(89,150,65,0.5)', 'rgba(89,150,65,0.5)', 'rgba(89,150,65,0.5)']; //se aceptan numeros en hexadecimal, en rgb, y por nombre

  public tituloModal = "Hola";

  public money = 10000
  public testPrice;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public apiService: ApiService,
    private modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object
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


  openNormal() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.my_modal_title = 'Titulo de modal';
    modalRef.componentInstance.my_modal_content = 'Contenido normal';
    modalRef.componentInstance.my_modal_color = 'normal-title';
  }

  openWarning() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.my_modal_title = 'Titulo de modal';
    modalRef.componentInstance.my_modal_content = 'Contenido normal';
    modalRef.componentInstance.my_modal_color = 'caution-title';
  }

  openDanger() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.my_modal_title = 'Titulo de modal';
    modalRef.componentInstance.my_modal_content = 'Contenido normal';
    modalRef.componentInstance.my_modal_color = 'danger-title';
  }

  openSuccess() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.my_modal_title = 'Titulo de modal';
    modalRef.componentInstance.my_modal_content = 'Contenido normal';
    modalRef.componentInstance.my_modal_color = 'success-title';
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
      "appname": "VIVANZA",
      "sp": 'Trae_Ciudades',
      "params": []

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;

      this.dataset = _response.success.recordset;
    })

  }


  TraeIdPersona() {

    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('id');
    }



  }


  TraePersona() {

    //BuscaUsuario 'admin2','p4ss'
    // let p = localStorage.getItem('id');
    let data = {
      "appname": "VIVANZA",
      "sp": 'Trae_Usuario',
      "params": [this.TraeIdPersona()]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      localStorage.setItem('persona', _response.success.recordset[0].nombres);

    })

  }

  EditarDesdeHome(item) {
    item = JSON.stringify(item);
    this.router.navigate(['/asignacion-modulos'], { queryParams: { 'item': item } });
  }

  EliminarDesdeHome(item) {
    alert("logica para borrar item  " + item);
  }

  ModalAceptar() {
    alert("pico");
  }

  /////////////////FILE UPLOAD ///////////////////////////////////////////

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource').value);

    this.apiService.uploadPhoto(formData).subscribe((response) => {
      let _response;
      _response = response;
      console.log(_response);
      alert('Uploaded Successfully.');
    })

  }

  //////////////////////////////////////////////////////////////////

  /* this.apiService.ejecuta(data).subscribe((response) => {
    let _response;
    _response = response;

    this.dataset = _response.success.recordset;
  })
 */

  /*  public respFile: any;
   public fotoGuardada: string; */
  /*   uploadFile(formData, capt) {
  
  
      return this.http.post('http://mobinsa2.dyndns.org:49203/api/UploadFiles/', formData).
        subscribe(data => {
          this.respFile = data;
          console.log(data['_body']);
          if (capt !== undefined) {
            // var _capt = this.guardaCaptura(capt);
          }
          return this.respFile;
        }, error => {
          console.log(error);
          return this.respFile;
        });
  
      return this.respFile;
    } */

  //this is new
  /*   uploadPhoto(formData) {
  
      this.apiService.uploadPhoto(formData)
  
    } */


}
