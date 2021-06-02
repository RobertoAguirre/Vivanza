import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-asesores-promotores',
  templateUrl: './asesores-promotores.component.html',
  styleUrls: ['./asesores-promotores.component.css']
})
export class AsesoresPromotoresComponent implements OnInit {

  public tituloTabla = 'Asesores y Promotores'
  public descripcionTabla = "Tabla de Asesores y Promotores";
  public dataset;

  constructor(
    private router:Router,
    private apiService: ApiService,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.TraeAsesoresPromotores();
  }

  TraeAsesoresPromotores(){
    let data = {
      "appname":"VIVANZAJR",
      "sp": "dvp.Trae_Asesores_Promotores",
      "params" : []
    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;

      this.dataset = _response.success.recordset;
    })
  }

  EditarAsesorPromotor(item) {
    // item = JSON.stringify(item);
    // this.router.navigate(['/asignacion-modulos'], { queryParams: { 'item': item } });
  }

  EliminarAsesorPromotor(item) {
    // alert("logica para borrar item  " + item);
  }
}
