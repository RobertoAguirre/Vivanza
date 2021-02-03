import { Component, Input, OnInit } from '@angular/core';
import { INSPECT_MAX_BYTES } from 'buffer';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-barsmultiple',
  templateUrl: './barsmultiple.component.html',
  styleUrls: ['./barsmultiple.component.css']
})
export class BarsmultipleComponent implements OnInit {

  //cada dataset requiere su titulo sus datos y sus colores

  @Input() etiquetasEjeX;

  @Input() tituloDataset1;
  @Input() multipledataset1;
  @Input() coloresFondoDataset1;

  @Input() tituloDataset2;
  @Input() multipledataset2;
  @Input() coloresFondoDataset2;

  @Input() tituloDataset3;
  @Input() multipledataset3;
  @Input() coloresFondoDataset3;

  canvas: any;
  ctx: any;


  constructor() { }

  ngOnInit(): void {

    this.canvas = document.getElementById('myMultipleChart');
    this.ctx = this.canvas.getContext('2d');

    var myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.etiquetasEjeX,
        datasets: [{
          label: this.tituloDataset1,
          data: this.multipledataset1,
          backgroundColor: this.coloresFondoDataset1,
          borderWidth: 1
        }, {
          label: this.tituloDataset2,
          data: this.multipledataset2,
          backgroundColor: this.coloresFondoDataset2,
          borderWidth: 1

        }, {
          label: this.tituloDataset3,
          data: this.multipledataset3,
          backgroundColor: this.coloresFondoDataset3,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

  }

}
