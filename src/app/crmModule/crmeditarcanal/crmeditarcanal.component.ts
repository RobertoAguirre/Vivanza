import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-crmeditarcanal',
  templateUrl: './crmeditarcanal.component.html',
  styleUrls: ['./crmeditarcanal.component.css']
})
export class CrmeditarcanalComponent implements OnInit {

  public _combo_estado;
  public _combo_promotor;
  public item;
  public nombre_vista;
  public new;

  capturaForm = this.formBuilder.group({
    canal:['',Validators.required],
    estado:['',Validators.required],
    id:[''],
    promotor:['',Validators.required]
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    public formBuilder: FormBuilder
  ) { 
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.item = JSON.parse(params['item']);
      if(this.item == 0){
        this.nombre_vista = 'Nuevo Canal';
        this.new = false;
        this.capturaForm.setValue(
          {
            canal: '',
            estado: 'Activo',
            id: '',
            promotor: 'No'
          });
      }
      else{
        this.nombre_vista = 'Editar Canal';
        this.new = true;
      }
      this.TraeDatos();
      this._combo_estado = [
        {estado: 'Activo'},
        {estado: 'Inactivo'}
      ]
      this._combo_promotor = [
        {estado: 'No'},
        {estado: 'Si'}
      ]
    });
  }

  TraeDatos() {

    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Canales_CRM',
      "params": [this.item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;

      _response = response;
      var a;
      if(_response.success.recordset[0].Promotor === true){
          a = 'Si';
      }
      else{
        a = 'No';
      }
      
      this.capturaForm.setValue(
        {
          canal: _response.success.recordset[0].Canal,
          estado: _response.success.recordset[0].estado,
          id: _response.success.recordset[0].ID,
          promotor:a
        })
    })

  }

  Guarda(){
    if(this.new == false){
      this.capturaForm.value.estado = 'Activo';
    }
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Guarda_Canales_CRM',
      "params": ["'" + this.item + "','" ,  this.capturaForm.value.canal + "','",  this.capturaForm.value.promotor + "','" ,  this.capturaForm.value.estado +"'"  ]
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
        this.router.navigate(['/crmcanales']);
      }
      
     
    })
  }

  

}
