import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-crmclientes',
  templateUrl: './crmclientes.component.html',
  styleUrls: ['./crmclientes.component.css'],
  providers: [DatePipe]
})
export class CrmclientesComponent implements OnInit {

  public com = false;
  public item;
  public nombre_vista;
  public _combo_desarrollo;
  public _combo_tipo_de_cliente;
  public _combo_genero;
  public _combo_asesor
  ;
  public _combo_nivel_de_interes;
  public dataset;
  public label;
  public fecha;
  public usuario=[];

  capturaForm = this.formBuilder.group({
    tipo_cliente:['',Validators.required],
    fecha:['',Validators.required],
    folio:['',Validators.required],
    asesor:['',Validators.required]
    /* nombres:['',Validators.required],
    apellido_paterno:['',Validators.required],
    apellido_materno:['',Validators.required],
    usuario:['',Validators.required],
    telefono:['',Validators.required],
    email:['',Validators.required],
    tipo:['',Validators.required],
    desarrollo:['',Validators.required],
    id:[''] */
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    public formBuilder: FormBuilder,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this._combo_tipo_de_cliente = [
      {nombre: 'Prospecto'},
      {nombre: 'Cliente Potencial'},
      {nombre: 'Apartado'},
      {nombre: 'Vendido'},
      {nombre: 'Cancelado'}
    ]
    this._combo_genero = [
      {nombre: 'Masculino'},
      {nombre: 'Femenino'}
    ]
    this._combo_nivel_de_interes = [
      {nombre: 'Muy interesado (15 días)'},
      {nombre: 'Interesado (+15 días)'},
      {nombre: 'Incubadora'},
      {nombre: 'Perfilado no interesado'},
      {nombre: 'No perfilado'}
    ]
    this.TraeFecha();
    this.TraeUsuario();
  }

  TraeFecha(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dbo.Trae_Usuarios_CRM',
      "params": []

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
     /*  this.fecha = _response.success.recordsets[0]; */
      /* this.fecha = 'hola'; */
      this.capturaForm.setValue(
        {
          tipo_cliente: '',
          fecha: this.datepipe.transform(_response.success.recordset[0].fecha,'dd/MM/yyyy') ,
          folio:'',
          asesor:''
        })
    })
  }

  TraeUsuario(){
    let id;
    id = localStorage.getItem('id');
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Usuarios_CRM',
      "params": [id]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
     /*  this.fecha = _response.success.recordsets[0]; */
      /* this.fecha = 'hola'; */
      this.usuario = _response.success.recordset[0];
      if ('Asesor' == _response.success.recordset[0].tipo){
        alert('si');
      }
      this.capturaForm.setValue(
        {
          tipo_cliente: '',
          fecha: this.datepipe.transform(this.capturaForm.value.fecha,'dd/MM/yyyy') ,
          folio:'',
          asesor:''
        })
    })
  }
  
  Guarda(){}

}
