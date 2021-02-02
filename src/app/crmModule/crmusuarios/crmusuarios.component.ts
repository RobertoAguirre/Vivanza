import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-crmusuarios',
  templateUrl: './crmusuarios.component.html',
  styleUrls: ['./crmusuarios.component.css']
})
export class CrmusuariosComponent implements OnInit {

  public _combo_desarrollo;
  public _combo_tipo;
  public usuario;


  capturaForm = this.formBuilder.group({
    nombres:['',Validators.required],
    apellido_paterno:['',Validators.required],
    apellido_materno:['',Validators.required],
    contrasena:['',Validators.required],
    email:['',Validators.required],
    tipo:['',Validators.required],
    usuario:['',Validators.required]
  })


  constructor(
    private apiService: ApiService,
    public formBuilder: FormBuilder
  ) { 



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

  Guarda(){
    alert(this.capturaForm.value.nombres);
  }


}
