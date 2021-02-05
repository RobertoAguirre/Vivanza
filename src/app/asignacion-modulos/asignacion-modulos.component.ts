import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-asignacion-modulos',
  templateUrl: './asignacion-modulos.component.html',
  styleUrls: ['./asignacion-modulos.component.css']
})
export class AsignacionModulosComponent implements OnInit {

  public _combo_desarrollo;
  public _combo_tipo;
  public usuario;

  public item;

  capturaForm = this.formBuilder.group({
    nombres: ['', Validators.required],
    apellido_paterno: ['', Validators.required],
    apellido_materno: ['', Validators.required],
    contrasena: ['', Validators.required],
    email: ['', Validators.required],
    usuario: ['', Validators.required]
  })


  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public formBuilder: FormBuilder
  ) {



  }

  ngOnInit(): void {
    /*     this.route.queryParams.subscribe(params => {
          this.item = JSON.parse(params['item']);
        }); */
    this.LlenaCamposFormulario();
  }

  Guarda() {
    alert(this.capturaForm.value.nombres);
  }

  LlenaCamposFormulario() {

    this.capturaForm.setValue(
      {

        nombres: "roberto",
        apellido_paterno: "aguirre",
        apellido_materno: "rodriguez",
        contrasena: "asdf",
        email: "some",
        usuario: "asdf"
      })


  }

}
