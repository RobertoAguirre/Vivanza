import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
    selector: 'app-area',
    templateUrl: './area.component.html',
    styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

    @Input() tipografica;
    @Input() etiquetas; //debe ser un arreglo de strings 
    @Input() data;  //debe ser un arreglo de cantidades o numeros
    //AMGOS ARREGLOS DEBEN TENER LA MISMA LONGITUD
    @Input() titulotabla;
    @Input() coloresFondo;

    canvas: any;
    ctx: any;

    constructor() { }



    ngOnInit(): void {

        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');

        var myChart = new Chart(this.ctx, {
            type: this.tipografica,
            data: {
                //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                labels: this.etiquetas,
                datasets: [{
                    label: this.titulotabla,
                    data: this.data,
                    backgroundColor: this.coloresFondo,

                    /*               backgroundColor: [
                                      'rgba(255, 99, 132, 0.2)',
                                      'rgba(54, 162, 235, 0.2)',
                                      'rgba(255, 206, 86, 0.2)',
                                      'rgba(75, 192, 192, 0.2)',
                                      'rgba(153, 102, 255, 0.2)',
                                      'rgba(255, 159, 64, 0.2)'
                                  ],
                                  borderColor: [
                                      'rgba(255, 99, 132, 1)',
                                      'rgba(54, 162, 235, 1)',
                                      'rgba(255, 206, 86, 1)',
                                      'rgba(75, 192, 192, 1)',
                                      'rgba(153, 102, 255, 1)',
                                      'rgba(255, 159, 64, 1)'
                                  ], */
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
