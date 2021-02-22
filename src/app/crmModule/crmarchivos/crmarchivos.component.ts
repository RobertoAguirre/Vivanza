import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crmarchivos',
  templateUrl: './crmarchivos.component.html',
  styleUrls: ['./crmarchivos.component.css']
})
export class CrmarchivosComponent implements OnInit {

  public ArchivosCRM;
  public archivoApartado;
  public solicitudCompra;


  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.TraeArchivosCRM();
  }

  /////////////////FILE UPLOAD ///////////////////////////////////////////

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event) {

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
      alert('Uploaded Successfully.');
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


    })

  }


  TraeArchivosCRM() {

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
      this.ArchivosCRM = _response.success.recordsets[0];
      let _archivoApartado;
      _archivoApartado = this.Filtrar(this.ArchivosCRM, 'Apartado');
      this.archivoApartado = this.apiService.homeUrl + _archivoApartado[0].ubicacion;

      let _solicitudCompra;
      _solicitudCompra = this.Filtrar(this.ArchivosCRM, 'SolicitudCompra');
      this.solicitudCompra = this.apiService.homeUrl + _solicitudCompra[0].ubicacion;

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
