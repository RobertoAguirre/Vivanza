import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-crmcanales',
  templateUrl: './crmcanales.component.html',
  styleUrls: ['./crmcanales.component.css']
})
export class CrmcanalesComponent implements OnInit {

  public dataset;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.TraeDatos();
  }

  TraeDatos() {

    //BuscaUsuario 'admin2','p4ss'

    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Canales_CRM',
      "params": [0]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this.dataset = _response.success.recordset;
    })

  }

  Nuevo(item){
    item = JSON.stringify(item);
    this.router.navigate(['/crmeditarcanal'],{queryParams:{'item':item}});
  }

  Editar(item){
    let id;
    id = item.ID;
    item = JSON.stringify(item);
    this.router.navigate(['/crmeditarcanal'],{queryParams:{'item':id}});
    /* alert("logica para editar " + item); */
  }

}
