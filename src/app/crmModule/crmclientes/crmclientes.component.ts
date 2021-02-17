import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as bootstrap from "bootstrap"; 
import * as $ from 'jquery';

@Component({
  selector: 'app-crmclientes',
  templateUrl: './crmclientes.component.html',
  styleUrls: ['./crmclientes.component.css'],
  providers: [DatePipe]
})
export class CrmclientesComponent implements OnInit {

  public es_asesor = 0;
  public boton_guarda = false;
  public medio_requerido = false;
  public submedio_requerido = false;
  public com = false;
  public item;
  public nombre_vista;
  public _combo_desarrollo;
  public _combo_tipo_de_cliente;
  public _combo_genero;
  public _combo_asesor;
  public _combo_nivel_de_interes;
  public _combo_canales;
  public _combo_medios;
  public _combo_submedios;
  public _combo_desarrollos;
  public _combo_prototipos;
  public _combo_manzanas;
  public _combo_tipos_creditos;
  public _combo_creditos;
  public _combo_institucion_financiera;
  public _combo_ingresos;
  public dataset;
  public label;
  public fecha;
  public usuario=[];
  public id;
  public _d_s;
  public _asesor;
  


  capturaForm = this.formBuilder.group({
    tipo_cliente:['',Validators.required],
    fecha:['',Validators.required],
    folio:[''],
    asesor:['',Validators.required],
    registro:['',Validators.required],
    nombres:['',Validators.required],
    apellido_paterno:['',Validators.required],
    apellido_materno:['',Validators.required],
    telefono:['',Validators.required],
    email:['',Validators.required],
    genero:['',Validators.required],
    nivel_interes:['',Validators.required],
    combo_canal:['',Validators.required],
    combo_medio:[''],
    combo_submedio:[''],
    referidor:[''],
    combo_desarrollo:[''],
    combo_prototipo:[''],
    combo_manzana:[''],
    tipo_credito:[''],
    credito:[''],
    institucion_financiera:[''],
    ingresos:[''],
    proximo_contacto:[''],
    fecha_apartado:[''],
    fecha_venta:[''],
    fecha_cancelacion:[''],
    visita:[''],
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    public formBuilder: FormBuilder,
    public datepipe: DatePipe
  ) {
    $(document).ready(function () {
     
    })

   }

  ngOnInit(): void {
    $('#myModal').modal('show');
    this.BloquearCampos(0);
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
    this._combo_ingresos = [
      {nombre: 'De 0 a $10,000 mensuales'},
      {nombre: 'De $10,000 a $20,000 mensuales'},
      {nombre: 'De $20,000 a $30,000 mensuales'},
      {nombre: 'De $30,000 a $40,000 mensuales'},
      {nombre: 'Más de $50,000 mensuales'}
    ]
/*     this.TraeFecha();
    this.TraeUsuario(); */
    this.ComboCanales();
    this.ComboDesarrollos();
    this.ComboCreditos();
  }

  BloquearCampos(item){
    if(item == 1){
      let pregunta = confirm('¿Está seguro de querer cancelar?');
      if (pregunta == true){
        this.capturaForm.setValue(
          {
            tipo_cliente: '',
            fecha: '',
            folio:'',
            asesor:'',
            registro:'',
            nombres:'',
            apellido_paterno:'',
            apellido_materno:'',
            telefono:'',
            email:'',
            genero:'',
            nivel_interes:'',
            combo_canal:'',
            combo_medio:'',
            combo_submedio:'',
            referidor:'',
            combo_desarrollo:'',
            combo_prototipo:'',
            combo_manzana:'',
            tipo_credito:'',
            credito:'',
            institucion_financiera:'',
            ingresos:'',
            proximo_contacto:'',
            fecha_apartado:'',
            fecha_venta:'',
            fecha_cancelacion:'',
            visita:''
          }) 

          this.capturaForm.controls['tipo_cliente'].disable();
          this.capturaForm.controls['asesor'].disable();
          this.capturaForm.controls['registro'].disable();
          this.capturaForm.controls['nombres'].disable();
          this.capturaForm.controls['apellido_paterno'].disable();
          this.capturaForm.controls['apellido_materno'].disable();
          this.capturaForm.controls['telefono'].disable();
          this.capturaForm.controls['email'].disable();
          this.capturaForm.controls['genero'].disable();
          this.capturaForm.controls['nivel_interes'].disable();
          this.capturaForm.controls['combo_canal'].disable();
          this.capturaForm.controls['combo_medio'].disable();
          this.capturaForm.controls['combo_submedio'].disable();
          this.capturaForm.controls['referidor'].disable();
          this.capturaForm.controls['combo_desarrollo'].disable();
          this.capturaForm.controls['combo_prototipo'].disable();
          this.capturaForm.controls['combo_manzana'].disable();
          this.capturaForm.controls['tipo_credito'].disable();
          this.capturaForm.controls['credito'].disable();
          this.capturaForm.controls['institucion_financiera'].disable();
          this.capturaForm.controls['ingresos'].disable();
          this.capturaForm.controls['proximo_contacto'].disable();
          this.capturaForm.controls['fecha_apartado'].disable();
          this.capturaForm.controls['fecha_venta'].disable();
          this.capturaForm.controls['fecha_cancelacion'].disable();
          this.capturaForm.controls['visita'].disable();

    
      }
      
      
    }
    else{
      this.capturaForm.controls['tipo_cliente'].disable();
      this.capturaForm.controls['asesor'].disable();
      this.capturaForm.controls['registro'].disable();
      this.capturaForm.controls['nombres'].disable();
      this.capturaForm.controls['apellido_paterno'].disable();
      this.capturaForm.controls['apellido_materno'].disable();
      this.capturaForm.controls['telefono'].disable();
      this.capturaForm.controls['email'].disable();
      this.capturaForm.controls['genero'].disable();
      this.capturaForm.controls['nivel_interes'].disable();
      this.capturaForm.controls['combo_canal'].disable();
      this.capturaForm.controls['combo_medio'].disable();
      this.capturaForm.controls['combo_submedio'].disable();
      this.capturaForm.controls['referidor'].disable();
      this.capturaForm.controls['combo_desarrollo'].disable();
      this.capturaForm.controls['combo_prototipo'].disable();
      this.capturaForm.controls['combo_manzana'].disable();
      this.capturaForm.controls['tipo_credito'].disable();
      this.capturaForm.controls['credito'].disable();
      this.capturaForm.controls['institucion_financiera'].disable();
      this.capturaForm.controls['ingresos'].disable();
      this.capturaForm.controls['proximo_contacto'].disable();
      this.capturaForm.controls['fecha_apartado'].disable();
      this.capturaForm.controls['fecha_venta'].disable();
      this.capturaForm.controls['fecha_cancelacion'].disable();
      this.capturaForm.controls['visita'].disable();

    }
    
  }

  TraeFecha(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dbo.Trae_Fecha_Servidor',
      "params": []

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      /* this.capturaForm.value['fecha'] =  this.datepipe.transform(_response.success.recordset[0].fecha,'dd/MM/yyyy'); */
     /*  this.fecha = _response.success.recordsets[0]; */
      /* this.fecha = 'hola'; */
     
      this.capturaForm.setValue(
        {
          tipo_cliente: '',
          fecha: this.datepipe.transform(_response.success.recordset[0].fecha,'dd/MM/yyyy') ,
          folio:'',
          asesor:'',
          registro:'',
          nombres:'',
          apellido_paterno:'',
          apellido_materno:'',
          telefono:'',
          email:'',
          genero:'',
          nivel_interes:'',
          combo_canal:'',
          combo_medio:'',
          combo_submedio:'',
          referidor:'',
          combo_desarrollo:'',
          combo_prototipo:'',
          combo_manzana:'',
          tipo_credito:'',
          credito:'',
          institucion_financiera:'',
          ingresos:'',
          proximo_contacto:'',
          fecha_apartado:'',
          fecha_venta:'',
          fecha_cancelacion:'',
          visita:''
        }) 
        
    this.TraeAsesores();
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
      /* this.usuario = _response.success.recordset[0]; */
      if ('Asesor' == _response.success.recordset[0].tipo){
        /* this.capturaForm.value['asesor'] = _response.success.recordset[0].ID;
        this.capturaForm.value['registro'] = _response.success.recordset[0].nombres + ' ' + _response.success.recordset[0].apellido_paterno + ' ' + _response.success.recordset[0].apellido_materno; */
      this._asesor = _response.success.recordset[0].ID;
      this.capturaForm.controls['visita'].disable();
      this.capturaForm.setValue(
          {
            tipo_cliente: 'Prospecto',
            fecha: this.capturaForm.value.fecha ,
            folio:'',
            asesor:_response.success.recordset[0].ID,
            registro:_response.success.recordset[0].nombres + ' ' + _response.success.recordset[0].apellido_paterno + ' ' + _response.success.recordset[0].apellido_materno,
            nombres:'',
            apellido_paterno:'',
            apellido_materno:'',
            telefono:'',
            email:'',
            genero:'',
            nivel_interes:'',
            combo_canal:'',
            combo_medio:'',
            combo_submedio:'',
            referidor:'',
            combo_desarrollo:'',
            combo_prototipo:'',
            combo_manzana:'',
            tipo_credito:'',
            credito:'',
            institucion_financiera:'',
            ingresos:'',
            proximo_contacto:'',
            fecha_apartado:'',
            fecha_venta:'',
            fecha_cancelacion:'',
            visita:''
          })
         /*  this.TraeAsesores(); */
      }
      
      else{
        this.capturaForm.controls['visita'].enable();
        this.TraeAsesores();
      }

    })
  }

  TraeAsesores(){
    let id;
    id = localStorage.getItem('id');
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Asesores',
      "params": []

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
     
     /*  this.fecha = _response.success.recordsets[0]; */
      /* this.fecha = 'hola'; */
      this._combo_asesor = _response.success.recordset;
      this.TraeUsuario();
    })
  }

