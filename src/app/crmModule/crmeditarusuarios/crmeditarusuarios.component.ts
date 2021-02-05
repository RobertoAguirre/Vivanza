import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-crmeditarusuarios',
  templateUrl: './crmeditarusuarios.component.html',
  styleUrls: ['./crmeditarusuarios.component.css']
})
export class CrmeditarusuariosComponent implements OnInit {

  public item;
  public nombre_vista;
  public _combo_desarrollo;
  public _combo_tipo;
  public dataset;
  public label;

  capturaForm = this.formBuilder.group({
    nombres:['',Validators.required],
    apellido_paterno:['',Validators.required],
    apellido_materno:['',Validators.required],
    usuario:['',Validators.required],
    telefono:['',Validators.required],
    email:['',Validators.required],
    tipo:['',Validators.required],
    desarrollo:['',Validators.required],
    id:['',Validators.required]
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.item = JSON.parse(params['item']);
      if(this.item == 0){
        this.nombre_vista = 'Nuevo Usuario';
      }
      else{
        this.nombre_vista = 'Editar Usuario';
      }
      this.TraeUsuario();
      this.ComboDesarrollo();
      this._combo_tipo = [
        {nombre: 'Administrador'},
        {nombre: 'Coordinador'},
        {nombre: 'Asesor'},
        {nombre: 'Promotor'}
      ]
    });
  }

  ComboDesarrollo(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Desarrollos',
      "params": [1]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._combo_desarrollo = _response.success.recordsets[0];
    })
  }

  TraeUsuario() {

    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Usuarios_CRM',
      "params": [this.item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this.label = _response.success.recordset[0].desarrollo;
      this.capturaForm.setValue(
        {
          nombres: _response.success.recordset[0].nombres,
          apellido_paterno: _response.success.recordset[0].apellido_paterno,
          apellido_materno: _response.success.recordset[0].apellido_materno,
          usuario: _response.success.recordset[0].Usuario,
          email: _response.success.recordset[0].Correo,
          telefono: _response.success.recordset[0].Teléfono,
          tipo: _response.success.recordset[0].tipo,
          desarrollo: _response.success.recordset[0].desarrollo,
          id: _response.success.recordset[0].ID
        })
    })

  }


  changed(e){
    alert(e);
  }

  changedTipo(e){
    alert(e);

  }

  Guarda(){
    let data = {
      "appname":"VIVANZA",
      /* "sp": 'dbo.Guarda_Persona', */
      "params": {
        "id_sucursal": localStorage.getItem('sucursal'),
        "numero_empleado": '',
        "nombres":this.capturaForm.value.nombres,
        "apellido_paterno":this.capturaForm.value.apellido_paterno,
        "apellido_materno":this.capturaForm.value.apellido_materno,
        "iniciales":'',
        "sexo":'',
        "fecha_nacimiento":'',
        "contrasena":'12345678',
        "correo_electronico":this.capturaForm.value.email,
        "es_usuario_sistema":0,
        "autorizacion_remota":'',
        "lugar_nacimiento":'',
        "lugar_radica":'',
        "curp":'',
        "rfc":'',
        "numero_seguro_social":'',
        "usuario":this.capturaForm.value.usuario,
        "tipo": this.capturaForm.value.tipo,
        "desarrollo": this.capturaForm.value.desarrollo,
        "telefono": this.capturaForm.value.telefono,
        "id": this.capturaForm.value.id
      }
       

    }
    
    this.apiService.registra(data).subscribe((response) => {
      let _response;
      _response = response;
      if(_response.success.error == 1){
        alert(_response.success.mensaje);
      }
      else{
        
          this.capturaForm.setValue(
            {
              nombres: '',
              apellido_paterno: '',
              apellido_materno: '',
              usuario: '',
              email: '',
              telefono: '',
              tipo: '',
              desarrollo: '',
              id:''
            })
            alert(_response.success.mensaje);
            this.router.navigate(['/crmusuarios']);
      }
      
    }) 
  }

}
