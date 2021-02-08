import { Component, OnInit } from '@angular/core';
import * as Chart from '../../node_modules/chart.js';
import { ApiService } from './services/api.service.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public gruposLogin;
  public menus;
  public id;
 

 // public MODULOSPORGRUPO = [];

  constructor(
    public apiService: ApiService
  ) {
    this.id = localStorage.getItem('id');
  }

  title = 'Vivanza';
  
  ngOnInit() {
    

  }

  

}
