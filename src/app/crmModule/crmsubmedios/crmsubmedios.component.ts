import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-crmsubmedios',
  templateUrl: './crmsubmedios.component.html',
  styleUrls: ['./crmsubmedios.component.css']
})
export class CrmsubmediosComponent implements OnInit {

  public _combo_canales;
  public _combo_medios;
  public item;
  public nombre_vista;
  public dataset;
  public new = true;
  public canal;

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
    this.ComboCanales();
  }

  ComboCanales(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Canales',
      "params": []

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._combo_canales = _response.success.recordsets[0];
    })
  }

  ComboMedios(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Medios',
      "params": [this.canal]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._combo_medios = _response.success.recordsets[0];
    })
  }

  CanalSeleccionado(item){
    this.canal = item;
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Medios_Canal_CRM',
      "params": [item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this.new = false;
      this.ComboMedios();
      this.dataset = _response.success.recordset;
  /*     this.capturaForm.setValue(
        {
          canal: _response.success.recordset[0].Canal,
          estado: _response.success.recordset[0].estado,
          id: _response.success.recordset[0].ID
        }) */
    })
  }

  TraeDatos() {

    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Medios_Canal_CRM',
      "params": [this.item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this.dataset = _response.success.recordset;
  /*     this.capturaForm.setValue(
        {
          canal: _response.success.recordset[0].Canal,
          estado: _response.success.recordset[0].estado,
          id: _response.success.recordset[0].ID
        }) */
    })

  }

  Editar(item){
    let id;
    id = item.ID;
    item = JSON.stringify(item);
    this.router.navigate(['/crmeditarmedios'],{queryParams:{'item':id, 'canal':0}});
    /* alert("logica para editar " + item); */
  }

  Nuevo(i){
    let id;
    id = this.canal;
    /* item = JSON.stringify(item); */
    this.router.navigate(['/crmeditarmedios'],{queryParams:{'item':i, 'canal':id}});
  }

  Eliminar(item){
    let id = item.ID;
    let pregunta = confirm('¿Está seguro de querer eliminar el medio '+item.Medio+'?');
    if (pregunta == true){
      let data = {
        "appname":"VIVANZA",
        "sp": 'dvp.Elimina_Medio_CRM',
        "params": [id]
  
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
          /* this.TraeDatos(); */
        }
      })
    }
    
  }

}
