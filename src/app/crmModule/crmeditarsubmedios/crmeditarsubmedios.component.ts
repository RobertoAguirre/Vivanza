import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-crmeditarsubmedios',
  templateUrl: './crmeditarsubmedios.component.html',
  styleUrls: ['./crmeditarsubmedios.component.css']
})
export class CrmeditarsubmediosComponent implements OnInit {

  public _combo_estado;
  public item;
  public nombre_vista;
  public new;
  public medio;
  public nombre_canal;
  public nombre_medio;

  capturaForm = this.formBuilder.group({
    submedio:['',Validators.required],
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
      this.item = params.item;
      this.medio = params.canal;
      this.nombre_canal = params.nombre_canal;
      this.nombre_medio = params.nombre_medio;
      if(this.item == 0){
        this.nombre_vista = 'Nuevo Submedio de Canal: '+this.nombre_canal+' y Medio: '+this.nombre_medio+'';
        this.new = false;
        this.capturaForm.setValue(
          {
            submedio: '',
            estado: 'Activo',
            id: ''
          });
      }
      else{
        this.TraeMedio();
        this.nombre_vista = 'Editar Submedio de Canal: '+this.nombre_canal+' y Medio: '+this.nombre_medio+'';
        this.new = true;
      }
      
      this._combo_estado = [
        {estado: 'Activo'},
        {estado: 'Inactivo'}
      ]
    });
  }

  TraeMedio() {

    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Submedios_CRM',
      "params": [this.item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      
      this.capturaForm.setValue(
        {
          submedio: _response.success.recordset[0].Canal,
          estado: _response.success.recordset[0].estado,
          id: _response.success.recordset[0].ID
        })
    })

  }

  Guarda(){
    if(this.new == false){
      this.capturaForm.value.estado = 'Activo';
    }
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Guarda_Submedios_CRM',
      "params": ["'" + this.item + "','" ,  this.capturaForm.value.submedio + "','" ,  this.capturaForm.value.estado +"','" ,this.medio +"'"  ]
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
        this.router.navigate(['/crmsubmedios']);
      }
      
     
    })
  }


}
