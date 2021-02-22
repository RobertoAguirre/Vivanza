import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-crmclientesapartado',
  templateUrl: './crmclientesapartado.component.html',
  styleUrls: ['./crmclientesapartado.component.css']
})
export class CrmclientesapartadoComponent implements OnInit {

    public _combo_vive_en;
    public _combo_estados;
    public _combo_ciudades;
    public _combo_ciudades_empresa;
    public _combo_estado_civil;
    public _combo_regimen_matrimonial;
    public _combo_tipo_contrato;
    public _combo_trabaja_conyuge;
    public _combo_participa_credito;

    public  trabaja_conyuge = false;
    public estado_seleccionado;
    public estado_seleccionado_empresa;
    public nombre_cliente;
    public id_cliente;
    public es_casado = false;

  capturaForm = this.formBuilder.group({
    rfc:['',Validators.required],
    calle:['',Validators.required],
    numero_interior:['',Validators.required],
    numero_exterior:[''],
    colonia:['',Validators.required],
    codigo_postal:['',Validators.required],
    telefono_casa:[''],
    telefono_oficina:[''],
    vive_en:['',Validators.required],
    tiempo_residencia:['',Validators.required],
    numero_dependientes:['',Validators.required],
    estado:['',Validators.required],
    ciudad:['',Validators.required],
    estado_civil:['',Validators.required],
    peso:['',Validators.required],
    estatura:['',Validators.required],
    fecha_nacimiento:['',Validators.required],
    edad:['',Validators.required],
    lugar_nacimiento:['',Validators.required],
    regimen_matrimonial:[''],
    fecha_matrimonio:[''],
    escolaridad:['',Validators.required],

    nombre_empresa:['',Validators.required],
    antiguedad:['',Validators.required],
    puesto:['',Validators.required],
    giro_empresa:['',Validators.required],
    tipo_contrato:['',Validators.required],
    nombre_jefe:['',Validators.required],
    departamento:['',Validators.required],
    ingresos_mensuales:['',Validators.required],
    calle_empresa:['',Validators.required],
    numero_interior_empresa:['',Validators.required],
    numero_exterior_empresa:[''],
    colonia_empresa:['',Validators.required],
    codigo_postal_empresa:['',Validators.required],
    telefono_empresa:['',Validators.required],
    extension_empresa:[''],
    estado_empresa:['',Validators.required],
    ciudad_empresa:['',Validators.required],
    numero_seguro:['',Validators.required],

    nombre_conyuge:[''],
    apellido_paterno_conyuge:[''],
    apellido_materno_conyuge:[''],
    rfc_conyuge:[''],
    lugar_nacimiento_conyuge:[''],
    trabaja_conyuge:[''],

    nombre_empresa_conyuge:[''],
    antiguedad_conyuge:[''],
    puesto_conyuge:[''],
    giro_empresa_conyuge:[''],
    nombre_jefe_conyuge:[''],
    departamento_conyuge:[''],
    ingresos_mensuales_conyuge:[''],
    calle_empresa_conyuge:[''],
    numero_interior_empresa_conyuge:[''],
    numero_exterior_empresa_conyuge:[''],
    colonia_empresa_conyuge:[''],
    codigo_postal_empresa_conyuge:[''],
    telefono_empresa_conyuge:[''],
    extension_empresa_conyuge:[''],
    participa_credito:[''],
    escolaridad_conyuge:[''],
    peso_conyuge:[''],
    estatura_conyuge:[''],
    numero_seguro_conyuge:[''],

    nombre_referencia1:['',Validators.required],
    direccion_referencia1:['',Validators.required],
    telefono_referencia1:['',Validators.required],
    nombre_referencia2:['',Validators.required],
    direccion_referencia2:['',Validators.required],
    telefono_referencia2:['',Validators.required],
    nombre_referencia3:['',Validators.required],
    direccion_referencia3:['',Validators.required],
    telefono_referencia3:['',Validators.required],

    monto_credito:['',Validators.required],
    plazo:['',Validators.required],
    enganche:['',Validators.required],
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    public formBuilder: FormBuilder
    /* public datepipe: DatePipe */
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.nombre_cliente = params['nombre'];
      this.id_cliente = params['item'];
    });

