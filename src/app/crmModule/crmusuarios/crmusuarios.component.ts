import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-crmusuarios',
  templateUrl: './crmusuarios.component.html',
  styleUrls: ['./crmusuarios.component.css']
})
export class CrmusuariosComponent implements OnInit {

  public _combo_desarrollo;
  public _combo_tipo;
  public usuario;

  
/*   public tituloTabla = "Tabla desde home";
  public descripcionTabla = "descripcion desde home"; */

  public valor = 0;
  public resultados;
  public token;
  public loginForm;
  public dataset;


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
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    public formBuilder: FormBuilder
  ) { 



  }

  ngOnInit(): void {
    $('html,body').scrollTop(0);
    this.TraeUsuarios();
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

  TraeUsuarios() {

    //BuscaUsuario 'admin2','p4ss'

    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Usuarios_CRM',
      "params": [0]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this.dataset = _response.success.recordset;
    })

  }

  Editar(item){
    let id;
    id = item.ID;
    item = JSON.stringify(item);
    this.router.navigate(['/crmeditarusuarios'],{queryParams:{'item':id}});
    /* alert("logica para editar " + item); */
  }

  Eliminar(item){
    let id = item.ID;
    let pregunta = confirm('¿Está seguro de querer eliminar el usuario '+item.Nombre+'?');
    if (pregunta == true){
      let data = {
        "appname":"VIVANZA",
        "sp": 'dvp.Elimina_Usuario_CRM',
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
          this.TraeUsuarios();
        }
      })
    }
    
  }

  NuevoUsuario(item){
    item = JSON.stringify(item);
    this.router.navigate(['/crmeditarusuarios'],{queryParams:{'item':item}});
  }

 


}
