import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import * as Chart from '../../node_modules/chart.js';
import { ApiService } from './services/api.service.js';
import { isPlatformBrowser } from '@angular/common';
//import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { ActivatedRoute } from '@angular/router';
import { AuthService }from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public id;
  public gruposLogin;
  public menus;
  public MODULOSPORGRUPO = [];
  public grupoModulos;
  public modulos;
 
  // public MODULOSPORGRUPO = [];

  constructor(
    public apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private authService:AuthService
  ) {


  
    this.id = localStorage.getItem('id');
    this.activatedRoute.url.subscribe(url => {
      console.log(url);
      
    });


  }

  title = 'Vivanza';

  ngOnInit() {

   /*  var islogged = this.authService.isLoggedIn();

    if (islogged === true){
      

    } */
    
  }





}
