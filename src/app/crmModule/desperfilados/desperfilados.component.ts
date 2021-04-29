import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-desperfilados',
  templateUrl: './desperfilados.component.html',
  styleUrls: ['./desperfilados.component.css'],
  providers: [DatePipe]
})
export class DesperfiladosComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  public table: any = $('#table2');

  public xml;
  public xml_desperfilado;
  public _combo_tipo_de_cliente;
  public _combo_desperfilado;
  public  dataset;
  public _combo_personal;
  public id_persona_asignar;

  capturaForm = this.formBuilder.group({
    fecha_inicio:[''],
    fecha_fin:[''],
    tipo_cliente:[''],
    motivo_desperfilado:[''],
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    public formBuilder: FormBuilder,
    private exportService: ExportService,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this._combo_tipo_de_cliente = [
      {nombre: 'Prospecto'},
      {nombre: 'Cliente Potencial'},
      {nombre: 'Apartado'},
      {nombre: 'Vendido'},
      {nombre: 'Cancelado'}
    ]
    this._combo_desperfilado = [
      {nombre: 'Desperfilado'},
      {nombre: 'Ya compro'},
      {nombre: 'Problemas crediticios'},
      {nombre: 'Desinterés'}
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

  Busca(){
    if(this.capturaForm.value.fecha_inicio == null){
      this.capturaForm.value.fecha_inicio = '';
    }
    if(this.capturaForm.value.fecha_fin == null){
      this.capturaForm.value.fecha_fin = '';
    }
    if(this.capturaForm.value.tipo_cliente == null){
      this.capturaForm.value.tipo_cliente = '';
    }
    if(this.capturaForm.value.motivo_desperfilado == null){
      this.capturaForm.value.motivo_desperfilado = '';
    }
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Clientes_Desperfilados',
      "params": ["'" + this.capturaForm.value.fecha_inicio + "','" 
      ,  this.capturaForm.value.fecha_fin + "','"  
      ,  this.capturaForm.value.tipo_cliente + "','" 
      ,  this.capturaForm.value.motivo_desperfilado +"'" 
    ]

    }
    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this.dataset = _response.success.recordset;
         
    })
  }

  Asignar(){
    
    this.xml = "N" + '<values>';
    this.dataset.forEach(element => {
      
      if(element.active == true){
        this.xml = this.xml + '<row id = "'+element.id_cliente+'"/>'
      }

    });
    this.xml_desperfilado = this.xml +  '</values>';
    this.xml_desperfilado;


    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Pasa_Clientes_Desperfilados',
      "params": ["'" + this.id_persona_asignar + "','" 
      ,  this.xml_desperfilado +"'" 
    ]

    }
    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this.capturaForm.reset();
      this._combo_personal = []; 
      this.dataset = '';
      alert('Cambios guardados exitosamente.');
    })
  }

  Pasar(){
  
    let data = {
      "appname":"VIVANZA",
      "sp": 'dvp.Combo_Personal_CRM',
      "params": []

    }
    this.apiService.ejecuta(data).subscribe((response) => {
      let _response;
      _response = response;
      this._combo_personal = _response.success.recordset;
         
    })
  }

  PersonaSeleccionada(i){
    this.id_persona_asignar = i;
  }

}
