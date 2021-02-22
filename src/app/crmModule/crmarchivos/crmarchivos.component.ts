import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-crmarchivos',
  templateUrl: './crmarchivos.component.html',
  styleUrls: ['./crmarchivos.component.css']
})
export class CrmarchivosComponent implements OnInit {

  public ArchivosCRM;
  public archivoApartado;
  public solicitudCompra;
  public ofertaCompra;
  public avisoPrivacidad;
  public preliquidacion;
  public planoGeometrico;
  public planoCerrada;
  public reglamentos;
  public precalificacion
  public solicitudInfonavit;
  public solicitudesBanco;
  public FOVISSSTE;
  public especificaciones;
  public guiaCliente;
  public reciboNomina;
  public hojaComentarios;

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
    this.TraeArchivosCRM();
    //this.appComponent.showSpinner();

  }

  /*   showSpinner() {
      document.getElementById("spinner-back").classList.add("show");
      document.getElementById("spinner-front").classList.add("show");
    }
    hideSpinner() {
      document.getElementById("spinner-back").classList.remove("show");
      document.getElementById("spinner-front").classList.remove("show");
    } */

  /////////////////FILE UPLOAD ///////////////////////////////////////////

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event) {

    this.appComponent.showSpinner();

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const filename = event.target.files[0].name;
      const documentName = event.target.name;
      //const filename = event.target.name;
      this.myForm.patchValue({
        fileSource: file
      });
      this.uploadFile(filename, documentName);
    }
  }

  uploadFile(filename, documentName) {
    const formData = new FormData();
    let filepath = 'archivos/VIVANZA/CRM/';
    formData.append('file', this.myForm.get('fileSource').value);
    formData.append('filepath', 'archivos/VIVANZA/CRM/');
    //formData.append('filename', filename)

    this.apiService.uploadPhoto(formData).subscribe((response) => {
      let _response;
      _response = response;
      console.log(_response);
      this.GuardaArchivoCRM(filepath, filename, documentName);
      //alert('Uploaded Successfully.');
    })
  }

  submit(filename) {

    //this.uploadFile(filename);

  }



  GuardaArchivoCRM(filepath, filename, documentName) {

    let id = localStorage.getItem('id');
    //BuscaUsuario 'admin2','p4ss'

    filepath = filepath + filename;

    // "params": ["'" + this._d_s + "','" ,  item + "'"]
    let data = {
      "appname": "VIVANZA",
      "sp": 'dvp.Guarda_Archivo_CRM',
      "params": ["'" + filepath + "',", "'" + documentName + "'," + id + ""]


    }
    /* 
        @vUbicacion	varchar(10),
        @vNombre	varchar(20),
        @nId_usuario int */

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      //Para navegar de nuevo al componente actual (refresh a componentes)
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./'], { relativeTo: this.route });

      alert("Archivo subido exitosamente");
      this.appComponent.hideSpinner();
    })

  }


  TraeArchivosCRM() {
    this.appComponent.showSpinner();
    let path = 'archivos/VIVANZA/CRM/';

    let id = localStorage.getItem('id');
    //BuscaUsuario 'admin2','p4ss'

    // "params": ["'" + this._d_s + "','" ,  item + "'"]
    let data = {
      "appname": "VIVANZA",
      "sp": 'dvp.Trae_Archivos_CRM',
      "params": []


    }
    /* 
        @vUbicacion	varchar(10),
        @vNombre	varchar(20),
        @nId_usuario int */

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;

      this.appComponent.hideSpinner();

      this.ArchivosCRM = _response.success.recordsets[0];
      let _archivoApartado;
      _archivoApartado = this.Filtrar(this.ArchivosCRM, 'Apartado');
      this.archivoApartado = this.apiService.homeUrl + _archivoApartado[0].ubicacion;

      let _solicitudCompra;
      _solicitudCompra = this.Filtrar(this.ArchivosCRM, 'SolicitudCompra');
      this.solicitudCompra = this.apiService.homeUrl + _solicitudCompra[0].ubicacion;

      let _ofertaCompra;
      _ofertaCompra = this.Filtrar(this.ArchivosCRM, 'OfertaCompra');
      this.ofertaCompra = this.apiService.homeUrl + _ofertaCompra[0].ubicacion;

      let _avisoPrivacidad;
      _avisoPrivacidad = this.Filtrar(this.ArchivosCRM, 'AvisoPrivacidad');
      this.avisoPrivacidad = this.apiService.homeUrl + _avisoPrivacidad[0].ubicacion;

      let _preliquidacion;
      _preliquidacion = this.Filtrar(this.ArchivosCRM, 'Preliquidacion');
      this.preliquidacion = this.apiService.homeUrl + _preliquidacion[0].ubicacion;

      let _planoGeometrico;
      _planoGeometrico = this.Filtrar(this.ArchivosCRM, 'PlanoGeometrico');
      if (_planoGeometrico.length >= 1)
        this.planoGeometrico = this.apiService.homeUrl + _planoGeometrico[0].ubicacion;

      let _planoCerrada;
      _planoCerrada = this.Filtrar(this.ArchivosCRM, 'PlanoCerrada');
      if (_planoCerrada.length >= 1)
        this.planoCerrada = this.apiService.homeUrl + _planoCerrada[0].ubicacion;

      let _reglamentos;
      _reglamentos = this.Filtrar(this.ArchivosCRM, 'Reglamentos');
      if (_reglamentos.length >= 1)
        this.reglamentos = this.apiService.homeUrl + _reglamentos[0].ubicacion;

      let _precalificacion;
      _precalificacion = this.Filtrar(this.ArchivosCRM, 'Precalificacion');
      if (_precalificacion.length >= 1)
        this.precalificacion = this.apiService.homeUrl + _precalificacion[0].ubicacion;

      let _solicitudInfonavit;
      _solicitudInfonavit = this.Filtrar(this.ArchivosCRM, 'SolicitudInfonavit');
      if (_solicitudInfonavit.length >= 1)
        this.solicitudInfonavit = this.apiService.homeUrl + _solicitudInfonavit[0].ubicacion;

      let _FOVISSSTE;
      _FOVISSSTE = this.Filtrar(this.ArchivosCRM, 'FOVISSSTE');
      if (_FOVISSSTE.length >= 1)
        this.FOVISSSTE = this.apiService.homeUrl + _FOVISSSTE[0].ubicacion;

      let _especificaciones;
      _especificaciones = this.Filtrar(this.ArchivosCRM, 'Especificaciones');
      if (_especificaciones.length >= 1)
        this.especificaciones = this.apiService.homeUrl + _especificaciones[0].ubicacion;

      let _solicitudesBanco;
      _solicitudesBanco = this.Filtrar(this.ArchivosCRM, 'SolicitudesBanco');
      if (_solicitudesBanco.length >= 1)
        this.solicitudesBanco = this.apiService.homeUrl + _solicitudesBanco[0].ubicacion;

      let _guiaCliente;
      _guiaCliente = this.Filtrar(this.ArchivosCRM, 'GuiaCliente');
      if (_guiaCliente.length >= 1)
        this.guiaCliente = this.apiService.homeUrl + _guiaCliente[0].ubicacion;

      let _reciboNomina;
      _reciboNomina = this.Filtrar(this.ArchivosCRM, 'ReciboNomina');
      if (_reciboNomina.length >= 1)
        this.reciboNomina = this.apiService.homeUrl + _reciboNomina[0].ubicacion;

      let _hojaComentarios;
      _hojaComentarios = this.Filtrar(this.ArchivosCRM, 'HojaComentarios');
      if (_hojaComentarios.length >= 1)
        this.hojaComentarios = this.apiService.homeUrl + _hojaComentarios[0].ubicacion;



      //http://74.208.145.99:40000/archivos/VIVANZA/CRM/angrykoala.jpg
      //http://74.208.145.99:40000//archivos/VIVANZA/CRM/angrykoala.jpg
      //http://74.208.145.99:40000/api//archivos/VIVANZACRM/Captura de pantalla de 2021-01-15 09-52-11.png
      //alert(this.archivoApartado);


    })

  }



  /*   Filtrar(nombre_grupo) {
  
      return this.modulos.filter(function (item) { return (item.nombre_grupo == nombre_grupo); });
    }
   */

  Filtrar(arreglo, documentName) {

    return arreglo.filter(function (item) { return (item.nombre == documentName); });
  }


}
