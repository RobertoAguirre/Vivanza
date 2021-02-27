import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ExportService } from '../../services/export.service';
/* import * as bootstrap from "bootstrap"; 
import * as $ from 'jquery'; */

@Component({
  selector: 'app-crmclientes',
  templateUrl: './crmclientes.component.html',
  styleUrls: ['./crmclientes.component.css'],
  providers: [DatePipe]
})
export class CrmclientesComponent implements OnInit {
  @ViewChild('mytablalocal') userTable: ElementRef; //referencia a la tabla a exportar
  public validaciones;
  public admon = '';
  public  btn_exporta = false;
  public no_medio = 0;
  public no_submedio = 0;
  public _info_financiera = false;
  public nombre_registra;
  public btn_btn = false;
  public btn_apartado = true;
  public id_persona_graba;
  public btn_com = false;
  public btns = false;
  public _pc;
  public _fa;
  public _fc;
  public _fv;
  public _v;
  public consulta;
  public nombre;
  public telefono;
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
  public _combo_buscar;
  public _combo_clientes;
  public dataset;
  public label;
  public fecha;
  public usuario=[];
  public id;
  public _d_s;
  public _asesor;
  public lista_clientes;
  public lista_comentarios = [];
  public datos_cliente = 0;
  public visitas_cliente;
  public editar = false;
  public _es_asesor = 0;
  public visit;
  public visitas = [];
  public _visita1 = false;
  public _visita2 = false;
  public _visita3 = false;
  public _visita4 = false;
  public id_cliente_apartado;
  public _asesor_v = true;
  public prospectos;
  public clientes_potenciales;
  public apartados;
  public ventas;
  public cancelados;
  public _visita_seleccionado = 0;

  capturaForm = this.formBuilder.group({
    tipo_cliente:['',Validators.required],
    fecha:['',Validators.required],
    folio:[''],
    asesor:['',Validators.required],
    registro:['',Validators.required],
    nombres:['',Validators.required],
    apellido_paterno:['',Validators.required],
    apellido_materno:[''],
    telefono:['',Validators.required],
    email:[''],
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
    visita2:[''],
    visita3:[''],
    visita4:[''],
    comentario:['']
  })

  capturaFormBuscar = this.formBuilder.group({
    consulta:['',Validators.required],
    buscar:['',Validators.required]

  })


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    public formBuilder: FormBuilder,
    private exportService: ExportService,
    public datepipe: DatePipe
  ) {
    

   }

  ngOnInit(): void {
    /* $('#myModal').modal('show'); */
    /* $('html,body').scrollTop(0); */
    
   /*   $('#myModal').modal('show');  */
  /*  $('#selectTipo').prop('disabled', true); */
    this.BloquearCampos(0);
/*     this.visitas = [
      {visita1: ''},
      {visita2: ''},
      {visita3: ''},
      {visita4: ''},
    ] */
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
      {nombre: 'De $40,000 a $50,000 mensuales'},
      {nombre: 'Más de $50,000 mensuales'}
    ]
    this._combo_buscar = [
      {nombre: 'Nombre'},
      {nombre: 'Teléfono'},
    ]
