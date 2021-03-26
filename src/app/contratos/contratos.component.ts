import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms'
@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  public item;
  public datos_cliente;
  public referencias_cliente;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.item = JSON.parse(params['item']);
      
    });
    this.TraeCliente();
  }

  TraeCliente(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Cliente_Apartado',
      "params": [this.item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      let u;
      u = _response.success.recordset[0];
      this.datos_cliente = u;
     /*  this.datos_cliente = u; */
      this.referencias_cliente = _response.success.recordsets[1];
      this.datos_cliente.fecha_nacimiento = this.datos_cliente[0].fecha_nacimiento.slice(0,-14);
      this.datos_cliente.fecha_matrimonio = this.datos_cliente[0].fecha_matrimonio.slice(0,-14);
    })
  }

/*   TraeCliente(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Cliente_Apartado',
      "params": [this.item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      let u;
      u = _response.success.recordset[0];
      this.datos_cliente = u;
      this.referencias_cliente = _response.success.recordsets[1];
      this.datos_cliente.fecha_nacimiento = this.datos_cliente[0].fecha_nacimiento.slice(0,-14);
      this.datos_cliente.fecha_matrimonio = this.datos_cliente[0].fecha_matrimonio.slice(0,-14);
    })
  } */

}
