import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

public gruposLogin;
public menus;

  constructor(
    public apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //let personal; 
    
    //this.personal = localStorage.getItem('persona')
  }

  click(comando){
    this.router.navigate(['crm-usuarios']);
  }
  

  

}
