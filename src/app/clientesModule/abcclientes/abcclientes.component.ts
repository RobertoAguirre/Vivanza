import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { param } from 'jquery';

@Component({
  selector: 'app-abcclientes',
  templateUrl: './abcclientes.component.html',
  styleUrls: ['./abcclientes.component.css']
})
export class AbcclientesComponent implements OnInit {

  private vista = '';
  public title = 'Nuevo cliente';
  public showNuevoDomicilio = false;
  public showNuevoTelefono = false;
  public showNuevoMetodoPago = false;



  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.vista = params['vista'];
      //alert(this.vista)
    });
  }

  toggleNuevoDomicilio() {
    this.showNuevoDomicilio = !this.showNuevoDomicilio 
  }

  toggleNuevoTelefono() {
    this.showNuevoTelefono = !this.showNuevoTelefono;
  }

  toggleNuevoMetodoPago(){
    this.showNuevoMetodoPago = !this.showNuevoMetodoPago;
  }

}
