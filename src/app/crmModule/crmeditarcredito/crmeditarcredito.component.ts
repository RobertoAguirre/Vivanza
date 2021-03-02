import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-crmeditarcredito',
  templateUrl: './crmeditarcredito.component.html',
  styleUrls: ['./crmeditarcredito.component.css']
})
export class CrmeditarcreditoComponent implements OnInit {

  public _combo_estado;
  public item;
  public nombre_vista;
  public new;
  public canal;
  public nombre_tipo_credito;

  capturaForm = this.formBuilder.group({
    credito:['',Validators.required],
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
      this.nombre_tipo_credito = params.tipo_credito;
      if(this.item == 0){
        this.nombre_vista = 'Nuevo Crédito de Tipo de Crédito: '+this.nombre_tipo_credito+'';
        this.new = false;
        this.capturaForm.setValue(
          {
            credito: '',
            estado: 'Activo',
            id: ''
          });
      }
      else{
        this.TraeCredito();
        this.nombre_vista = 'Editar Crédito de Tipo de Crédito: '+this.nombre_tipo_credito+'';
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
      "sp": 'dvp.Trae_Credito_CRM',
      "params": [this.item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      
      this.capturaForm.setValue(
        {
          credito: _response.success.recordset[0].Credito,
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
      "sp": 'dvp.Guarda_Credito_CRM',
      "params": ["'" + this.item + "','" ,  this.capturaForm.value.credito + "','" ,  this.capturaForm.value.estado +"','" ,this.canal +"'"  ]
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
        this.router.navigate(['/crmcredito']);
      }
      
     
    })
  }

}
