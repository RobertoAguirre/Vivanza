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
  dtOptions: DataTables.Settings = {};
  public table: any = $('#table2');
  
  public btn_activar;
  public _lote;
  public nuevo_cliente;
  public  hora_registro;
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
  public _fn;
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
  public _combo_desperfilado;
  public _combo_canales;
  public _combo_medios;
  public _combo_submedios;
  public _combo_desarrollos;
  public _combo_prototipos;
  public _combo_manzanas;
  public _combo_manzana;
  public _combo_lote;
  public _combo_etapas;
  public _combo_tipos_creditos;
  public _combo_creditos;
  public _combo_institucion_financiera;
  public _combo_ingresos;
  public _combo_buscar;
  public _combo_motivos;
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
  public desperfilados;
  public _visita_seleccionado = 0;
  public etapa;
  public vivienda_seleccionada;
  public _manzana;
  public _estatus_cliente;
  public _hora_server;
  public _tipo_usuario;
  public _desperfilado;
  public _cancelado;

  capturaForm = this.formBuilder.group({
    tipo_cliente:['',Validators.required],
    fecha:['',Validators.required],
    hora:[''],
    folio:[''],
    asesor:[''],
    registro:['',Validators.required],
    nombres:['',Validators.required],
    apellido_paterno:['',Validators.required],
    apellido_materno:[''],
    telefono:['',Validators.required],
    email:[''],
    fecha_nacimiento:[''],
    genero:['',Validators.required],
    nivel_interes:['',Validators.required],
    motivo_desperfilado:[''],
    combo_canal:['',Validators.required],
    combo_medio:[''],
    combo_submedio:[''],
    referidor:[''],
    combo_desarrollo:['',Validators.required],
    combo_prototipo:[''],
    combo_etapa:['',Validators.required],
    combo_manzana:[''],
    combo_lote:[''],
    tipo_credito:[''],
    credito:[''],
    institucion_financiera:[''],
    ingresos:[''],
    proximo_contacto:[''],
    fecha_apartado:[''],
    fecha_venta:[''],
    fecha_cancelacion:[''],
    motivo:[''],
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
    if(localStorage.getItem('tipo') === 'Administrador'){
      this.btn_activar = true;
    }
    else{
      this.btn_activar = false;
    }
    this._cancelado = false;
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
    this._combo_desperfilado = [
      {nombre: 'Desperfilado'},
      {nombre: 'Ya compro'},
      {nombre: 'Problemas crediticios'},
      {nombre: 'Desinterés'}
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
      {nombre: 'NOMBRE'},
      {nombre: 'TELÉFONO'},
    ]
/*     this.TraeFecha();
    this.TraeUsuario(); */
    this.ComboCanales();
    this.ComboDesarrollos();
    this.ComboCreditos();
    this.ComboClientes();
    this.ResumenVentas();
 
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      order:[],
      language:{
        "processing": "Cargando ...",
        "search": "Buscar:",
        "lengthMenu": "Mostrando _MENU_ registros por página",
        "zeroRecords": "No se encontraron registros",
        "info": "Mostrando página _PAGE_ de _PAGES_",
        "infoEmpty": "No hay registros disponibles",
        "infoFiltered": "(fitrados de un total de  _MAX_ registros)",
        "paginate": {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        }
      }
    };

  }

    Trae(){
      var asesor;
      if(this._es_asesor == 1){
        asesor  = localStorage.getItem('id');
      }
      else{
        asesor = 0;
      }
      let data = {
        "appname":"VIVANZA",
        "sp": 'dvp.Resumen_Clientes_2',
        "params": [localStorage.getItem('id')]
  
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
          let p,cl,a,v,c,d;

          p = _response.success.recordsets[0];
          cl = _response.success.recordsets[1];
          a = _response.success.recordsets[2];
          v = _response.success.recordsets[3];
          c = _response.success.recordsets[4];
          d = _response.success.recordsets[5];
          this.prospectos = p[0].prospectos;
          this.clientes_potenciales = cl[0].clientes_potenciales;
          this.apartados = a[0].apartado;
          this.ventas = v[0].vendido;
          this.cancelados = c[0].cancelado; 
          this.desperfilados = d[0].desperfilado; 
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
          let p,cl,a,v,c,d;

          p = _response.success.recordsets[0];
          cl = _response.success.recordsets[1];
          a = _response.success.recordsets[2];
          v = _response.success.recordsets[3];
          c = _response.success.recordsets[4];
          d = _response.success.recordsets[5];
          this.prospectos = p[0].prospectos;
          this.clientes_potenciales = cl[0].clientes_potenciales;
          this.apartados = a[0].apartado;
          this.ventas = v[0].vendido;
          this.cancelados = c[0].cancelado; 
          this.desperfilados = d[0].desperfilado; 
        })
      }
    })


    
  }

  BloquearCampos(item){
    this.btn_com = true;
    if(item == 1){
      let pregunta = confirm('¿Está seguro de querer cancelar?');
      if (pregunta == true){
        this._estatus_cliente = '';
        this.no_medio = 0;
        this.no_submedio = 0;
        this.medio_requerido = false;
        this.submedio_requerido = false;
        this.capturaForm.setValue(
          {
            tipo_cliente: '',
            fecha: '',
            hora: '',
            folio:'',
            asesor:'',
            registro:'',
            nombres:'',
            apellido_paterno:'',
            apellido_materno:'',
            telefono:'',
            email:'',
            fecha_nacimiento:'',
            genero:'',
            nivel_interes:'',
            motivo_desperfilado:'',
            combo_canal:'',
            combo_medio:'',
            combo_submedio:'',
            referidor:'',
            combo_desarrollo:'',
            combo_prototipo:'',
            combo_etapa:'',
            combo_manzana:'',
            combo_lote:'',
            tipo_credito:'',
            credito:'',
            institucion_financiera:'',
            ingresos:'',
            proximo_contacto:'',
            fecha_apartado:'',
            fecha_venta:'',
            fecha_cancelacion:'',
            motivo:'',
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
          this.capturaForm.controls['fecha_nacimiento'].disable();
          this.capturaForm.controls['genero'].disable();
          this.capturaForm.controls['nivel_interes'].disable();
          this.capturaForm.controls['combo_canal'].disable();
          this.capturaForm.controls['combo_medio'].disable();
          this.capturaForm.controls['combo_submedio'].disable();
          this.capturaForm.controls['referidor'].disable();
          this.capturaForm.controls['combo_desarrollo'].disable();
          this.capturaForm.controls['combo_prototipo'].disable();
          this.capturaForm.controls['combo_manzana'].disable();
          this.capturaForm.controls['combo_lote'].disable();
          this.capturaForm.controls['combo_etapa'].disable();
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
      this.capturaForm.controls['fecha_nacimiento'].disable();
      this.capturaForm.controls['genero'].disable();
      this.capturaForm.controls['nivel_interes'].disable();
      this.capturaForm.controls['combo_canal'].disable();
      this.capturaForm.controls['combo_medio'].disable();
      this.capturaForm.controls['combo_submedio'].disable();
      this.capturaForm.controls['referidor'].disable();
      this.capturaForm.controls['combo_desarrollo'].disable();
      this.capturaForm.controls['combo_prototipo'].disable();
      this.capturaForm.controls['combo_manzana'].disable();
      this.capturaForm.controls['combo_lote'].disable();
      this.capturaForm.controls['combo_etapa'].disable();
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
          hora:this.capturaForm.value.hora,
          folio:this.capturaForm.value.folio,
          asesor:this.capturaForm.value.asesor,
          registro:this.capturaForm.value.registro,
          nombres:this.capturaForm.value.nombres,
          apellido_paterno:this.capturaForm.value.apellido_paterno,
          apellido_materno:this.capturaForm.value.apellido_materno,
          telefono:this.capturaForm.value.telefono,
          email:this.capturaForm.value.email,
          fecha_nacimiento:this.capturaForm.value.fecha_nacimiento,
          genero:this.capturaForm.value.genero,
          nivel_interes:this.capturaForm.value.nivel_interes,
          motivo_desperfilado:this.capturaForm.value.motivo_desperfilado,
          combo_canal:this.capturaForm.value.combo_canal,
          combo_medio:this.capturaForm.value.combo_medio,
          combo_submedio:this.capturaForm.value.combo_submedio,
          referidor:this.capturaForm.value.referidor ,
          combo_desarrollo:this.capturaForm.value.combo_desarrollo,
          combo_prototipo:this.capturaForm.value.combo_prototipo,
          combo_etapa:this.capturaForm.value.combo_etapa,
          combo_manzana:this.capturaForm.value.combo_manzana ,
          combo_lote:this.capturaForm.value.combo_lote ,
          tipo_credito:this.capturaForm.value.tipo_credito,
          credito:this.capturaForm.value.credito,
          institucion_financiera:this.capturaForm.value.institucion_financiera,
          ingresos:this.capturaForm.value.ingresos,
          proximo_contacto:this.capturaForm.value.proximo_contacto,
          fecha_apartado:this.capturaForm.value.fecha_apartado,
          fecha_venta:this.capturaForm.value.fecha_venta,
          fecha_cancelacion:this.capturaForm.value.fecha_cancelacion,
          motivo:this.capturaForm.value.motivo,
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
      if(_response.success.recordset[0].tipo === 'Promotor'){
        $("#asesor").prop("disabled",true);
      }
      else{
        $("#asesor").prop("disabled",false);
      }



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
            hora:'',
            folio:'',
            asesor:localStorage.getItem('persona'),
            registro:_response.success.recordset[0].nombres + ' ' + _response.success.recordset[0].apellido_paterno + ' ' + _response.success.recordset[0].apellido_materno,
            nombres:'',
            apellido_paterno:'',
            apellido_materno:'',
            telefono:'',
            email:'',
            fecha_nacimiento:'',
            genero:'',
            nivel_interes:'',
            motivo_desperfilado:'',
            combo_canal:'',
            combo_medio:'',
            combo_submedio:'',
            referidor:'',
            combo_desarrollo:'',
            combo_prototipo:'',
            combo_etapa:'',
            combo_manzana:'',
            combo_lote:'',
            tipo_credito:'',
            credito:'',
            institucion_financiera:'',
            ingresos:'',
            proximo_contacto:this.capturaForm.value.proximo_contacto,
            fecha_apartado:'',
            fecha_venta:'',
            fecha_cancelacion:'',
            motivo:'',
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
            hora:'',
            folio:'',
            asesor:'',
            registro:_response.success.recordset[0].nombres + ' ' + _response.success.recordset[0].apellido_paterno + ' ' + _response.success.recordset[0].apellido_materno,
            nombres:'',
            apellido_paterno:'',
            apellido_materno:'',
            telefono:'',
            email:'',
            fecha_nacimiento:'',
            genero:'',
            nivel_interes:'',
            motivo_desperfilado:'',
            combo_canal:'',
            combo_medio:'',
            combo_submedio:'',
            referidor:'',
            combo_desarrollo:'',
            combo_prototipo:'',
            combo_etapa:'',
            combo_manzana:'',
            combo_lote:'',
            tipo_credito:'',
            credito:'',
            institucion_financiera:'',
            ingresos:'',
            proximo_contacto:this.capturaForm.value.proximo_contacto,
            fecha_apartado:'',
            fecha_venta:'',
            fecha_cancelacion:'',
            motivo:'',
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
           /*  ,  this._es_asesor + "','"  */
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

  NivelSeleccionado(item){
    if(item === 'No perfilado'){
      this._desperfilado = true;
    }
    else{
      this._desperfilado = false;
      
    }
    
  }

  TipoUsuario(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Usuarios_CRM',
      "params": [localStorage.getItem('id')]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      let a;
      a = _response.success.recordset[0].tipo;
      if(a === 'Promotor'){
        $("#asesor").prop("disabled",true);
      }
      if(a === 'Asesor' || a === 'Promotor'){
        /* this._tipo_usuario = true; */
        $("#canal").prop("disabled",true);
        $("#medio").prop("disabled",true);
        $("#submedio").prop("disabled",true);
        $("#referidor").prop("disabled",true);
        $("#fecha_apartado").prop("disabled",true);
        $("#fecha_venta").prop("disabled",true);
        $("#fecha_cancelacion").prop("disabled",true);
        $("#motivo_cancelado").prop("disabled",true);
      }
      if(a === 'Coordinador'){
        /* this._tipo_usuario = true; */
        $("#canal").prop("disabled",true);
        $("#medio").prop("disabled",true);
        $("#submedio").prop("disabled",true);
        $("#referidor").prop("disabled",true);
        $("#fecha_venta").prop("disabled",true);
        $("#fecha_cancelacion").prop("disabled",true);
        $("#motivo_cancelado").prop("disabled",true);
      }

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
      this._estatus_cliente = apartado;
/*       if(apartado == 'Apartado'){
        this.btn_apartado = true;
        $("#manzana").prop("disabled",false);
        $("#lote").prop("disabled",false);
      }
      else{
        $("#manzana").prop("disabled",true);
        $("#lote").prop("disabled",true);
      } */
      if(_response.success.recordset[0].motivo != null){
        this._cancelado = true;
        this.TraeMotivosCancelacion();
      }
     
      this.visit = _response.success.recordsets[1];
      this.visit.forEach(value => {
        let u;
        u = value.visita.slice(0,-8);
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
      this.DesarrolloSeleccionado(_response.success.recordset[0].id_desarrollo,1);
      this._d_s = _response.success.recordset[0].id_desarrollo;
      this.EtapaSeleccionada(_response.success.recordset[0].id_desarrollo,1);
      this.PrototipoSeleccionado(_response.success.recordset[0].id_tipo_vivienda,1);
      this.vivienda_seleccionada = _response.success.recordset[0].id_tipo_vivienda;
      /* this.EtapaSeleccionada(_response.success.recordset[0].id_etapa_desarrollo,1); */
      this._manzana = _response.success.recordset[0].manzana; 
      if(_response.success.recordset[0].fecha_alta != null){
        let u,h;
          u = _response.success.recordset[0].fecha_alta.replace("T", " ");
          u = u.slice(0,-14);
          h = _response.success.recordset[0].fecha_alta.replace("T", " ");
          h = h.slice(11,-8);
          this.hora_registro = h;
          _response.success.recordset[0].fecha_alta = u;
       /*  this._pc = _response.success.recordset[0].proximo_contacto.slice(0,-8); */
      }
      if(_response.success.recordset[0].proximo_contacto != null){
       /*  this._pc = _response.success.recordset[0].proximo_contacto
        _response.success.recordset[0].proximo_contacto = _response.success.recordset[0].proximo_contacto.slice(0,-14); */
        if (_response.success.recordset[0].proximo_contacto.slice(0,-14) == '1900-01-01'){
          this._pc = '';
        }
        else{
          this._pc = _response.success.recordset[0].proximo_contacto.slice(0,-8);
        }
        
      }
    
      else{
       this. _pc = '';
      }

  /*     if(_response.success.recordsets[2].visita3 != null){
        this.visitas[2].visita = _response.success.recordsets[2].visita3.slice(0,-8);
      } */

      if(_response.success.recordset[0].fecha_nacimiento != null){
        
        this._fn = _response.success.recordset[0].fecha_nacimiento.slice(0,-14);
      }
      else{
       this. _fn = '';
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
          hora: this.hora_registro,
          folio:_response.success.recordset[0].id_cliente,
          asesor:this.capturaForm.value.asesor,
          registro:_response.success.recordset[0].nombre_registra,
          nombres:_response.success.recordset[0].nombres,
          apellido_paterno:_response.success.recordset[0].apellido_paterno,
          apellido_materno:_response.success.recordset[0].apellido_materno,
          telefono:_response.success.recordset[0].numero,
          email:_response.success.recordset[0].correo,
          fecha_nacimiento: this._fn,
          genero:_response.success.recordset[0].sexo,
          nivel_interes:_response.success.recordset[0].nivel_interes,
          motivo_desperfilado:_response.success.recordset[0].motivo_desperfilado,
          combo_canal:_response.success.recordset[0].id_canal,
          combo_medio:_response.success.recordset[0].id_medio,
          combo_submedio:_response.success.recordset[0].id_submedio,
          referidor:_response.success.recordset[0].id_referidor,
          combo_desarrollo:_response.success.recordset[0].id_desarrollo,
          combo_prototipo:_response.success.recordset[0].id_tipo_vivienda,
          combo_etapa:_response.success.recordset[0].id_etapa,
          combo_manzana:_response.success.recordset[0].manzana,
          combo_lote:_response.success.recordset[0].id_sembrado,
          tipo_credito:_response.success.recordset[0].id_tipo_credito,
          credito:_response.success.recordset[0].id_credito,
          institucion_financiera:_response.success.recordset[0].id_institucion_financiera,
          ingresos:_response.success.recordset[0].ingresos,
          proximo_contacto: this._pc,
          fecha_apartado: this._fa,
          fecha_venta:this._fv,
          fecha_cancelacion:this._fc,
          motivo:_response.success.recordset[0].motivo,
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
        this.capturaForm.controls['fecha_nacimiento'].enable();
        this.capturaForm.controls['genero'].enable();
        this.capturaForm.controls['nivel_interes'].enable();
        this.capturaForm.controls['combo_canal'].enable();
        this.capturaForm.controls['combo_medio'].enable();
        this.capturaForm.controls['combo_submedio'].enable();
        this.capturaForm.controls['referidor'].enable();
        this.capturaForm.controls['combo_desarrollo'].enable();
        this.capturaForm.controls['combo_prototipo'].enable();
        this.capturaForm.controls['combo_manzana'].enable();
        this.capturaForm.controls['combo_etapa'].enable();
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

        /////// bloquea fecha de cancelacion por campos null fecha de apartado y7o fecha de venta
       if(_response.success.recordset[0].fecha_apartado == null && _response.success.recordset[0].fecha_venta == null){
        $("#fecha_cancelacion").prop("disabled",true);
      }
      else{
        $("#fecha_cancelacion").prop("disabled",false);
      }
      /////Si el tipo de cliente es Apartado, Vendido o Cancelado se bloquean las visitas
      if(_response.success.recordset[0].tipo_cliente == 'Apartado' || _response.success.recordset[0].tipo_cliente == 'Vendido' || _response.success.recordset[0].tipo_cliente == 'Cancelado'){
       /*  this._visita1 = true; */
       $("#visita1").prop("disabled",true);
       $("#visita2").prop("disabled",true);
       $("#visita3").prop("disabled",true);
       $("#visita4").prop("disabled",true);
      /*   this._visita2 = true;
        this._visita3 = true;
        this._visita4 = true; */
      }
      if(apartado == 'Apartado'){
        this.btn_apartado = true;
        $("#manzana").prop("disabled",false);
        $("#lote").prop("disabled",false);
      }
      else{
        $("#manzana").prop("disabled",true);
        $("#lote").prop("disabled",true);
      }
       this.TipoUsuario();
    })
  }

  TraeMotivosCancelacion(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Motivos_Cancelacion_CRM',
      "params": [0]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._combo_motivos = _response.success.recordset;
    })
  }

  FechaApartadoContacto(item){
    if(item == 'Cancelado'){
      this._cancelado = true;
      this.TraeMotivosCancelacion();
    }
    if(item == 'Apartado'){
      this._info_financiera = true;
      this._estatus_cliente = 'Apartado';
      $("#manzana").prop("disabled",false);
      $("#lote").prop("disabled",false);
      if(this.capturaForm.value.tipo_credito === 0){
        this.capturaForm.value.tipo_credito = '';
      }
      this.capturaForm = this.formBuilder.group({
        tipo_cliente:[this.capturaForm.value.tipo_cliente,Validators.required],
        fecha:[this.capturaForm.value.fecha,Validators.required],
        hora:[this.capturaForm.value.fecha],
        folio:[this.capturaForm.value.folio],
        asesor:[this.capturaForm.value.asesor,Validators.required],
        registro:[this.nombre_registra,Validators.required],
        nombres:[this.capturaForm.value.nombres,Validators.required],
        apellido_paterno:[this.capturaForm.value.apellido_paterno,Validators.required],
        apellido_materno:[this.capturaForm.value.apellido_materno,Validators.required],
        telefono:[this.capturaForm.value.telefono,Validators.required],
        email:[this.capturaForm.value.email,Validators.required],
        fecha_nacimiento:[this.capturaForm.value.emailfecha_nacimiento],
        genero:[this.capturaForm.value.genero,Validators.required],
        nivel_interes:[this.capturaForm.value.nivel_interes,Validators.required],
        motivo_desperfilado:[this.capturaForm.value.motivo_desperfilado],
        combo_canal:[this.capturaForm.value.combo_canal,Validators.required],
        combo_medio:[this.capturaForm.value.combo_medio,Validators.required],
        combo_submedio:[this.capturaForm.value.combo_submedio],
        referidor:[this.capturaForm.value.referidor],
        combo_desarrollo:[this.capturaForm.value.combo_desarrollo,Validators.required],
        combo_prototipo:[this.capturaForm.value.combo_prototipo,Validators.required],
        combo_etapa:[this.capturaForm.value.combo_etapa,Validators.required],
        combo_manzana:[this.capturaForm.value.combo_manzana,Validators.required],
        combo_lote:[this.capturaForm.value.combo_lote,Validators.required],
        tipo_credito:[this.capturaForm.value.tipo_credito,Validators.required],
        credito:[this.capturaForm.value.credito],
        institucion_financiera:[this.capturaForm.value.institucion_financiera],
        ingresos:[this.capturaForm.value.ingresos,Validators.required],
        proximo_contacto:[this.capturaForm.value.proximo_contacto],
        fecha_apartado:[this.capturaForm.value.fecha_apartado],
        fecha_venta:[this.capturaForm.value.fecha_venta],
        fecha_cancelacion:[this.capturaForm.value.fecha_cancelacion],
        motivo:[this.capturaForm.value.motivo],
        visita:[this.capturaForm.value.visita],
        visita2:[this.capturaForm.value.visita2],
        visita3:[this.capturaForm.value.visita3],
        visita4:[this.capturaForm.value.visita4],
        comentario:[this.capturaForm.value.comentario]
      })

    }
    this.capturaForm.value.registro = this.nombre_registra;
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
        hora: this.capturaForm.value.hora ,
        folio:this.capturaForm.value.folio,
        asesor:this.capturaForm.value.asesor,
        registro:this.capturaForm.value.registro,
        nombres:this.capturaForm.value.nombres,
        apellido_paterno:this.capturaForm.value.apellido_paterno,
        apellido_materno:this.capturaForm.value.apellido_materno,
        telefono:this.capturaForm.value.telefono,
        email:this.capturaForm.value.email,
        fecha_nacimiento:this.capturaForm.value.fecha_nacimiento,
        genero:this.capturaForm.value.genero,
        nivel_interes:this.capturaForm.value.nivel_interes,
        motivo_desperfilado:this.capturaForm.value.motivo_desperfilado,
        combo_canal:this.capturaForm.value.combo_canal,
        combo_medio:this.capturaForm.value.combo_medio,
        combo_submedio:this.capturaForm.value.combo_submedio,
        referidor:this.capturaForm.value.referidor ,
        combo_desarrollo:this.capturaForm.value.combo_desarrollo,
        combo_prototipo:this.capturaForm.value.combo_prototipo,
        combo_etapa:this.capturaForm.value.combo_etapa,
        combo_manzana:this.capturaForm.value.combo_manzana ,
        combo_lote:this.capturaForm.value.combo_lote ,
        tipo_credito:this.capturaForm.value.tipo_credito,
        credito:this.capturaForm.value.credito,
        institucion_financiera:this.capturaForm.value.institucion_financiera,
        ingresos:this.capturaForm.value.ingresos,
        proximo_contacto:this.capturaForm.value.proximo_contacto,
        fecha_apartado:this.capturaForm.value.fecha_apartado,
        fecha_venta:this.capturaForm.value.fecha_venta,
        fecha_cancelacion:this.capturaForm.value.fecha_cancelacion,
        motivo:this.capturaForm.value.motivo,
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
    this._combo_submedios = [];
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

  DesarrolloSeleccionado(item,i){
    if(this.nuevo_cliente == true){
      $("#nombre").prop("disabled",false);
      $("#apellido_materno").prop("disabled",false);
      $("#apellido_paterno").prop("disabled",false);
      $("#telefono").prop("disabled",false);
      $("#correo").prop("disabled",false);
      $("#genero").prop("disabled",false);
      $("#nivel_interes").prop("disabled",false);
      $("#canal").prop("disabled",false);
      $("#medio").prop("disabled",false);
      $("#submedio").prop("disabled",false);
      $("#referidor").prop("disabled",false);
      $("#etapa").prop("disabled",false);
      $("#prototipo").prop("disabled",false);
      $("#tipo_credito").prop("disabled",false);
      $("#credito").prop("disabled",false);
      $("#institucion_financiera").prop("disabled",false);
      $("#ingresos").prop("disabled",false);
      $("#proximo_contacto").prop("disabled",false);
      $("#fecha_apartado").prop("disabled",false);
      $("#fecha_venta").prop("disabled",false);
      $("#fecha_cancelacion").prop("disabled",false);
      $("#motivo_cancelado").prop("disabled",false);
    }
    this._d_s = item;
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Etapas',
      "params": [item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      if(i === 1){
        this._combo_manzanas = _response.success.recordset;
      }
      else{
        this._combo_manzanas = _response.success.recordset;
        this.capturaForm.value.combo_prototipo = '';
        this._combo_lote = [];
        this._combo_manzana = [];
        this._combo_prototipos = [];
        var _reg;
        if(this.capturaForm.value.registro === undefined){
          _reg = this.nombre_registra;
        }
        else{
          _reg = this.capturaForm.value.registro;
        }
  
        this.capturaForm.setValue(
          {
            tipo_cliente: this.capturaForm.value.tipo_cliente,
            fecha: this.capturaForm.value.fecha ,
            hora: this.capturaForm.value.hora ,
            folio:this.capturaForm.value.folio,
            asesor:this.capturaForm.value.asesor,
            registro:_reg,
            nombres:this.capturaForm.value.nombres,
            apellido_paterno:this.capturaForm.value.apellido_paterno,
            apellido_materno:this.capturaForm.value.apellido_materno,
            telefono:this.capturaForm.value.telefono,
            email:this.capturaForm.value.email,
            fecha_nacimiento:this.capturaForm.value.fecha_nacimiento,
            genero:this.capturaForm.value.genero,
            nivel_interes:this.capturaForm.value.nivel_interes,
            motivo_desperfilado:this.capturaForm.value.motivo_desperfilado,
            combo_canal:this.capturaForm.value.combo_canal,
            combo_medio:this.capturaForm.value.combo_medio,
            combo_submedio:this.capturaForm.value.combo_submedio,
            referidor:this.capturaForm.value.referidor ,
            combo_desarrollo:this.capturaForm.value.combo_desarrollo,
            combo_prototipo:'',
            combo_etapa:'',
            combo_manzana:'' ,
            combo_lote:'',
            tipo_credito:this.capturaForm.value.tipo_credito,
            credito:this.capturaForm.value.credito,
            institucion_financiera:this.capturaForm.value.institucion_financiera,
            ingresos:this.capturaForm.value.ingresos,
            proximo_contacto:this.capturaForm.value.proximo_contacto,
            fecha_apartado:this.capturaForm.value.fecha_apartado,
            fecha_venta:this.capturaForm.value.fecha_venta,
            fecha_cancelacion:this.capturaForm.value.fecha_cancelacion,
            motivo:this.capturaForm.value.motivo,
            visita:this.capturaForm.value.visita,
            visita2:this.capturaForm.value.visita2,
            visita3:this.capturaForm.value.visita3,
            visita4:this.capturaForm.value.visita4,
            comentario:this.capturaForm.value.comentario
          });
  
      }
    })
  }

/*   PrototipoSeleccionado(item){
    this._combo_manzanas = '';
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Etapas',
      "params": ["'" + this._d_s + "','" ,  item + "'"]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._combo_etapas = _response.success.recordset;

    })
  } */

  EtapaSeleccionada(item,i){
    
   /*  this.capturaForm.value.combo_etapa = ''; */
    let data = { 
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Prototipos',
      "params": ["'" + this._d_s + "','" ,  item + "'"]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      if(i === 1){
        this._combo_prototipos = _response.success.recordset;
        this.vivienda_seleccionada = item;
      }
      else{
        this._combo_prototipos = [];
        this._combo_prototipos = _response.success.recordset;
        this.vivienda_seleccionada = item;
        this._combo_manzana = [];
        this._combo_lote = [];
        var _reg;
        if(this.capturaForm.value.registro === undefined){
          _reg = this.nombre_registra;
        }
        else{
          _reg = this.capturaForm.value.registro;
        }
  
        this.capturaForm.setValue(
          {
            tipo_cliente: this.capturaForm.value.tipo_cliente,
            fecha: this.capturaForm.value.fecha ,
            hora: this.capturaForm.value.hora ,
            folio:this.capturaForm.value.folio,
            asesor:this.capturaForm.value.asesor,
            registro:_reg,
            nombres:this.capturaForm.value.nombres,
            apellido_paterno:this.capturaForm.value.apellido_paterno,
            apellido_materno:this.capturaForm.value.apellido_materno,
            telefono:this.capturaForm.value.telefono,
            email:this.capturaForm.value.email,
            fecha_nacimiento:this.capturaForm.value.fecha_nacimiento,
            genero:this.capturaForm.value.genero,
            nivel_interes:this.capturaForm.value.nivel_interes,
            motivo_desperfilado:this.capturaForm.value.motivo_desperfilado,
            combo_canal:this.capturaForm.value.combo_canal,
            combo_medio:this.capturaForm.value.combo_medio,
            combo_submedio:this.capturaForm.value.combo_submedio,
            referidor:this.capturaForm.value.referidor ,
            combo_desarrollo:this.capturaForm.value.combo_desarrollo,
            combo_prototipo:'',
            combo_etapa:this.vivienda_seleccionada,
            combo_manzana:'' ,
            combo_lote:'' ,
            tipo_credito:this.capturaForm.value.tipo_credito,
            credito:this.capturaForm.value.credito,
            institucion_financiera:this.capturaForm.value.institucion_financiera,
            ingresos:this.capturaForm.value.ingresos,
            proximo_contacto:this.capturaForm.value.proximo_contacto,
            fecha_apartado:this.capturaForm.value.fecha_apartado,
            fecha_venta:this.capturaForm.value.fecha_venta,
            fecha_cancelacion:this.capturaForm.value.fecha_cancelacion,
            motivo:this.capturaForm.value.motivo,
            visita:this.capturaForm.value.visita,
            visita2:this.capturaForm.value.visita2,
            visita3:this.capturaForm.value.visita3,
            visita4:this.capturaForm.value.visita4,
            comentario:this.capturaForm.value.comentario
          });
      }
      
    })
  }
  PrototipoSeleccionado(item,i){
    
    
    let data = { 
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Manzanas',
      "params": ["'" + this.vivienda_seleccionada + "','" ,  item + "'"]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      if(i===1){
        this._combo_manzana = _response.success.recordset;
        this.etapa = _response.success.recordsets[1];
        $("#manzana").prop("disabled",false);
        $("#lote").prop("disabled",false);
        this._lote = item;
        this.ManzanaSeleccionada(this._manzana);
      }
      else{
        $("#manzana").prop("disabled",false);
        $("#lote").prop("disabled",false);
        this._lote = item;
        this._combo_manzana = _response.success.recordset;
        this.etapa = _response.success.recordsets[1];
        this._combo_lote = [];
        var _reg;
        if(this.capturaForm.value.registro === undefined){
          _reg = this.nombre_registra;
        }
        else{
          _reg = this.capturaForm.value.registro;
        }
        this.capturaForm.setValue(
          {
            tipo_cliente: this.capturaForm.value.tipo_cliente,
            fecha: this.capturaForm.value.fecha ,
            hora: this.capturaForm.value.hora ,
            folio:this.capturaForm.value.folio,
            asesor:this.capturaForm.value.asesor,
            registro:_reg,
            nombres:this.capturaForm.value.nombres,
            apellido_paterno:this.capturaForm.value.apellido_paterno,
            apellido_materno:this.capturaForm.value.apellido_materno,
            telefono:this.capturaForm.value.telefono,
            email:this.capturaForm.value.email,
            fecha_nacimiento:this.capturaForm.value.fecha_nacimiento,
            genero:this.capturaForm.value.genero,
            nivel_interes:this.capturaForm.value.nivel_interes,
            motivo_desperfilado:this.capturaForm.value.motivo_desperfilado,
            combo_canal:this.capturaForm.value.combo_canal,
            combo_medio:this.capturaForm.value.combo_medio,
            combo_submedio:this.capturaForm.value.combo_submedio,
            referidor:this.capturaForm.value.referidor ,
            combo_desarrollo:this.capturaForm.value.combo_desarrollo,
            combo_prototipo:this.capturaForm.value.combo_prototipo,
            combo_etapa:this.capturaForm.value.combo_etapa,
            combo_manzana:'',
            combo_lote:'' ,
            tipo_credito:this.capturaForm.value.tipo_credito,
            credito:this.capturaForm.value.credito,
            institucion_financiera:this.capturaForm.value.institucion_financiera,
            ingresos:this.capturaForm.value.ingresos,
            proximo_contacto:this.capturaForm.value.proximo_contacto,
            fecha_apartado:this.capturaForm.value.fecha_apartado,
            fecha_venta:this.capturaForm.value.fecha_venta,
            fecha_cancelacion:this.capturaForm.value.fecha_cancelacion,
            motivo:this.capturaForm.value.motivo,
            visita:this.capturaForm.value.visita,
            visita2:this.capturaForm.value.visita2,
            visita3:this.capturaForm.value.visita3,
            visita4:this.capturaForm.value.visita4,
            comentario:this.capturaForm.value.comentario
          });
      }
      
    })
  }

  ManzanaSeleccionada(item){
    this._combo_lote = [];
    let data = { 
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Lotes',
      "params": ["'" + this.etapa[0].ETAPA + "','" ,  item + "','" ,  this._lote + "'"]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._combo_lote = _response.success.recordset;

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
    this._combo_institucion_financiera = [];
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
        buscar: 'NOMBRE'
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
    this.capturaForm.reset(); 
    this.btn_com = false; 
    this.btns = true;
    
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
    this.capturaForm.controls['fecha_nacimiento'].enable();
    this.capturaForm.controls['genero'].enable();
    this.capturaForm.controls['nivel_interes'].enable();
    this.capturaForm.controls['combo_canal'].enable();
    this.capturaForm.controls['combo_medio'].enable();
    this.capturaForm.controls['combo_submedio'].enable();
    this.capturaForm.controls['referidor'].enable();
    this.capturaForm.controls['combo_desarrollo'].enable();
    this.capturaForm.controls['combo_prototipo'].enable();
    this.capturaForm.controls['combo_manzana'].enable();
    this.capturaForm.controls['combo_lote'].enable();
    this.capturaForm.controls['combo_etapa'].enable();
    this.capturaForm.controls['tipo_credito'].enable();
    this.capturaForm.controls['credito'].enable();
    this.capturaForm.controls['institucion_financiera'].enable();
    this.capturaForm.controls['ingresos'].enable();
    this.capturaForm.controls['proximo_contacto'].enable();
    this.capturaForm.controls['fecha_apartado'].enable();
    this.capturaForm.controls['fecha_venta'].enable();
    this.capturaForm.controls['fecha_cancelacion'].enable();
    this.capturaForm.controls['comentario'].enable();
    $("#manzana").prop("disabled",true);
    $("#lote").prop("disabled",true);
    $("#fecha_apartado").prop("disabled",true);
    $("#fecha_venta").prop("disabled",true);
    $("#fecha_cancelacion").prop("disabled",true);
    this.EsAsesor();
    this.TraeUsuario();
  }

  HoraServidor(){
    let data = { 
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Lotes',
      "params": []
    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._hora_server = _response.success.recordset.slice(0,-8);
      /* _response.success.recordset[0].proximo_contacto.slice(0,-8); */
    })
  }

  VisitaSeleccionado(item){
    this._visita_seleccionado = 1;
    this._estatus_cliente = 'Cliente Potencial';
    let data = { 
      "appname":"VIVANZA",
      "sp": 'dbo.Trae_Fecha_Servidor',
      "params": []
    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._hora_server = _response.success.recordset[0].fecha.slice(0,-8);
      /* _response.success.recordset[0].proximo_contacto.slice(0,-8); */
      this.datos_cliente = 0;
      this.capturaForm.setValue(
        {
          tipo_cliente: 'Cliente Potencial',
          fecha: this.capturaForm.value.fecha ,
          hora: this.capturaForm.value.hora ,
          folio:this.capturaForm.value.folio,
          asesor:this.capturaForm.value.asesor,
          registro:this.nombre_registra,
          nombres:this.capturaForm.value.nombres,
          apellido_paterno:this.capturaForm.value.apellido_paterno,
          apellido_materno:this.capturaForm.value.apellido_materno,
          telefono:this.capturaForm.value.telefono,
          email:this.capturaForm.value.email,
          fecha_nacimiento:this.capturaForm.value.fecha_nacimiento,
          genero:this.capturaForm.value.genero,
          nivel_interes:'Muy interesado (15 días)',
          motivo_desperfilado:this.capturaForm.value.motivo_desperfilado,
          combo_canal:this.capturaForm.value.combo_canal,
          combo_medio:this.capturaForm.value.combo_medio,
          combo_submedio:this.capturaForm.value.combo_submedio,
          referidor:this.capturaForm.value.referidor ,
          combo_desarrollo:this.capturaForm.value.combo_desarrollo,
          combo_prototipo:this.capturaForm.value.combo_prototipo,
          combo_etapa:this.capturaForm.value.combo_etapa,
          combo_manzana:this.capturaForm.value.combo_manzana ,
          combo_lote:this.capturaForm.value.combo_lote ,
          tipo_credito:this.capturaForm.value.tipo_credito,
          credito:this.capturaForm.value.credito,
          institucion_financiera:this.capturaForm.value.institucion_financiera,
          ingresos:this.capturaForm.value.ingresos,
          proximo_contacto:this._hora_server,
          fecha_apartado:this.capturaForm.value.fecha_apartado,
          fecha_venta:this.capturaForm.value.fecha_venta,
          fecha_cancelacion:this.capturaForm.value.fecha_cancelacion,
          motivo:this.capturaForm.value.motivo,
          visita:this.capturaForm.value.visita,
          visita2:this.capturaForm.value.visita2,
          visita3:this.capturaForm.value.visita3,
          visita4:this.capturaForm.value.visita4,
          comentario:this.capturaForm.value.comentario
        });
        if(this.capturaForm.value.combo_desarrollo === 0){
          this.capturaForm.value.combo_desarrollo = '';
        }
        this.capturaForm = this.formBuilder.group({
          tipo_cliente:[this.capturaForm.value.tipo_cliente,Validators.required],
          fecha:[this.capturaForm.value.fecha,Validators.required],
          hora:[this.capturaForm.value.fecha],
          folio:[this.capturaForm.value.folio],
          asesor:[this.capturaForm.value.asesor,Validators.required],
          registro:[this.nombre_registra,Validators.required],
          nombres:[this.capturaForm.value.nombres,Validators.required],
          apellido_paterno:[this.capturaForm.value.apellido_paterno,Validators.required],
          apellido_materno:[this.capturaForm.value.apellido_materno],
          telefono:[this.capturaForm.value.telefono,Validators.required],
          email:[this.capturaForm.value.email],
          fecha_nacimiento:[this.capturaForm.value.fecha_nacimiento],
          genero:[this.capturaForm.value.genero,Validators.required],
          nivel_interes:[this.capturaForm.value.nivel_interes,Validators.required],
          motivo_desperfilado:[this.capturaForm.value.motivo_desperfilado],
          combo_canal:[this.capturaForm.value.combo_canal,Validators.required],
          combo_medio:[this.capturaForm.value.combo_medio],
          combo_submedio:[this.capturaForm.value.combo_submedio],
          referidor:[this.capturaForm.value.referidor],
          combo_desarrollo:[this.capturaForm.value.combo_desarrollo,Validators.required],
          combo_prototipo:[this.capturaForm.value.combo_prototipo],
          combo_etapa:[this.capturaForm.value.combo_etapa],
          combo_manzana:[this.capturaForm.value.combo_manzana],
          combo_lote:[this.capturaForm.value.combo_lote],
          tipo_credito:[this.capturaForm.value.tipo_credito],
          credito:[this.capturaForm.value.credito],
          institucion_financiera:[this.capturaForm.value.institucion_financiera],
          ingresos:[this.capturaForm.value.ingresos],
          proximo_contacto:[this.capturaForm.value.proximo_contacto],
          fecha_apartado:[this.capturaForm.value.fecha_apartado],
          fecha_venta:[this.capturaForm.value.fecha_venta],
          fecha_cancelacion:[this.capturaForm.value.fecha_cancelacion],
          motivo:[this.capturaForm.value.motivo],
          visita:[this.capturaForm.value.visita],
          visita2:[this.capturaForm.value.visita2],
          visita3:[this.capturaForm.value.visita3],
          visita4:[this.capturaForm.value.visita4],
          comentario:[this.capturaForm.value.comentario]
        })

    })
    
    
  }

  Cancelar(){
    this._cancelado = false;
    this.btn_activar = false;
    this.btn_exporta = false;
    this.lista_clientes = '';
    this.visitas = [];
    this.visit = '';
    this.btns = false;
    this.editar = false;
    this.capturaFormBuscar.setValue(
      {
        consulta: '',
        buscar: 'NOMBRE'
      })

    this.BloquearCampos(1);
  }

  CambioProximoContacto(item){
    this.datos_cliente = 0;
  }

  RevisaNumero(){

    if(this.capturaForm.value.telefono.length === 10){
      if(this.capturaForm.value.folio == ''){
        this.capturaForm.value.folio = 0;
      }
      let data = {
        "appname":"VIVANZA",
        "sp": 'dvp.Verifica_Telefono',
        "params": ["'" + this.capturaForm.value.folio + "','" 
                  ,  this.capturaForm.value.telefono +"','" 
                  ,  + localStorage.getItem('id') +"'"  ]
    /*     "params": ["'" + localStorage.getItem('id') + "','" 
          ,  1 + "'" ] */
  
      }
  
      this.apiService.ejecuta(data).subscribe((response) => {
        let _response;
        _response = response;
        if(_response.success.recordsets.length > 0){
          let d = _response.success.recordsets[0];
          if(d[0].error == 1){
            alert(d[0].mensaje);
            this._cancelado = false;
            this.btn_exporta = false;
            this.lista_clientes = [];
            this.visitas = [];
            this.visit = '';
            this.btns = false;
            this.editar = false;
            this.capturaFormBuscar.setValue(
              {
                consulta: '',
                buscar: 'NOMBRE'
              })

              this.capturaForm.setValue(
                {
                  tipo_cliente: '',
                  fecha: '',
                  hora:'',
                  folio:'',
                  asesor:'',
                  registro:'',
                  nombres:'',
                  apellido_paterno:'',
                  apellido_materno:'',
                  telefono:'',
                  email:'',
                  fecha_nacimiento:'',
                  genero:'',
                  nivel_interes:'',
                  motivo_desperfilado:'',
                  combo_canal:'',
                  combo_medio:'',
                  combo_submedio:'',
                  referidor:'',
                  combo_desarrollo:'',
                  combo_prototipo:'',
                  combo_etapa:'',
                  combo_manzana:'',
                  combo_lote:'',
                  tipo_credito:'',
                  credito:'',
                  institucion_financiera:'',
                  ingresos:'',
                  proximo_contacto:'',
                  fecha_apartado:'',
                  fecha_venta:'',
                  fecha_cancelacion:'',
                  motivo:'',
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
                this.capturaForm.controls['fecha_nacimiento'].disable();
                this.capturaForm.controls['genero'].disable();
                this.capturaForm.controls['nivel_interes'].disable();
                this.capturaForm.controls['combo_canal'].disable();
                this.capturaForm.controls['combo_medio'].disable();
                this.capturaForm.controls['combo_submedio'].disable();
                this.capturaForm.controls['referidor'].disable();
                this.capturaForm.controls['combo_desarrollo'].disable();
                this.capturaForm.controls['combo_prototipo'].disable();
                this.capturaForm.controls['combo_manzana'].disable();
                this.capturaForm.controls['combo_etapa'].disable();
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
          if(d[0].error == 2){
            let pregunta = confirm(d[0].mensaje);
            if (pregunta == true){
              this.nuevo_cliente = true;
              let e = _response.success.recordsets[1];
              this._combo_desarrollos =[];
              this._combo_desarrollos = e;
              window.scroll(0, 1000);
              /* alert(d[0].mensaje); */
              $("#nombre").prop("disabled",true);
              $("#apellido_materno").prop("disabled",true);
              $("#apellido_paterno").prop("disabled",true);
              $("#telefono").prop("disabled",true);
              $("#correo").prop("disabled",true);
              $("#fecha_nacimiento").prop("disabled",true);
              $("#genero").prop("disabled",true);
              $("#nivel_interes").prop("disabled",true);
              $("#canal").prop("disabled",true);
              $("#medio").prop("disabled",true);
              $("#submedio").prop("disabled",true);
              $("#etapa").prop("disabled",true);
              $("#referidor").prop("disabled",true);
              $("#prototipo").prop("disabled",true);
              $("#tipo_credito").prop("disabled",true);
              $("#credito").prop("disabled",true);
              $("#institucion_financiera").prop("disabled",true);
              $("#ingresos").prop("disabled",true);
              $("#proximo_contacto").prop("disabled",true);
              $("#fecha_apartado").prop("disabled",true);
              $("#fecha_venta").prop("disabled",true);
              $("#fecha_cancelacion").prop("disabled",true);
              $("#motivo_cancelado").prop("disabled",true);
            }
            else{
              this._cancelado = false;
              this.btn_exporta = false;
              this.lista_clientes = [];
              this.visitas = [];
              this.visit = '';
              this.btns = false;
              this.editar = false;
              this.capturaFormBuscar.setValue(
                {
                  consulta: '',
                  buscar: 'NOMBRE'
                })

                this.capturaForm.setValue(
                  {
                    tipo_cliente: '',
                    fecha: '',
                    hora:'',
                    folio:'',
                    asesor:'',
                    registro:'',
                    nombres:'',
                    apellido_paterno:'',
                    apellido_materno:'',
                    telefono:'',
                    email:'',
                    fecha_nacimiento:'',
                    genero:'',
                    nivel_interes:'',
                    motivo_desperfilado:'',
                    combo_canal:'',
                    combo_medio:'',
                    combo_submedio:'',
                    referidor:'',
                    combo_desarrollo:'',
                    combo_prototipo:'',
                    combo_etapa:'',
                    combo_manzana:'',
                    combo_lote:'',
                    tipo_credito:'',
                    credito:'',
                    institucion_financiera:'',
                    ingresos:'',
                    proximo_contacto:'',
                    fecha_apartado:'',
                    fecha_venta:'',
                    fecha_cancelacion:'',
                    motivo:'',
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
                  this.capturaForm.controls['fecha_nacimiento'].disable();
                  this.capturaForm.controls['genero'].disable();
                  this.capturaForm.controls['nivel_interes'].disable();
                  this.capturaForm.controls['combo_canal'].disable();
                  this.capturaForm.controls['combo_medio'].disable();
                  this.capturaForm.controls['combo_submedio'].disable();
                  this.capturaForm.controls['referidor'].disable();
                  this.capturaForm.controls['combo_desarrollo'].disable();
                  this.capturaForm.controls['combo_prototipo'].disable();
                  this.capturaForm.controls['combo_manzana'].disable();
                  this.capturaForm.controls['combo_etapa'].disable();
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
          if(d[0].error == 3){
            alert(d[0].mensaje);
            this._cancelado = false;
              this.btn_exporta = false;
              this.lista_clientes = [];
              this.visitas = [];
              this.visit = '';
              this.btns = false;
              this.editar = false;
              this.capturaFormBuscar.setValue(
                {
                  consulta: '',
                  buscar: 'NOMBRE'
                })

                this.capturaForm.setValue(
                  {
                    tipo_cliente: '',
                    fecha: '',
                    hora:'',
                    folio:'',
                    asesor:'',
                    registro:'',
                    nombres:'',
                    apellido_paterno:'',
                    apellido_materno:'',
                    telefono:'',
                    email:'',
                    fecha_nacimiento:'',
                    genero:'',
                    nivel_interes:'',
                    motivo_desperfilado:'',
                    combo_canal:'',
                    combo_medio:'',
                    combo_submedio:'',
                    referidor:'',
                    combo_desarrollo:'',
                    combo_prototipo:'',
                    combo_etapa:'',
                    combo_manzana:'',
                    combo_lote:'',
                    tipo_credito:'',
                    credito:'',
                    institucion_financiera:'',
                    ingresos:'',
                    proximo_contacto:'',
                    fecha_apartado:'',
                    fecha_venta:'',
                    fecha_cancelacion:'',
                    motivo:'',
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
                  this.capturaForm.controls['fecha_nacimiento'].disable();
                  this.capturaForm.controls['genero'].disable();
                  this.capturaForm.controls['nivel_interes'].disable();
                  this.capturaForm.controls['combo_canal'].disable();
                  this.capturaForm.controls['combo_medio'].disable();
                  this.capturaForm.controls['combo_submedio'].disable();
                  this.capturaForm.controls['referidor'].disable();
                  this.capturaForm.controls['combo_desarrollo'].disable();
                  this.capturaForm.controls['combo_prototipo'].disable();
                  this.capturaForm.controls['combo_manzana'].disable();
                  this.capturaForm.controls['combo_etapa'].disable();
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
          if(d[0].error == 4){
            let pregunta = confirm(d[0].mensaje);
            if (pregunta == true){
              this.nuevo_cliente = true;
              let e = _response.success.recordsets[1];
              var c = _response.success.recordsets[2];
              this._combo_desarrollos =[];
              this._combo_desarrollos = e;
              window.scroll(0, 1000);
              /* alert(d[0].mensaje); */
              $("#nombre").prop("disabled",true);
              $("#apellido_materno").prop("disabled",true);
              $("#apellido_paterno").prop("disabled",true);
              $("#telefono").prop("disabled",true);
              $("#correo").prop("disabled",true);
              $("#fecha_nacimiento").prop("disabled",true);
              $("#genero").prop("disabled",true);
              $("#nivel_interes").prop("disabled",true);
              $("#canal").prop("disabled",true);
              $("#medio").prop("disabled",true);
              $("#submedio").prop("disabled",true);
              $("#etapa").prop("disabled",true);
              $("#referidor").prop("disabled",true);
              $("#prototipo").prop("disabled",true);
              $("#tipo_credito").prop("disabled",true);
              $("#credito").prop("disabled",true);
              $("#institucion_financiera").prop("disabled",true);
              $("#ingresos").prop("disabled",true);
              $("#proximo_contacto").prop("disabled",true);
              $("#fecha_apartado").prop("disabled",true);
              $("#fecha_venta").prop("disabled",true);
              $("#fecha_cancelacion").prop("disabled",true);
              $("#motivo_cancelado").prop("disabled",true);

              this.capturaForm.setValue(
                {
                  tipo_cliente: this.capturaForm.value.tipo_cliente,
                  fecha: this.capturaForm.value.fecha ,
                  hora: this.capturaForm.value.hora ,
                  folio:this.capturaForm.value.folio,
                  asesor: c[0].id_asesor,
                  registro:this.capturaForm.value.registro,
                  nombres:this.capturaForm.value.nombres,
                  apellido_paterno:this.capturaForm.value.apellido_paterno,
                  apellido_materno:this.capturaForm.value.apellido_materno,
                  telefono:this.capturaForm.value.telefono,
                  email:this.capturaForm.value.email,
                  fecha_nacimiento:this.capturaForm.value.fecha_nacimiento,
                  genero:this.capturaForm.value.genero,
                  nivel_interes:this.capturaForm.value.nivel_interes,
                  motivo_desperfilado:this.capturaForm.value.motivo_desperfilado,
                  combo_canal:this.capturaForm.value.combo_canal,
                  combo_medio:this.capturaForm.value.combo_medio,
                  combo_submedio:this.capturaForm.value.combo_submedio,
                  referidor:this.capturaForm.value.referidor ,
                  combo_desarrollo:this.capturaForm.value.combo_desarrollo,
                  combo_prototipo:this.capturaForm.value.combo_prototipo,
                  combo_etapa:this.capturaForm.value.combo_etapa,
                  combo_manzana:this.capturaForm.value.combo_manzana ,
                  combo_lote:this.capturaForm.value.combo_lote ,
                  tipo_credito:this.capturaForm.value.tipo_credito,
                  credito:this.capturaForm.value.credito,
                  institucion_financiera:this.capturaForm.value.institucion_financiera,
                  ingresos:this.capturaForm.value.ingresos,
                  proximo_contacto:this.capturaForm.value.proximo_contacto,
                  fecha_apartado:this.capturaForm.value.fecha_apartado,
                  fecha_venta:this.capturaForm.value.fecha_venta,
                  fecha_cancelacion:this.capturaForm.value.fecha_cancelacion,
                  motivo:this.capturaForm.value.motivo,
                  visita:this.capturaForm.value.visita,
                  visita2:this.capturaForm.value.visita2,
                  visita3:this.capturaForm.value.visita3,
                  visita4:this.capturaForm.value.visita4,
                  comentario:this.capturaForm.value.comentario
                }) 

            }
            else{
              this._cancelado = false;
              this.btn_exporta = false;
              this.lista_clientes = [];
              this.visitas = [];
              this.visit = '';
              this.btns = false;
              this.editar = false;
              this.capturaFormBuscar.setValue(
                {
                  consulta: '',
                  buscar: 'NOMBRE'
                })

                this.capturaForm.setValue(
                  {
                    tipo_cliente: '',
                    fecha: '',
                    hora:'',
                    folio:'',
                    asesor:'',
                    registro:'',
                    nombres:'',
                    apellido_paterno:'',
                    apellido_materno:'',
                    telefono:'',
                    email:'',
                    fecha_nacimiento:'',
                    genero:'',
                    nivel_interes:'',
                    motivo_desperfilado:'',
                    combo_canal:'',
                    combo_medio:'',
                    combo_submedio:'',
                    referidor:'',
                    combo_desarrollo:'',
                    combo_prototipo:'',
                    combo_etapa:'',
                    combo_manzana:'',
                    combo_lote:'',
                    tipo_credito:'',
                    credito:'',
                    institucion_financiera:'',
                    ingresos:'',
                    proximo_contacto:'',
                    fecha_apartado:'',
                    fecha_venta:'',
                    fecha_cancelacion:'',
                    motivo:'',
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
                  this.capturaForm.controls['fecha_nacimiento'].disable();
                  this.capturaForm.controls['genero'].disable();
                  this.capturaForm.controls['nivel_interes'].disable();
                  this.capturaForm.controls['combo_canal'].disable();
                  this.capturaForm.controls['combo_medio'].disable();
                  this.capturaForm.controls['combo_submedio'].disable();
                  this.capturaForm.controls['referidor'].disable();
                  this.capturaForm.controls['combo_desarrollo'].disable();
                  this.capturaForm.controls['combo_prototipo'].disable();
                  this.capturaForm.controls['combo_manzana'].disable();
                  this.capturaForm.controls['combo_etapa'].disable();
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
          if(d[0].error == 5){
            let e = _response.success.recordsets[1];
            this.capturaForm.setValue(
              {
                tipo_cliente: this.capturaForm.value.tipo_cliente,
                fecha: this.capturaForm.value.fecha ,
                hora: this.capturaForm.value.hora ,
                folio:this.capturaForm.value.folio,
                asesor: e[0].id_asesor,
                registro:this.capturaForm.value.registro,
                nombres:this.capturaForm.value.nombres,
                apellido_paterno:this.capturaForm.value.apellido_paterno,
                apellido_materno:this.capturaForm.value.apellido_materno,
                telefono:this.capturaForm.value.telefono,
                email:this.capturaForm.value.email,
                fecha_nacimiento:this.capturaForm.value.fecha_nacimiento,
                genero:this.capturaForm.value.genero,
                nivel_interes:this.capturaForm.value.nivel_interes,
                motivo_desperfilado:this.capturaForm.value.motivo_desperfilado,
                combo_canal:this.capturaForm.value.combo_canal,
                combo_medio:this.capturaForm.value.combo_medio,
                combo_submedio:this.capturaForm.value.combo_submedio,
                referidor:this.capturaForm.value.referidor ,
                combo_desarrollo:this.capturaForm.value.combo_desarrollo,
                combo_prototipo:this.capturaForm.value.combo_prototipo,
                combo_etapa:this.capturaForm.value.combo_etapa,
                combo_manzana:this.capturaForm.value.combo_manzana ,
                combo_lote:this.capturaForm.value.combo_lote ,
                tipo_credito:this.capturaForm.value.tipo_credito,
                credito:this.capturaForm.value.credito,
                institucion_financiera:this.capturaForm.value.institucion_financiera,
                ingresos:this.capturaForm.value.ingresos,
                proximo_contacto:this.capturaForm.value.proximo_contacto,
                fecha_apartado:this.capturaForm.value.fecha_apartado,
                fecha_venta:this.capturaForm.value.fecha_venta,
                fecha_cancelacion:this.capturaForm.value.fecha_cancelacion,
                motivo:this.capturaForm.value.motivo,
                visita:this.capturaForm.value.visita,
                visita2:this.capturaForm.value.visita2,
                visita3:this.capturaForm.value.visita3,
                visita4:this.capturaForm.value.visita4,
                comentario:this.capturaForm.value.comentario
              }) 

          }
     /*      else{
  
          } */
        }
        
        
      })
    }

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
    if(this.capturaForm.value.proximo_contacto != null){
    
      this.capturaForm.value.proximo_contacto = this.capturaForm.value.proximo_contacto.replace("T", " ");
      
    } 
    else{
      this.capturaForm.value.proximo_contacto  = '';
    }
    if(this.capturaForm.value.visita != '' ){
    
      this.capturaForm.value.visita = this.capturaForm.value.visita.replace("T", " ");
      
    } 
    if(this.capturaForm.value.visita2 != ''){
    
      this.capturaForm.value.visita2 = this.capturaForm.value.visita2.replace("T", " ");
      
    } 
    if(this.capturaForm.value.visita3 != ''){
    
      this.capturaForm.value.visita3 = this.capturaForm.value.visita3.replace("T", " ");
      
    } 
    if(this.capturaForm.value.visita4 != ''){
    
      this.capturaForm.value.visita4 = this.capturaForm.value.visita4.replace("T", " ");
      
    } 
    if(this.capturaForm.value.comentario == undefined){
    
      this.capturaForm.value.comentario = '';
      
    } 
    if(this.capturaForm.value.fecha_nacimiento == null){
    
      this.capturaForm.value.fecha_nacimiento = '';
      
    } 
    if(this.capturaForm.value.combo_lote == undefined){
    
      this.capturaForm.value.combo_lote = '';
      
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

    if(this._desperfilado == true){
      if(this.capturaForm.value.motivo_desperfilado == null ||this.capturaForm.value.motivo_desperfilado == ''){
        this.validaciones = true;
        this.capturaForm.value.motivo_desperfilado = '';
        alert('Se debe de seleccionar el motivo de "No Perfilado"');
      }
    }

    if(this._cancelado == true){
      if(this.capturaForm.value.motivo == null ||this.capturaForm.value.motivo == ''){
        this.validaciones = true;
        this.capturaForm.value.motivo = '';
        alert('Se debe de seleccionar el motivo de cancelación');
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
            ,  this.capturaForm.value.fecha_nacimiento +"','" 
            ,  this.capturaForm.value.genero +"','"  
            ,  this.capturaForm.value.nivel_interes +"','"  
            ,  this.capturaForm.value.motivo_desperfilado +"','"  
            ,  this.capturaForm.value.combo_canal +"','"  
            ,  this.capturaForm.value.combo_medio +"','"  
            ,  this.capturaForm.value.combo_submedio +"','"  
            ,  this.capturaForm.value.referidor +"','"  
            ,  this.capturaForm.value.combo_desarrollo +"','"  
            ,  this.capturaForm.value.combo_prototipo +"','"  
            ,  this.capturaForm.value.combo_etapa +"','"  
            ,  this.capturaForm.value.combo_lote +"','"  
            ,  this.capturaForm.value.tipo_credito +"','"  
            ,  this.capturaForm.value.credito +"','"  
            ,  this.capturaForm.value.institucion_financiera +"','" 
            ,  this.capturaForm.value.ingresos +"','"  
            ,  this.capturaForm.value.proximo_contacto +"','"  
            ,  this.capturaForm.value.fecha_apartado +"','"  
            ,  this.capturaForm.value.fecha_venta +"','"  
            ,  this.capturaForm.value.fecha_cancelacion +"','"  
            ,  this.capturaForm.value.motivo +"','" 
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
          this._cancelado = false;
          this._desperfilado = false;
          this.btn_apartado = false;
          this.btns = false;
          this.btn_com = false;
          this.visitas = [];
          this._visita1 = false;
          this._visita2 = false;
          this._visita3 = false;
          this._visita4 = false;
          this.LimpiaFormulario();
          this.ResumenVentas();
          this.btn_activar = false;
          this.lista_clientes = '';
          window.scroll(0, 0);
  
        }
        
       
      })
  
    }
    else{
/*       if(this._visita_seleccionado == 1){
        alert('Se debe de seleccionar un Desarrollo para poder agendar una visita.');
      }
      else{
        alert('Se den de llenarlso datos obligatorios de Información Financiera.');
      } */


      
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
        hora:'',
        folio:'',
        asesor:'',
        registro:'',
        nombres:'',
        apellido_paterno:'',
        apellido_materno:'',
        telefono:'',
        email:'',
        fecha_nacimiento:'',
        genero:'',
        nivel_interes:'',
        motivo_desperfilado:'',
        combo_canal:'',
        combo_medio:'',
        combo_submedio:'',
        referidor:'',
        combo_desarrollo:'',
        combo_prototipo:'',
        combo_etapa:'',
        combo_manzana:'',
        combo_lote:'',
        tipo_credito:'',
        credito:'',
        institucion_financiera:'',
        ingresos:'',
        proximo_contacto:'',
        fecha_apartado:'',
        fecha_venta:'',
        fecha_cancelacion:'',
        motivo:'',
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
      this.capturaForm.controls['fecha_nacimiento'].disable();
      this.capturaForm.controls['genero'].disable();
      this.capturaForm.controls['nivel_interes'].disable();
      this.capturaForm.controls['combo_canal'].disable();
      this.capturaForm.controls['combo_medio'].disable();
      this.capturaForm.controls['combo_submedio'].disable();
      this.capturaForm.controls['referidor'].disable();
      this.capturaForm.controls['combo_desarrollo'].disable();
      this.capturaForm.controls['combo_prototipo'].disable();
      this.capturaForm.controls['combo_manzana'].disable();
      this.capturaForm.controls['combo_etapa'].disable();
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


  ////// ACtivar cliente tipo Cancelado
      ActivarCliente(){
        var r = confirm("Esta seguro de querer activar al cliente?");
        if (r == true) {
          let data = {
            "appname": "VIVANZA",
            "sp": 'dvp.Activa_Cliente',
            "params": ["'" + this.id_cliente_apartado + "','" 
              ,  localStorage.getItem('id') +"'" 
              ]
      
          }
      
          this.apiService.ejecuta(data).subscribe((response) => {
            let _response;
            _response = response;
            this.LimpiaFormulario();
            this._cancelado = false;
            this.btn_activar = false;
            this.btn_exporta = false;
            this.lista_clientes = '';
            this.visitas = [];
            this.visit = '';
            this.btns = false;
            this.editar = false;
            this.capturaFormBuscar.setValue(
              {
                consulta: '',
                buscar: 'NOMBRE'
              })
              this.ResumenVentas();
          })
    
        } else {
          //txt = "You pressed Cancel!";
        }

        
      }
  /////////////////////
 
}
