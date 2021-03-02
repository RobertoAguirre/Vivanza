import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-crmeditarmedios',
  templateUrl: './crmeditarmedios.component.html',
  styleUrls: ['./crmeditarmedios.component.css']
})
export class CrmeditarmediosComponent implements OnInit {

  public _combo_estado;
  public item;
  public nombre_vista;
  public new;
  public canal;
  public nombre_canal;

  capturaForm = this.formBuilder.group({
    medio:['',Validators.required],
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
      this.canal = params.canal;
      this.nombre_canal = params.nombre_canal;
/*       this.item = JSON.parse(params['item']);
      this.canal = JSON.parse(params['canal']);
      this.nombre_canal = JSON.parse(params['nombre_canal']); */
      if(this.item == 0){
        this.nombre_vista = 'Nuevo Medio de Canal: '+this.nombre_canal+'';
        this.new = false;
        this.capturaForm.setValue(
          {
            medio: '',
            estado: 'Activo',
            id: ''
          });
      }
      else{
        this.TraeMedio();
        this.nombre_vista = 'Editar Medio de Canal: '+this.nombre_canal+'';
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
      "sp": 'dvp.Trae_Medios_CRM',
      "params": [this.item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      
      this.capturaForm.setValue(
        {
          medio: _response.success.recordset[0].Canal,
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
      "sp": 'dvp.Guarda_Medios_CRM',
      "params": ["'" + this.item + "','" ,  this.capturaForm.value.medio + "','" ,  this.capturaForm.value.estado +"','" ,this.canal +"'"  ]
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
        this.router.navigate(['/crmmedios']);
      }
      
     
    })
  }


}
