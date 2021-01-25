import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent {
  @Input() tituloTabla: string;
  @Input() descripcionTabla: string;
  @Input() dataset;
  constructor() {

    

  }




}
