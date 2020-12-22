import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public title = "Clientes";

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  gotoABC(){

    this.router.navigate(['/abcclientes'], {queryParams: {vista: 'nuevo'}});
    //this.router.navigateByUrl('/abcclientes',{});
    
  }

}
