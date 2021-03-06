import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import {AppComponent} from '../../app.component';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public personal;
  public pregunta;

  capturaForm = this.formBuilder.group({
    anterior:['',Validators.required],
    nueva:['',Validators.required],
    repetir_nueva:['',Validators.required]
  })

  constructor(
    public apiService: ApiService,
    public router:Router,
    private appComponent:AppComponent,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.TraePersona();
  }

  TraePersona() {

    //BuscaUsuario 'admin2','p4ss'
    // let p = localStorage.getItem('id');
    let data = {
      "appname": "VIVANZA",
      "sp": 'Trae_Usuario',
      "params": [localStorage.getItem('id')]

    }

    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;

      localStorage.setItem('persona', _response.success.recordset[0].nombres + " " + _response.success.recordset[0].apellidos);
      localStorage.setItem('sucursal', _response.success.recordset[0].id_sucursal);
      /*let _persona = localStorage.getItem('persona') */
      this.personal = localStorage.getItem('persona');

      let data = {
        "appname": "VIVANZA",
        "sp": 'dvp.Trae_Usuarios_CRM',
        "params": [localStorage.getItem('id')]
  
      }
  
      this.apiService.ejecuta(data).subscribe((response) => {
        let _response;
        _response = response;
        localStorage.setItem('tipo', _response.success.recordset[0].tipo);
      })


    })

  }

  Reseteo(){
    if (this.capturaForm.value.nueva == this.capturaForm.value.repetir_nueva){
    let data = {
      "appname":"VIVANZA",
      /* "sp": 'dbo.Guarda_Persona', */
      "params": {
        "id_persona": localStorage.getItem('id'),
        "contrasena":this.capturaForm.value.nueva,
        "contrasena_anterior":this.capturaForm.value.anterior
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
    else{
      alert('Las contrase??as no son iguales');
    }
    
  }


  CerrarSesion() {
 
    var txt;
    var r = confirm("Esta cerrando sesi??n, ??est?? seguro?");
    if (r == true) {
      localStorage.clear();
      this.appComponent.MODULOSPORGRUPO = [];
      this.router.navigate(['login']); // tells them they've been logged out (somehow)

    } else {
      //txt = "You pressed Cancel!";
    }


    
  }

}
