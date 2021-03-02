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
    public id_apartado;

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
      {vive_en: 'Casa Propia'},
      {vive_en: 'Con Hipoteca'},
      {vive_en: 'De Familiares'},
      {vive_en: 'Rentada'},
      {vive_en: 'Otro'}
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
    this.TraeCliente();
  }

  TraeCliente(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Cliente_Apartado',
      "params": [this.id_cliente]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      if(_response.success.recordsets.length == 0 ){
        this.id_apartado = 0
      }
      else{
        let _referencias;
        _referencias = _response.success.recordsets[1];
        this.EstadoSeleccionado(_response.success.recordset[0].id_estado);
        this.EstadoEmpresaSeleccionado(_response.success.recordset[0].id_estado_cliente);
        if(_response.success.recordset[0].id_apartado_cliente != null){
          this.id_apartado = _response.success.recordset[0].id_apartado_cliente;
        }
        else{
          this.id_apartado = 0
        }
        if(_response.success.recordset[0].fecha_nacimiento != null){
          let u;
            u = _response.success.recordset[0].fecha_nacimiento.replace("T", " ");
            u = u.slice(0,-14);
            _response.success.recordset[0].fecha_nacimiento = u;
        }
        if(_response.success.recordset[0].peso_conyuge == 0){
          _response.success.recordset[0].peso_conyuge  = '';
        }
        if(_response.success.recordset[0].estatura_conyuge == 0){
          _response.success.recordset[0].estatura_conyuge  = '';
        }
        if(_response.success.recordset[0].antiguedad_conyuge == 0){
          _response.success.recordset[0].antiguedad_conyuge  = '';
        }
        if(_response.success.recordset[0].ingresos_mensuales_conyuge == 0){
          _response.success.recordset[0].antiguedad_conyuge  = '';
        }
        if(_response.success.recordset[0].puesto_conyuge == null){
          _response.success.recordset[0].antiguedad_conyuge  = '';
        }
        if(_response.success.recordset[0].fecha_matrimonio != null){
          let u;
            u = _response.success.recordset[0].fecha_matrimonio.replace("T", " ");
            u = u.slice(0,-14);
            if(u == '1900-01-01'){
              _response.success.recordset[0].fecha_matrimonio = '';
            }
            else{
              _response.success.recordset[0].fecha_matrimonio = u;
            }
            
        }
        this.capturaForm.setValue(
          {
            rfc:_response.success.recordset[0].rfc,
            calle:_response.success.recordset[0].direccion,
            numero_interior:_response.success.recordset[0].numero_interior,
            numero_exterior:_response.success.recordset[0].numero_exterior,
            colonia:_response.success.recordset[0].colonia,
            codigo_postal:_response.success.recordset[0].codigo_postal,
            telefono_casa:_response.success.recordset[0].telefono_casa,
            telefono_oficina:_response.success.recordset[0].telefono_oficina,
            vive_en:_response.success.recordset[0].vive_en,
            tiempo_residencia:_response.success.recordset[0].tiempo_residencia,
            numero_dependientes:_response.success.recordset[0].numero_dependientes,
            estado:_response.success.recordset[0].id_estado,
            ciudad:_response.success.recordset[0].id_ciudad,
            estado_civil:_response.success.recordset[0].estado_civil,
            peso:_response.success.recordset[0].peso,
            estatura:_response.success.recordset[0].estatura,
            fecha_nacimiento:_response.success.recordset[0].fecha_nacimiento,
            edad:_response.success.recordset[0].edad,
            lugar_nacimiento:_response.success.recordset[0].lugar_nacimiento,
            regimen_matrimonial:_response.success.recordset[0].regimen_matrimonial,
            fecha_matrimonio:_response.success.recordset[0].fecha_matrimonio,
            escolaridad:_response.success.recordset[0].escolaridad,
        
            nombre_empresa:_response.success.recordset[0].nombre_empresa_cliente,
            antiguedad:_response.success.recordset[0].antiguedad_empresa,
            puesto:_response.success.recordset[0].puesto_empresa,
            giro_empresa:_response.success.recordset[0].giro_empresa_cliente,
            tipo_contrato:_response.success.recordset[0].tipo_contrato,
            nombre_jefe:_response.success.recordset[0].nombre_jefe_cliente,
            departamento:_response.success.recordset[0].departamento_cliente,
            ingresos_mensuales:_response.success.recordset[0].ingresos_mensuales_cliente,
            calle_empresa:_response.success.recordset[0].calle_empresa,
            numero_interior_empresa:_response.success.recordset[0].numero_interior_cliente,
            numero_exterior_empresa:_response.success.recordset[0].numero_exterior_cliente,
            colonia_empresa:_response.success.recordset[0].colonia_cliente,
            codigo_postal_empresa:_response.success.recordset[0].codigo_postal_cliente,
            telefono_empresa:_response.success.recordset[0].telefono_cliente,
            extension_empresa:_response.success.recordset[0].extension_cliente,
            estado_empresa:_response.success.recordset[0].id_estado_cliente,
            ciudad_empresa:_response.success.recordset[0].id_ciudad_cliente,
            numero_seguro:_response.success.recordset[0].nss,
        
            nombre_conyuge:_response.success.recordset[0].nombre_conyuge,
            apellido_paterno_conyuge:_response.success.recordset[0].apellido_paterno_conyuge,
            apellido_materno_conyuge:_response.success.recordset[0].apellido_materno_conyuge,
            rfc_conyuge:_response.success.recordset[0].rfc_conyuge,
            lugar_nacimiento_conyuge:_response.success.recordset[0].lugar_nacimiento_conyuge,
            trabaja_conyuge:_response.success.recordset[0].trabaja,
        
            nombre_empresa_conyuge:_response.success.recordset[0].nombre_empresa_conyuge,
            antiguedad_conyuge:_response.success.recordset[0].antiguedad_conyuge,
            puesto_conyuge:_response.success.recordset[0].puesto_conyuge,
            giro_empresa_conyuge:_response.success.recordset[0].giro_empresa_conyuge,
            nombre_jefe_conyuge:_response.success.recordset[0].nombre_jefe_empresa_conyuge,
            departamento_conyuge:_response.success.recordset[0].departamento_empresa_conyuge,
            ingresos_mensuales_conyuge:_response.success.recordset[0].ingresos_mensuales_conyuge,
            calle_empresa_conyuge:_response.success.recordset[0].calle_empresa_conyuge,
            numero_interior_empresa_conyuge:_response.success.recordset[0].numero_interior_empresa_conyuge,
            numero_exterior_empresa_conyuge:_response.success.recordset[0].numero_exterior_empresa_conyuge,
            colonia_empresa_conyuge:_response.success.recordset[0].colonia_empresa_conyuge,
            codigo_postal_empresa_conyuge:_response.success.recordset[0].codigo_postal_empresa_conyuge,
            telefono_empresa_conyuge:_response.success.recordset[0].telefono_empresa_conyuge,
            extension_empresa_conyuge:_response.success.recordset[0].extension_empresa_conyuge,
            participa_credito:_response.success.recordset[0].participa_credito,
            escolaridad_conyuge:_response.success.recordset[0].escolaridad_conyuge,
            peso_conyuge:_response.success.recordset[0].peso_conyuge,
            estatura_conyuge:_response.success.recordset[0].estatura_conyuge,
            numero_seguro_conyuge:_response.success.recordset[0].nss_conyuge,
        
            nombre_referencia1:_referencias[0].nombre,
            direccion_referencia1:_referencias[0].direccion,
            telefono_referencia1:_referencias[0].telefono,
            nombre_referencia2:_referencias[1].nombre,
            direccion_referencia2:_referencias[1].direccion,
            telefono_referencia2:_referencias[1].telefono,
            nombre_referencia3:_referencias[2].nombre,
            direccion_referencia3:_referencias[2].direccion,
            telefono_referencia3:_referencias[2].telefono,
        
            monto_credito:_response.success.recordset[0].monto_credito,
            plazo:_response.success.recordset[0].plazo,
            enganche:_response.success.recordset[0].enganche,
          }) 
      }
     
    })
  }

  EstadoCivilSeleccionado(item){
    if(item == 'Casado'){
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
    this._combo_ciudades = [];
    this.capturaForm.value.id_ciudad = '';
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
    this._combo_ciudades_empresa = [];
    this.capturaForm.value.id_ciudad_cliente = '';
    this.estado_seleccionado_empresa = item;
    this.ComboCiudadesEmpresa();
  }



  ComboCiudadesEmpresa(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dbo.Trae_Ciudades',
      "params": [this.estado_seleccionado_empresa]

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
    if(this.capturaForm.value.ingresos_mensuales_conyuge == ''){
      this.capturaForm.value.ingresos_mensuales_conyuge = 0;
    }
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Guarda_Clientes_Apartado',
      "params": ["'" + this.id_apartado + "','" 
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
        this.router.navigate(['/crmclientes']);
      }
      
     
    })
  }

}