/*     this.TraeFecha();
    this.TraeUsuario(); */
    this.ComboCanales();
    this.ComboDesarrollos();
    this.ComboCreditos();
    this.ComboClientes();
    this.ResumenVentas();
 
  }

    Trae(){
      let data = {
        "appname":"VIVANZA",
        "sp": 'dvp.Resumen_Clientes',
        "params": []
  
      }
      this.apiService.ejecuta(data).subscribe((response) => {
        let _response;
        _response = response;
        this.dataset = _response.success.recordset;
        this.btn_exporta = true;     
      })
    }

  exportElmToExcel(): void {
    this.exportService.exportTableElmToExcel(this.userTable, 'user_data');
    this.btn_exporta = false; 
  }

  ResumenVentas(){
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
      this.admon = _response.success.recordset[0].tipo;
      if ('Asesor' == _response.success.recordset[0].tipo){
        this._es_asesor = 1;
        let data = {
          "appname":"VIVANZA",
          "sp": 'dvp.Resumen_Ventas',
          "params": ["'" + localStorage.getItem('id') + "','" 
          ,  1 + "'" ]
    
        }
    
        this.apiService.ejecuta(data).subscribe((response) => {
          let _response;
          _response = response;
          let p,cl,a,v,c;

          p = _response.success.recordsets[0];
          cl = _response.success.recordsets[1];
          a = _response.success.recordsets[2];
          v = _response.success.recordsets[3];
          c = _response.success.recordsets[4];
          this.prospectos = p[0].prospectos;
          this.clientes_potenciales = cl[0].clientes_potenciales;
          this.apartados = a[0].apartado;
          this.ventas = v[0].vendido;
          this.cancelados = c[0].cancelado; 
        })
      }
      else{
        let data = {
          "appname":"VIVANZA",
          "sp": 'dvp.Resumen_Ventas',
          "params": ["'" + localStorage.getItem('id') + "','" 
          ,  0 + "'" ]
    
        }
    
        this.apiService.ejecuta(data).subscribe((response) => {
          let _response;
          _response = response;
          let p,cl,a,v,c;

          p = _response.success.recordsets[0];
          cl = _response.success.recordsets[1];
          a = _response.success.recordsets[2];
          v = _response.success.recordsets[3];
          c = _response.success.recordsets[4];
          this.prospectos = p[0].prospectos;
          this.clientes_potenciales = cl[0].clientes_potenciales;
          this.apartados = a[0].apartado;
          this.ventas = v[0].vendido;
          this.cancelados = c[0].cancelado; 
        })
      }
    })


    
  }

  BloquearCampos(item){
    this.btn_com = true;
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
            visita:'',
            visita2:'',
            visita3:'',
            visita4:'',
            comentario:['']
          }) 
          this.lista_comentarios = [];
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
          this.capturaForm.controls['visita2'].disable();
          this.capturaForm.controls['visita3'].disable();
          this.capturaForm.controls['visita4'].disable();
          this.capturaForm.controls['comentario'].disable();
          window.scroll(0, 0);
          this.btn_apartado = false;
    
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
      this.capturaForm.controls['visita2'].disable();
      this.capturaForm.controls['visita3'].disable();
      this.capturaForm.controls['visita4'].disable();
      this.capturaForm.controls['comentario'].disable();
      this.btn_apartado = false;
    }
    
  }

  ComboClientes(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Clientes',
      "params": []

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._combo_clientes = _response.success.recordset;
    })
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
          tipo_cliente: this.capturaForm.value.tipo_cliente,
          fecha: this.datepipe.transform(_response.success.recordset[0].fecha,'dd/MM/yyyy') ,
          folio:this.capturaForm.value.folio,
          asesor:this.capturaForm.value.asesor,
          registro:this.capturaForm.value.registro,
          nombres:this.capturaForm.value.nombres,
          apellido_paterno:this.capturaForm.value.apellido_paterno,
          apellido_materno:this.capturaForm.value.apellido_materno,
          telefono:this.capturaForm.value.telefono,
          email:this.capturaForm.value.email,
          genero:this.capturaForm.value.genero,
          nivel_interes:this.capturaForm.value.nivel_interes,
          combo_canal:this.capturaForm.value.combo_canal,
          combo_medio:this.capturaForm.value.combo_medio,
          combo_submedio:this.capturaForm.value.combo_submedio,
          referidor:this.capturaForm.value.referidor ,
          combo_desarrollo:this.capturaForm.value.combo_desarrollo,
          combo_prototipo:this.capturaForm.value.combo_prototipo,
          combo_manzana:this.capturaForm.value.combo_manzana ,
          tipo_credito:this.capturaForm.value.tipo_credito,
          credito:this.capturaForm.value.credito,
          institucion_financiera:this.capturaForm.value.institucion_financiera,
          ingresos:this.capturaForm.value.ingresos,
          proximo_contacto:this.capturaForm.value.proximo_contacto,
          fecha_apartado:this.capturaForm.value.fecha_apartado,
          fecha_venta:this.capturaForm.value.fecha_venta,
          fecha_cancelacion:this.capturaForm.value.fecha_cancelacion,
          visita:'',
          visita2:'',
          visita3:'',
          visita4:'',
          comentario:['']
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
      this._es_asesor = 1;
      this._asesor = _response.success.recordset[0].ID;
      this.capturaForm.controls['visita'].disable();
      this.capturaForm.controls['visita2'].disable();
      this.capturaForm.controls['visita3'].disable();
      this.capturaForm.controls['visita4'].disable();
      this.capturaForm.setValue(
          {
            tipo_cliente: 'Prospecto',
            fecha: this.capturaForm.value.fecha ,
            folio:'',
            asesor:localStorage.getItem('persona'),
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
            proximo_contacto:this.capturaForm.value.proximo_contacto,
            fecha_apartado:'',
            fecha_venta:'',
            fecha_cancelacion:'',
            visita:'',
            visita2:'',
            visita3:'',
            visita4:'',
            comentario:['']
          })
         /*  this.TraeAsesores(); */
      }
      
      else{
        this._es_asesor = 0;
        this.capturaForm.controls['visita'].enable();
        this.capturaForm.controls['visita2'].enable();
        this.capturaForm.controls['visita3'].enable();
        this.capturaForm.controls['visita4'].enable();
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
            proximo_contacto:this.capturaForm.value.proximo_contacto,
            fecha_apartado:'',
            fecha_venta:'',
            fecha_cancelacion:'',
            visita:'',
            visita2:'',
            visita3:'',
            visita4:'',
            comentario:['']
          })
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
      /* this.TraeUsuario(); */
    })
  }

  EsAsesor(){
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
      if ('Asesor' == _response.success.recordset[0].tipo){
        this._es_asesor = 1;
        this._asesor_v = false;
        this.capturaForm.value.asesor = localStorage.getItem('persona');
        this.capturaForm.controls['visita'].disable();
        this.capturaForm.controls['visita2'].disable();
        this.capturaForm.controls['visita3'].disable();
        this.capturaForm.controls['visita4'].disable();
      }
      else{
        this._asesor_v = true;
        this.capturaForm.controls['visita'].enable();
        this.capturaForm.controls['visita2'].enable();
        this.capturaForm.controls['visita3'].enable();
        this.capturaForm.controls['visita4'].enable();
      }
    })
  }

  BuscaCliente(consulta){
    this.EsAsesor();
    this.capturaFormBuscar;
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Busca_Clientes',
      "params": ["'" + this.capturaFormBuscar.value.consulta + "','" 
            ,  this.capturaFormBuscar.value.buscar + "','" 
            ,  this._es_asesor + "','" 
            ,  localStorage.getItem('id') + "'"
           ]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
     /*  this.fecha = _response.success.recordsets[0]; */
      /* this.fecha = 'hola'; */
      this.lista_clientes = _response.success.recordset;
    })
  }

  EditarCliente(item){
    let id;
    id = item.id_cliente;
    this.id_cliente_apartado = id;
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Cliente',
      "params": [id]

    }
    this.editar=false;
    this.lista_clientes = [];
    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      this.btn_com = false;
      _response = response;
      let apartado;
      apartado = _response.success.recordset[0].tipo_cliente;
      if(apartado == 'Apartado'){
        this.btn_apartado = true;
      }
      this.visit = _response.success.recordsets[1];
      this.visit.forEach(value => {
        let u;
        u = value.visita.slice(0,-14);
        if (u == '1900-01-01'){
          u = '';
        }
        let c = {
          visita:u
        }
        this.visitas.push(c);
      })
      if(this.visitas[0] == undefined){
        let c = {
          visita:''
        }
        this.visitas.push(c);
        this._visita1 = false;
      }
      else{
        this._visita1 = true;
      }
      if(this.visitas[1] == undefined){
        let c = {
          visita:''
        }
        this.visitas.push(c);
        this._visita2 = false;
      }
      else{
        this._visita2 = true;
      }
      if(this.visitas[2] == undefined){
        let c = {
          visita:''
        }
        this.visitas.push(c);
        this._visita3 = false;
      }
      else{
        this._visita3 = true;
      }
      if(this.visitas[3] == undefined){
        let c = {
          visita:''
        }
        this.visitas.push(c);
        this._visita4 = false;
      }
      else{
        this._visita4 = true;
      }

      this.nombre_registra =_response.success.recordset[0].nombre_registra;
     /*  this.id_persona_graba = _response.success.recordset[0].id_presona_regitra; */
     this.id_persona_graba = _response.success.recordset[0].id_asesor;
      if(localStorage.getItem('id') == this.id_persona_graba){
      this.capturaForm.value.asesor = localStorage.getItem('persona');
     }
     else{
      this.capturaForm.value.asesor = this.id_persona_graba;
      this._asesor_v = true;

     } 
      this.datos_cliente = _response.success.recordset[0].id_seguimiento_venta_contacto;
      this.visitas_cliente = _response.success.recordset[1];
      this.CanalSeleccionado(_response.success.recordset[0].id_canal);
      this.TraeAsesores();
      this.MedioSeleccionado(_response.success.recordset[0].id_medio);
      this.TipoCreditoSeleccionado(_response.success.recordset[0].id_tipo_credito);
      this.CreditoSeleccionado(_response.success.recordset[0].id_credito);
      this.DesarrolloSeleccionado(_response.success.recordset[0].id_desarrollo);
      this.PrototipoSeleccionado(_response.success.recordset[0].id_tipo_vivienda);
      if(_response.success.recordset[0].fecha_alta != null){
        let u;
          u = _response.success.recordset[0].fecha_alta.replace("T", " ");
          u = u.slice(0,-8);
          _response.success.recordset[0].fecha_alta = u;
       /*  this._pc = _response.success.recordset[0].proximo_contacto.slice(0,-8); */
      }
      if(_response.success.recordset[0].proximo_contacto != null){
        _response.success.recordset[0].proximo_contacto = _response.success.recordset[0].proximo_contacto.slice(0,-14);
        if (_response.success.recordset[0].proximo_contacto == '1900-01-01'){
          this._pc = '';
        }
        else{
          this._pc = _response.success.recordset[0].proximo_contacto.slice(0,-8);
        }
        
      }
      else{
       this. _pc = '';
      }
      if(_response.success.recordset[0].fecha_apartado != null){
        
        this._fa = _response.success.recordset[0].fecha_apartado.slice(0,-14);
      }
      else{
       this. _fa = '';
      }
      if(_response.success.recordset[0].fecha_cancelacion != null){
        
        this._fc = _response.success.recordset[0].fecha_cancelacion.slice(0,-14);
      }
      else{
       this. _fc = '';
      }
      if(_response.success.recordset[0].fecha_venta != null){
        
        this._fv = _response.success.recordset[0].fecha_venta.slice(0,-14);
      }
      else{
       this. _fv = '';
      }
      
      this.capturaForm.setValue(
        {
          tipo_cliente: _response.success.recordset[0].tipo_cliente,
         /*  fecha: this.datepipe.transform(_response.success.recordset[0].fecha_alta,'dd/MM/yyyy'), */
          fecha: _response.success.recordset[0].fecha_alta,
          folio:_response.success.recordset[0].id_cliente,
          asesor:this.capturaForm.value.asesor,
          registro:_response.success.recordset[0].nombre_registra,
          nombres:_response.success.recordset[0].nombres,
          apellido_paterno:_response.success.recordset[0].apellido_paterno,
          apellido_materno:_response.success.recordset[0].apellido_materno,
          telefono:_response.success.recordset[0].numero,
          email:_response.success.recordset[0].correo,
          genero:_response.success.recordset[0].sexo,
          nivel_interes:_response.success.recordset[0].nivel_interes,
          combo_canal:_response.success.recordset[0].id_canal,
          combo_medio:_response.success.recordset[0].id_medio,
          combo_submedio:_response.success.recordset[0].id_submedio,
          referidor:_response.success.recordset[0].id_referidor,
          combo_desarrollo:_response.success.recordset[0].id_desarrollo,
          combo_prototipo:_response.success.recordset[0].id_tipo_vivienda,
          combo_manzana:_response.success.recordset[0].id_sembrado,
          tipo_credito:_response.success.recordset[0].id_tipo_credito,
          credito:_response.success.recordset[0].id_credito,
          institucion_financiera:_response.success.recordset[0].id_institucion_financiera,
          ingresos:_response.success.recordset[0].ingresos,
          proximo_contacto: this._pc,
          fecha_apartado: this._fa,
          fecha_venta:this._fv,
          fecha_cancelacion:this._fc,
          visita:this.visitas[0].visita,
          visita2:this.visitas[1].visita,
          visita3:this.visitas[2].visita,
          visita4:this.visitas[3].visita,
          comentario:['']
        }) 
        _response.success.recordsets[2].forEach(value => {
          let u;
          u = value.fecha.replace("T", " ");
          u = u.slice(0,-8);
          let c = {
            fecha:u,
            nombre:value.nombre,
            comentario:value.comentario
          }
          this.lista_comentarios.push(c);
        })
   
        this.capturaForm.value['folio'] = 0;
        this.capturaForm.controls['tipo_cliente'].enable();
        this.capturaForm.controls['asesor'].enable();
        /* this.capturaForm.controls['registro'].enable(); */
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
        this.capturaForm.controls['comentario'].enable();
        /* this.capturaForm.controls['visita'].enable();
        this.capturaForm.controls['visita2'].enable();
        this.capturaForm.controls['visita3'].enable();
        this.capturaForm.controls['visita4'].enable(); */
       /*  this.EsAsesor(); */
    })
  }

  FechaApartadoContacto(item){
    if(item == 'Apartado'){
      this._info_financiera = true;

    }
    if(this.capturaForm.value.comentario == undefined){
      this.capturaForm.value.comentario = '';
    }
    if(this.capturaForm.value.visita == undefined){
      this.capturaForm.value.visita = '';
    }
    if(this.capturaForm.value.visita2 == undefined){
      this.capturaForm.value.visita2 = '';
    }
    if(this.capturaForm.value.visita3 == undefined){
      this.capturaForm.value.visita3 = '';
    }
    if(this.capturaForm.value.visita4 == undefined){
      this.capturaForm.value.visita4 = '';
    }
    this.capturaForm.setValue(
      {
        tipo_cliente: item,
        fecha: this.capturaForm.value.fecha ,
        folio:this.capturaForm.value.folio,
        asesor:this.capturaForm.value.asesor,
        registro:this.capturaForm.value.registro,
        nombres:this.capturaForm.value.nombres,
        apellido_paterno:this.capturaForm.value.apellido_paterno,
        apellido_materno:this.capturaForm.value.apellido_materno,
        telefono:this.capturaForm.value.telefono,
        email:this.capturaForm.value.email,
        genero:this.capturaForm.value.genero,
        nivel_interes:this.capturaForm.value.nivel_interes,
        combo_canal:this.capturaForm.value.combo_canal,
        combo_medio:this.capturaForm.value.combo_medio,
        combo_submedio:this.capturaForm.value.combo_submedio,
        referidor:this.capturaForm.value.referidor ,
        combo_desarrollo:this.capturaForm.value.combo_desarrollo,
        combo_prototipo:this.capturaForm.value.combo_prototipo,
        combo_manzana:this.capturaForm.value.combo_manzana ,
        tipo_credito:this.capturaForm.value.tipo_credito,
        credito:this.capturaForm.value.credito,
        institucion_financiera:this.capturaForm.value.institucion_financiera,
        ingresos:this.capturaForm.value.ingresos,
        proximo_contacto:this.capturaForm.value.proximo_contacto,
        fecha_apartado:this.capturaForm.value.fecha_apartado,
        fecha_venta:this.capturaForm.value.fecha_venta,
        fecha_cancelacion:this.capturaForm.value.fecha_cancelacion,
        visita:this.capturaForm.value.visita,
        visita2:this.capturaForm.value.visita2,
        visita3:this.capturaForm.value.visita3,
        visita4:this.capturaForm.value.visita4,
        comentario:this.capturaForm.value.comentario
      });
     
  }

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
      "sp": 'dvp.Combo_Desarrollos_Asesores',
      "params": [localStorage.getItem('id')]

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
      this._combo_manzanas = [];
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
      if(_response.success.recordsets[0].length == 0){
        this.no_medio = 0;
        this.no_submedio = 0;
      }
      else{
        this.no_medio = 1;
      }
      this._combo_creditos = _response.success.recordsets[0];
      this._combo_institucion_financiera = [];
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
      if(_response.success.recordsets[0].length == 0){
        this.no_submedio = 0;
      }
      else{
        this.no_submedio = 1;
      }
      this._combo_institucion_financiera = _response.success.recordset;
      
    })
  }

  BuscarCliente(){
    window.scroll(0, 0);
    this.capturaFormBuscar.setValue(
      {
        consulta: '',
        buscar: 'Nombre'
      })
    this.editar = true;
    this.btns = true;
    
  }

  GuardaComentarios(){
    if(this.capturaForm.value.comentario == ''){
      alert('El comentario no puede ir en blanco.');
    }
    else{
      let u;
      u = {
        fecha:this.capturaForm.value.fecha,
        nombre:localStorage.getItem('persona'),
        comentario: this.capturaForm.value.comentario
      }
  
      this.lista_comentarios.push(u);
      this.btn_com = true;
    }
    

  }

  Nuevo(){   
    this.btn_com = false; 
    this.btns = true;
    this.TraeUsuario();
    this.TraeFecha();
    this._visita1 = false;
    this._visita2 = false;
    this._visita3 = false;
    this._visita4 = false;
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
    this.capturaForm.controls['comentario'].enable();
    this.EsAsesor();
  }

  VisitaSeleccionado(item){
    this._visita_seleccionado = 1;
    this.capturaForm.setValue(
      {
        tipo_cliente: 'Cliente Potencial',
        fecha: this.capturaForm.value.fecha ,
        folio:this.capturaForm.value.folio,
        asesor:this.capturaForm.value.asesor,
        registro:this.nombre_registra,
        nombres:this.capturaForm.value.nombres,
        apellido_paterno:this.capturaForm.value.apellido_paterno,
        apellido_materno:this.capturaForm.value.apellido_materno,
        telefono:this.capturaForm.value.telefono,
        email:this.capturaForm.value.email,
        genero:this.capturaForm.value.genero,
        nivel_interes:this.capturaForm.value.nivel_interes,
        combo_canal:this.capturaForm.value.combo_canal,
        combo_medio:this.capturaForm.value.combo_medio,
        combo_submedio:this.capturaForm.value.combo_submedio,
        referidor:this.capturaForm.value.referidor ,
        combo_desarrollo:this.capturaForm.value.combo_desarrollo,
        combo_prototipo:this.capturaForm.value.combo_prototipo,
        combo_manzana:this.capturaForm.value.combo_manzana ,
        tipo_credito:this.capturaForm.value.tipo_credito,
        credito:this.capturaForm.value.credito,
        institucion_financiera:this.capturaForm.value.institucion_financiera,
        ingresos:this.capturaForm.value.ingresos,
        proximo_contacto:this.capturaForm.value.proximo_contacto,
        fecha_apartado:this.capturaForm.value.fecha_apartado,
        fecha_venta:this.capturaForm.value.fecha_venta,
        fecha_cancelacion:this.capturaForm.value.fecha_cancelacion,
        visita:this.capturaForm.value.visita,
        visita2:this.capturaForm.value.visita2,
        visita3:this.capturaForm.value.visita3,
        visita4:this.capturaForm.value.visita4,
        comentario:this.capturaForm.value.comentario
      });
     
  }

  Cancelar(){
    this.btn_exporta = false;
    this.lista_clientes = [];
    this.visitas = [];
    this.visit = '';
    this.btns = false;
    this.editar = false;
    this.capturaFormBuscar.setValue(
      {
        consulta: '',
        buscar: 'Nombre'
      })

    this.BloquearCampos(1);
  }

  CambioProximoContacto(item){
    this.datos_cliente = 0;
  }

  Guarda(){
    this.validaciones = false;
/*     if(this.capturaForm.value.proximo_contacto == ''){
      this.capturaForm.value.proximo_contacto = null;
    }
    if(this.capturaForm.value.visita == ''){
      this.capturaForm.value.visita = null;
    } */
    if(this.capturaForm.value.folio == ''){
      this.capturaForm.value.folio = 0;
    }
    if(this.capturaForm.value.visita == '' || this.capturaForm.value.visita == undefined){
      this.capturaForm.value.visita = '';
    }
    if(this.capturaForm.value.visita2 == '' || this.capturaForm.value.visita2 == undefined){
      this.capturaForm.value.visita2 = '';
    }
    if(this.capturaForm.value.visita3 == '' || this.capturaForm.value.visita3 == undefined){
      this.capturaForm.value.visita3 = '';
    }
    if(this.capturaForm.value.visita4 == '' || this.capturaForm.value.visita4 == undefined){
      this.capturaForm.value.visita4 = '';
    }
    if(this.id_persona_graba > 0){
      /* this._asesor = this.capturaForm.value.folio; */
      this._asesor = localStorage.getItem('id');
    }
    else{
      this._asesor = localStorage.getItem('id');
    }
    if(this.capturaForm.value.asesor > 0){
      this.capturaForm.value.asesor = this.capturaForm.value.asesor;
    }
    else{
      this.capturaForm.value.asesor = localStorage.getItem('id');
    }
    if(this.capturaForm.value.proximo_contacto != ''){
    
      this.capturaForm.value.proximo_contacto = this.capturaForm.value.proximo_contacto.replace("T", " ");
      
    } 
    if(this.capturaForm.value.comentario == undefined){
    
      this.capturaForm.value.comentario = '';
      
    } 
    if(this.datos_cliente == null){
      this.datos_cliente = 0;
    }
   
    if(this.capturaForm.value.fecha_apartado != ''){
      this._visita_seleccionado = 0;
      if(this.capturaForm.value.combo_desarrollo == ''){
        this.validaciones = true;
      }
      if(this.capturaForm.value.combo_prototipo == ''){
        this.validaciones = true;
      }
      if(this.capturaForm.value.combo_manzana == ''){
        this.validaciones = true;
      }
      if(this.capturaForm.value.tipo_credito == ''){
        this.validaciones = true;
      }
      if(this.no_medio == 1){
        if(this.capturaForm.value.credito == ''){
          this.validaciones = true;
        }
      }
      if(this.no_submedio == 1){
        if(this.capturaForm.value.institucion_financiera == ''){
          this.validaciones = true;
        }
      }
    }

    if(this._visita_seleccionado == 1){
      if(this.capturaForm.value.combo_desarrollo == ''){
        this.validaciones = true;
      }
    }

    if(this.validaciones == false){
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
            ,  this.capturaForm.value.visita +"','"  
            ,  this.capturaForm.value.visita2 +"','"  
            ,  this.capturaForm.value.visita3 +"','"  
            ,  this.capturaForm.value.visita4 +"','"  
            ,  this.datos_cliente +"','" 
            ,  this.capturaForm.value.comentario +"'" 
          ]
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
          this.btn_apartado = false;
          this.btns = false;
          this.btn_com = false;
          this.visitas = [];
          this.LimpiaFormulario();
          window.scroll(0, 0);
  
        }
        
       
      })
  
    }
    else{
      if(this._visita_seleccionado == 1){
        alert('Se debe de seleccionar un Desarrollo para poder agendar una visita.');
      }
      else{
        alert('Se den de llenar todos los campos de Información Financiera.');
      }
      
    }

  }

  Apartado(){
    this.router.navigate(['/crmclientesapartado'],{queryParams:{'item':this.id_cliente_apartado,'nombre':this.capturaForm.value.nombres + ' ' + this.capturaForm.value.apellido_paterno + ' ' + this.capturaForm.value.apellido_materno}});
  }

  LimpiaFormulario(){
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
        visita:'',
        visita2:'',
        visita3:'',
        visita4:'',
        comentario:['']
      }) 
      this.lista_comentarios = [];
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
      this.capturaForm.controls['visita2'].disable();
      this.capturaForm.controls['visita3'].disable();
      this.capturaForm.controls['visita4'].disable();
  }
 
}
