import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-crmcredito',
  templateUrl: './crmcredito.component.html',
  styleUrls: ['./crmcredito.component.css']
})
export class CrmcreditoComponent implements OnInit {

  public _combo_creditos;
  public item;
  public nombre_vista;
  public dataset;
  public new = true;
  public credito;

  capturaForm = this.formBuilder.group({
    credito:['',Validators.required],
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
    this.ComboCreditos();
  }
  ComboCreditos(){
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Tipos_de_Credito',
      "params": []

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._combo_creditos = _response.success.recordsets[0];
    })
  }

  CreditoSeleccionado(item){
    this.credito = item;
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Credito_Tipos_CRM',
      "params": [item]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this.new = false;
      this.dataset = _response.success.recordset;

    })
  }

  Nuevo(i){
    let id;
    id = this.credito;
    /* item = JSON.stringify(item); */
    this.router.navigate(['/crmeditarcredito'],{queryParams:{'item':i, 'canal':id}});
  }

  Editar(item){
    let id;
    id = item.ID;
    item = JSON.stringify(item);
    this.router.navigate(['/crmeditarcredito'],{queryParams:{'item':id, 'canal':0}});
    /* alert("logica para editar " + item); */
  }

  Eliminar(item){
    let id = item.ID;
    let pregunta = confirm('¿Está seguro de querer eliminar el crédito '+item.Crédito+'?');
    if (pregunta == true){
      let data = {
        "appname":"VIVANZA",
        "sp": 'dvp.Elimina_Credito_CRM',
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
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['./crmcredito'], { relativeTo: this.route });
        }
      })
    }
    
  }

}
