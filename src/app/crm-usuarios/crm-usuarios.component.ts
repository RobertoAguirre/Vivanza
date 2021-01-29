import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-crm-usuarios',
  templateUrl: './crm-usuarios.component.html',
  styleUrls: ['./crm-usuarios.component.css']
})
export class CrmUsuariosComponent implements OnInit {
  public _combo_desarrollo;
  public _combo_tipo;
  public usuario;
  public nombres;
  public capturaForm;

  constructor(
    private apiService: ApiService,
    public formBuilder: FormBuilder
  ) { 
    this.capturaForm = new FormGroup({
      nombres: new FormControl(),
      apellidos: new FormControl(),
      usuario: new FormControl(),
      telefono: new FormControl(),
      correo: new FormControl(),
      tipo: new FormControl(),
      desarrollo: new FormControl(),
     

    });
  }

  ngOnInit(): void {
    this.ComboDesarrollo();

    this._combo_tipo = [
      {nombre: 'Administrador'},
      {nombre: 'Coordinador'},
      {nombre: 'Asesor'},
      {nombre: 'Promotor'}
    ]
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

  changed(e){
    alert(e);
  }

  changedTipo(e){
    alert(e);

  }

    Guarda(){
      alert(this.capturaForm);
    }


  


}
