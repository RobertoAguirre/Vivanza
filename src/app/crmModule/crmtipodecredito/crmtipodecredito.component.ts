import { Component, OnInit } from '@angular/core';import { ApiService } from '../../services/api.service';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-crmtipodecredito',
  templateUrl: './crmtipodecredito.component.html',
  styleUrls: ['./crmtipodecredito.component.css']
})
export class CrmtipodecreditoComponent implements OnInit {

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
      "sp": 'dvp.Trae_Tipos_de_Credito_CRM',
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
    this.router.navigate(['/crmeditartipodecredito'],{queryParams:{'item':item}});
  }

  Editar(item){
    let id;
    id = item.ID;
    item = JSON.stringify(item);
    this.router.navigate(['/crmeditartipodecredito'],{queryParams:{'item':id}});
    /* alert("logica para editar " + item); */
  }

  Eliminar(item){
    let id = item.ID;
    let pregunta = confirm('¿Está seguro de querer eliminar el tipo de crédito '+item['Tipo de Crédito']+'?');
    if (pregunta == true){
      let data = {
        "appname":"VIVANZA",
        "sp": 'dvp.Elimina_Tipo_de_Credito_CRM',
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
          //Para navegar de nuevo al componente actual (refresh a componentes)
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['./crmtipodecredito'], { relativeTo: this.route });
        }
      })
    }
    
  }


}