    this._combo_vive_en = [
      {nombre: 'Casa Propia'},
      {nombre: 'Con Hipoteca'},
      {nombre: 'De Familiares'},
      {nombre: 'Rentada'},
      {nombre: 'Otro'}
    ]
    this._combo_estado_civil = [
      {nombre: 'Casado'},
      {nombre: 'Soltero'},
      {nombre: 'Divorciado'},
      {nombre: 'Viudo'}
    ]
    this._combo_regimen_matrimonial = [
      {nombre: 'Sociedad Conyugal'},
      {nombre: 'Separación de Bienes'}
    ]
    this._combo_tipo_contrato = [
      {nombre: 'Indefinido'},
      {nombre: 'Temporal'}
    ]
    this._combo_trabaja_conyuge = [
      {nombre: 'Sí'},
      {nombre: 'No'}
    ]
    this._combo_participa_credito = [
      {nombre: 'Sí'},
      {nombre: 'No'}
    ]
    this.ComboEstados();
  }

  EstadoCivilSeleccionado(item){
    if(item == 'Sí'){
      this.es_casado = true;
    }
    else{
      this.es_casado = false;
      this.capturaForm.value.ingresos_mensuales_conyuge = 0;
    }
  }

  ComboEstados(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dbo.Trae_Estados_Por_Pais',
      "params": [1]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._combo_estados = _response.success.recordset;
    })
  }

  EstadoSeleccionado(item){
    this.estado_seleccionado = item;
    this.ComboCiudades();
  }

  ComboCiudades(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dbo.Trae_Ciudades',
      "params": [this.estado_seleccionado]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._combo_ciudades = _response.success.recordset;
    })
  }

  EstadoEmpresaSeleccionado(item){
    this.estado_seleccionado_empresa = item;
    this.ComboCiudadesEmpresa();
  }

  ComboCiudadesEmpresa(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dbo.Trae_Ciudades',
      "params": [this.estado_seleccionado]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._combo_ciudades_empresa = _response.success.recordset;
    })
  }

  TrabajaConyugeSeleccionado(item){
    if(item == 'Sí'){
      this.trabaja_conyuge = true;
    }
    else{
      this.trabaja_conyuge = false;
    }
  }

  Guarda(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Guarda_Clientes_Apartado',
      "params": ["'" + 0 + "','" 
          ,  this.id_cliente + "','" 
          ,  this.capturaForm.value.rfc + "','" 
          ,  this.capturaForm.value.calle + "','" 
          ,  this.capturaForm.value.numero_interior + "','" 
          ,  this.capturaForm.value.numero_exterior +"','"  
          ,  this.capturaForm.value.colonia +"','"  
          ,  this.capturaForm.value.codigo_postal +"','"  
          ,  this.capturaForm.value.telefono_casa +"','"  
          ,  this.capturaForm.value.telefono_oficina +"','"  
          ,  this.capturaForm.value.vive_en +"','"  
          ,  this.capturaForm.value.tiempo_residencia +"','"  
          ,  this.capturaForm.value.numero_dependientes +"','"  
          ,  this.capturaForm.value.estado +"','"  
          ,  this.capturaForm.value.ciudad +"','"  
          ,  this.capturaForm.value.estado_civil +"','"  
          ,  this.capturaForm.value.peso +"','"  
          ,  this.capturaForm.value.estatura +"','"  
          ,  this.capturaForm.value.fecha_nacimiento +"','"  
          ,  this.capturaForm.value.edad +"','"  
          ,  this.capturaForm.value.lugar_nacimiento +"','"  
          ,  this.capturaForm.value.regimen_matrimonial +"','"  
          ,  this.capturaForm.value.fecha_matrimonio +"','"  
          ,  this.capturaForm.value.escolaridad +"','" 

          ,  this.capturaForm.value.nombre_empresa +"','"  
          ,  this.capturaForm.value.antiguedad +"','"  
          ,  this.capturaForm.value.puesto +"','"  
          ,  this.capturaForm.value.giro_empresa +"','"  
          ,  this.capturaForm.value.tipo_contrato +"','"  
          ,  this.capturaForm.value.nombre_jefe +"','"  
          ,  this.capturaForm.value.departamento +"','"  
          ,  this.capturaForm.value.ingresos_mensuales +"','"  
          ,  this.capturaForm.value.calle_empresa +"','"  
          ,  this.capturaForm.value.numero_interior_empresa +"','"  
          ,  this.capturaForm.value.numero_exterior_empresa +"','"  
          ,  this.capturaForm.value.colonia_empresa +"','"  
          ,  this.capturaForm.value.codigo_postal_empresa +"','"  
          ,  this.capturaForm.value.telefono_empresa +"','"  
          ,  this.capturaForm.value.extension_empresa +"','"  
          ,  this.capturaForm.value.estado_empresa +"','"  
          ,  this.capturaForm.value.ciudad_empresa +"','"  
          ,  this.capturaForm.value.numero_seguro +"','" 
          
          ,  this.capturaForm.value.nombre_conyuge +"','"  
          ,  this.capturaForm.value.apellido_paterno_conyuge +"','"  
          ,  this.capturaForm.value.apellido_materno_conyuge +"','"  
          ,  this.capturaForm.value.rfc_conyuge +"','"  
          ,  this.capturaForm.value.lugar_nacimiento_conyuge +"','"  
          ,  this.capturaForm.value.trabaja_conyuge +"','"  

          ,  this.capturaForm.value.nombre_empresa_conyuge +"','"  
          ,  this.capturaForm.value.antiguedad_conyuge +"','"  
          ,  this.capturaForm.value.puesto_conyuge +"','"  
          ,  this.capturaForm.value.giro_empresa_conyuge +"','"  
          ,  this.capturaForm.value.nombre_jefe_conyuge +"','"  
          ,  this.capturaForm.value.departamento_conyuge +"','"  
          ,  this.capturaForm.value.ingresos_mensuales_conyuge +"','"  
          ,  this.capturaForm.value.calle_empresa_conyuge +"','"  
          ,  this.capturaForm.value.numero_interior_empresa_conyuge +"','"  
          ,  this.capturaForm.value.numero_exterior_empresa_conyuge +"','"  
          ,  this.capturaForm.value.colonia_empresa_conyuge +"','"  
          ,  this.capturaForm.value.codigo_postal_empresa_conyuge +"','" 
          ,  this.capturaForm.value.telefono_empresa_conyuge +"','"  
          ,  this.capturaForm.value.extension_empresa_conyuge +"','"  
          ,  this.capturaForm.value.participa_credito +"','"  
          ,  this.capturaForm.value.escolaridad_conyuge +"','"  
          ,  this.capturaForm.value.peso_conyuge +"','"  
          ,  this.capturaForm.value.estatura_conyuge +"','"  
          ,  this.capturaForm.value.numero_seguro_conyuge +"','"  

          ,  this.capturaForm.value.nombre_referencia1 +"','"  
          ,  this.capturaForm.value.direccion_referencia1 +"','"  
          ,  this.capturaForm.value.telefono_referencia1 +"','"  
          ,  this.capturaForm.value.nombre_referencia2 +"','"  
          ,  this.capturaForm.value.direccion_referencia2 +"','"
          ,  this.capturaForm.value.telefono_referencia2 +"','"  
          ,  this.capturaForm.value.nombre_referencia3 +"','"  
          ,  this.capturaForm.value.direccion_referencia3 +"','"  
          ,  this.capturaForm.value.telefono_referencia3 +"','"

          ,  this.capturaForm.value.monto_credito +"','"  
          ,  this.capturaForm.value.plazo +"','"
          ,  this.capturaForm.value.enganche +"'" 
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
        window.scroll(0, 0);
   /*      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['./crmclientes'], { relativeTo: this.route }); */
      }
      
     
    })
  }

}
