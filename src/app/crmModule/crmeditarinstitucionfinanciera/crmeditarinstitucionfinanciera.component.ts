import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-crmeditarinstitucionfinanciera',
  templateUrl: './crmeditarinstitucionfinanciera.component.html',
  styleUrls: ['./crmeditarinstitucionfinanciera.component.css']
})
export class CrmeditarinstitucionfinancieraComponent implements OnInit {

  public _combo_estado;
  public item;
  public nombre_vista;
  public new;
  public credito;

  capturaForm = this.formBuilder.group({
    institucion:['',Validators.required],
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
      this.credito = JSON.parse(params['canal']);
      if(this.item == 0){
        this.nombre_vista = 'Nueva Institución Financiera';
        this.new = false;
        this.capturaForm.setValue(
          {
            institucion: '',
            estado: 'Activo',
            id: ''
          });
      }
      else{
        this.TraeCredito();
        this.nombre_vista = 'Editar Institución Financiera';
        this.new = true;
      }
      
      this._combo_estado = [
        {estado: 'Activo'},
        {estado: 'Inactivo'}
      ]
    });
  }

  TraeCredito() {

    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Institucion_Financiera_CRM',
      "params": [this.item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      
      this.capturaForm.setValue(
        {
          institucion: _response.success.recordset[0].Canal,
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
      "sp": 'dvp.Guarda_Institucion_Financiera_CRM',
      "params": ["'" + this.item + "','" ,  this.capturaForm.value.institucion + "','" ,  this.capturaForm.value.estado +"','" ,this.credito +"'"  ]
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
        this.router.navigate(['/crminstitucionfinanciera']);
      }
      
     
    })
  }


}
