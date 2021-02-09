import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import * as Chart from '../../node_modules/chart.js';
import { ApiService } from './services/api.service.js';
import { isPlatformBrowser } from '@angular/common';
//import { LOCAL_STORAGE } from '@ng-toolkit/universal';

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
    @Inject(PLATFORM_ID) private platformId: Object,
    public apiService: ApiService
  ) {


    if (isPlatformBrowser(this.platformId)) {

      this.id = localStorage.getItem('id');
    }


  }

  title = 'Vivanza';

  ngOnInit() {
    // Client only code.
    if (isPlatformBrowser(this.platformId)) {
      /* let item = { key1: 'value1', key2: 'valu2' };
      localStorage.setItem(itemIndex, JSON.stringify(item)); */
    }

  }



}
