import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
public id;
public gruposLogin;
public menus;
public MODULOSPORGRUPO = [];
  constructor(
    public apiService: ApiService,
    private router: Router
  ) { 
    this.id = localStorage.getItem('id');
  }

  ngOnInit(): void {
    //let personal; 
    this.MODULOSPORGRUPO = JSON.parse(localStorage.getItem('MODULOSPORGRUPO'));

    //this.personal = localStorage.getItem('persona')
  }




}
