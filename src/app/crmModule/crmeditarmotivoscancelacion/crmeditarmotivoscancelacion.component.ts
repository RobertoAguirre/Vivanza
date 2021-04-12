import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-crmeditarmotivoscancelacion',
  templateUrl: './crmeditarmotivoscancelacion.component.html',
  styleUrls: ['./crmeditarmotivoscancelacion.component.css']
})
export class CrmeditarmotivoscancelacionComponent implements OnInit {

  public _combo_estado;
  public item;
  public nombre_vista;
  public new;

  capturaForm = this.formBuilder.group({
    motivo:['',Validators.required],
    estado:['',Validators.required],
    id:['']
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
        this.nombre_vista = 'Nuevo Motivo de Cancelación';
        this.new = false;
        this.capturaForm.setValue(
          {
            motivo: '',
            estado: 'Activo',
            id: ''
          });
      }
      else{
        this.nombre_vista = 'Editar Motivo de Cancelación';
        this.new = true;
      }
      this.TraeDatos();
      this._combo_estado = [
        {estado: 'Activo'},
        {estado: 'Inactivo'}
      ]
    });
  }

  TraeDatos() {

    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Motivos_Cancelacion_CRM',
      "params": [this.item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;

      _response = response;
      this.capturaForm.setValue(
        {
          motivo: _response.success.recordset[0].Motivo,
          estado: _response.success.recordset[0].estado,
          id: _response.success.recordset[0].ID,
        })
    })

  }

  Guarda(){
    if(this.new == false){
      this.capturaForm.value.estado = 'Activo';
    }
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Guarda_Motivos_Cancelacion_CRM',
      "params": ["'" + this.item + "','" ,  this.capturaForm.value.motivo + "','",  this.capturaForm.value.estado +"'"  ]
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
        this.router.navigate(['/crmmotivoscancelacion']);
      }
      
     
    })
  }

  

}
