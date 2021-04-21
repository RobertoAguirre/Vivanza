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

  dtOptions: DataTables.Settings = {};
  public table: any = $('#table2');
  

  public _combo_desarrollo;
  public _combo_tipo;
  public _combo_buscar;
  public usuario = 'Activos';
  /* public busca = 'Activos'; */


  
/*   public tituloTabla = "Tabla desde home";
  public descripcionTabla = "descripcion desde home"; */

  public valor = 0;
  public resultados;
  public token;
  public loginForm;
  public dataset;
  public pregunta;

  capturaFormBuscar = this.formBuilder.group({
    busca:['']

  })

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
    this.TraeUsuarios(0);
    this.ComboDesarrollo();
    localStorage.setItem('estatus','Activo');
    this.capturaFormBuscar.setValue(
      {
        busca: 'Activos',
      }) 
    this._combo_tipo = [
      {nombre: 'Administrador'},
      {nombre: 'Coordinador'},
      {nombre: 'Asesor'},
      {nombre: 'Promotor'}
    ]
    this._combo_buscar = [
      {nombre: 'Activos'},
      {nombre: 'Inactivos'}
    ]

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      order:[],
      language:{
        "processing": "Cargando ...",
        "search": "Buscar:",
        "lengthMenu": "Mostrando _MENU_ registros por página",
        "zeroRecords": "No se encontraron registros",
        "info": "Mostrando página _PAGE_ de _PAGES_",
        "infoEmpty": "No hay registros disponibles",
        "infoFiltered": "(fitrados de un total de  _MAX_ registros)",
        "paginate": {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        }
      }
    };

  }

  BuscarSeleccionado(item){
    localStorage.setItem('estatus',item);
    this.usuario = item;
    if(item == 'Activos'){
      this.TraeUsuarios(0);
    }
    else{
      this.TraeUsuarios(1);
    }
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

  TraeUsuarios(item) {

    //BuscaUsuario 'admin2','p4ss'

    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Trae_Usuarios_CRM_Lista',
      "params": [item]

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
    if(localStorage.getItem('estatus') == 'Activo'){
      this.pregunta = confirm('¿Está seguro de querer dar de baja al usuario '+item.Nombre+'?');
    }
    else{
      this.pregunta = confirm('¿Está seguro de querer activar al usuario '+item.Nombre+'?');
    }

    if (this.pregunta == true){
      let data = {
        "appname":"VIVANZA",
        "sp": 'dvp.Elimina_Usuario_CRM',
        "params": ["'" + id + "','" ,  localStorage.getItem('id') + "'"]
        
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
          this.router.navigate(['./crmusuarios'], { relativeTo: this.route });
          localStorage.setItem('estatus','');
        }
      })
    }
    
  }

  ReseteoContrasena(item){
    let id = item.ID;
    this.pregunta = confirm('¿Está seguro de querer resetear la contraseña al usuario '+item.Nombre+'?');
    if (this.pregunta == true){
      let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let data = {
      "appname":"VIVANZA",
      /* "sp": 'dbo.Guarda_Persona', */
      "params": {
        "id_persona": item.ID,
        "contrasena":result,
        "correo_electronico":item.Correo
      }
       

    }
    
    this.apiService.reseteoContrasena(data).subscribe((response) => {
      let _response;
      _response = response;
      if(_response.success.error == 1){
        alert(_response.success.mensaje);
      }
      else{     
            alert(_response.success.mensaje);
      }
      
    })
    }
    
  }


  NuevoUsuario(item){
    item = JSON.stringify(item);
    this.router.navigate(['/crmeditarusuarios'],{queryParams:{'item':item}});
  }

 


}
