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
  public item;
  public nombre_vista;
  public new;

  capturaForm = this.formBuilder.group({
    canal:['',Validators.required],
    estado:['',Validators.required],
    id:['',Validators.required]
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    public formBuilder: FormBuilder
  ) { 
    this.new = false;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.item = JSON.parse(params['item']);
      if(this.item == 0){
        this.nombre_vista = 'Nuevo Canal';
        
      }
      else{
        this.nombre_vista = 'Editar Canal';
      }
      this.TraeCanal();
      this._combo_estado = [
        {nombre_estado: 'Activo'},
        {nombre_estado: 'Inactivo'}
      ]
    });
  }

  TraeCanal() {

    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Canales_CRM',
      "params": [this.item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      
      this.capturaForm.setValue(
        {
          canal: _response.success.recordset[0].Canal,
          estado: _response.success.recordset[0].estado,
          id: _response.success.recordset[0].ID
        })
    })

  }

  Guarda(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Guarda_Canales_CRM',
      "params": [this.item + ',' ,  this.capturaForm.value.canal + ',' ,  this.capturaForm.value.estado]
      /* "params":['admin2,','p4ss'] */
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