/*   AsesorSeleccionado(item){
    this._asesor = item;
  } */

  ComboCanales(){
    let id;
    id = localStorage.getItem('id');
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Canales',
      "params": []

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
     /*  this.fecha = _response.success.recordsets[0]; */
      /* this.fecha = 'hola'; */
      this._combo_canales = _response.success.recordset;
      this._combo_medios = [];
      this._combo_submedios = [];
    })
  }
 
  CanalSeleccionado(item){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Medios_Canal_CRM_Clientes',
      "params": [item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      if(_response.success.recordset.length > 0){
        this.medio_requerido = true;
      }
      else{
        this.boton_guarda = true;
      }
      this._combo_medios = _response.success.recordset;
      this._combo_submedios = [];
    })
  }

  MedioSeleccionado(item){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Submedios_Medios_Canal_CRM_Clientes',
      "params": [item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      if(_response.success.recordset.length > 0){
        this.submedio_requerido = true;
      }
      else{
        this.boton_guarda = true;
      }
      this._combo_submedios = _response.success.recordset;

    })
  }

  ComboDesarrollos(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Desarrollos',
      "params": [0]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._combo_desarrollos = _response.success.recordset;

    })
  }

  DesarrolloSeleccionado(item){
    this._d_s = item;
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Prototipos',
      "params": [item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._combo_prototipos = _response.success.recordset;
      this._combo_manzanas = '';
    })
  }

  PrototipoSeleccionado(item){
    this._combo_manzanas = '';
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Manzanas',
      "params": ["'" + this._d_s + "','" ,  item + "'"]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._combo_manzanas = _response.success.recordset;

    })
  }

  ComboCreditos(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Tipos_de_Credito',
      "params": []

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._combo_tipos_creditos = _response.success.recordsets[0];
    })
  }

  TipoCreditoSeleccionado(item){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Credito_Tipos_CRM_Clientes',
      "params": [item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      
      let _response;
      _response = response;
      this._combo_creditos = _response.success.recordsets[0];
    })
  }

  CreditoSeleccionado(item){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Institucion_Credito_Tipo_CRM_Clientes',
      "params": [item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._combo_institucion_financiera = _response.success.recordset;

    })
  }

  BuscarCliente(){
    
    
  }

  Nuevo(){    
   
    
    this.TraeFecha();

    this.capturaForm.value['folio'] = 0;
    this.capturaForm.controls['tipo_cliente'].enable();
    this.capturaForm.controls['asesor'].enable();
    this.capturaForm.controls['registro'].enable();
    this.capturaForm.controls['nombres'].enable();
    this.capturaForm.controls['apellido_paterno'].enable();
    this.capturaForm.controls['apellido_materno'].enable();
    this.capturaForm.controls['telefono'].enable();
    this.capturaForm.controls['email'].enable();
    this.capturaForm.controls['genero'].enable();
    this.capturaForm.controls['nivel_interes'].enable();
    this.capturaForm.controls['combo_canal'].enable();
    this.capturaForm.controls['combo_medio'].enable();
    this.capturaForm.controls['combo_submedio'].enable();
    this.capturaForm.controls['referidor'].enable();
    this.capturaForm.controls['combo_desarrollo'].enable();
    this.capturaForm.controls['combo_prototipo'].enable();
    this.capturaForm.controls['combo_manzana'].enable();
    this.capturaForm.controls['tipo_credito'].enable();
    this.capturaForm.controls['credito'].enable();
    this.capturaForm.controls['institucion_financiera'].enable();
    this.capturaForm.controls['ingresos'].enable();
    this.capturaForm.controls['proximo_contacto'].enable();
    this.capturaForm.controls['fecha_apartado'].enable();
    this.capturaForm.controls['fecha_venta'].enable();
    this.capturaForm.controls['fecha_cancelacion'].enable();
    
  }

  Cancelar(){
    this.BloquearCampos(1);
  }

  Guarda(){
/*     if(this.capturaForm.value.proximo_contacto == ''){
      this.capturaForm.value.proximo_contacto = null;
    }
    if(this.capturaForm.value.visita == ''){
      this.capturaForm.value.visita = null;
    } */
    if(this.capturaForm.value.folio == ''){
      this.capturaForm.value.folio = 0;
    }
   
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Guarda_Clientes',
      "params": ["'" + this.capturaForm.value.folio + "','" 
          ,  '' + "','" 
          ,  this.capturaForm.value.tipo_cliente + "','" 
          ,  this.capturaForm.value.asesor +"','"  
          ,  this._asesor +"','"  
          ,  this.capturaForm.value.nombres +"','"  
          ,  this.capturaForm.value.apellido_paterno +"','"  
          ,  this.capturaForm.value.apellido_materno +"','"  
          ,  this.capturaForm.value.telefono +"','"  
          ,  this.capturaForm.value.email +"','"  
          ,  this.capturaForm.value.genero +"','"  
          ,  this.capturaForm.value.nivel_interes +"','"  
          ,  this.capturaForm.value.combo_canal +"','"  
          ,  this.capturaForm.value.combo_medio +"','"  
          ,  this.capturaForm.value.combo_submedio +"','"  
          ,  this.capturaForm.value.referidor +"','"  
          ,  this.capturaForm.value.combo_desarrollo +"','"  
          ,  this.capturaForm.value.combo_prototipo +"','"  
          ,  this.capturaForm.value.combo_manzana +"','"  
          ,  this.capturaForm.value.tipo_credito +"','"  
          ,  this.capturaForm.value.credito +"','"  
          ,  this.capturaForm.value.institucion_financiera +"','" 
          ,  this.capturaForm.value.ingresos +"','"  
          ,  this.capturaForm.value.proximo_contacto +"','"  
          ,  this.capturaForm.value.fecha_apartado +"','"  
          ,  this.capturaForm.value.fecha_venta +"','"  
          ,  this.capturaForm.value.fecha_cancelacion +"','"  
          ,  this.capturaForm.value.visita +"'" 
        ]
      /* dvp.Guarda_Canales_CRM 7,NaNNuevos Otro',NaNActivo'*/
    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      let d = _response.success.recordsets[0];
      if(d[0].error == 1){
        alert(d[0].mensaje);
      }
      else{
        alert(d[0].mensaje);
        
      }
      
     
    })
  }
 
}
