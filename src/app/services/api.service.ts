import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  serviceUrl = 'http://74.208.145.99:40000/api/';

  constructor(
    private http: HttpClient
  ) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  }



  public pruebaGet() {
    try {
      return this.http.get(this.serviceUrl + 'pruebaget');
    } catch (ex) {
      console.log(ex);
    }

  }


  public pruebaGetProtegido(tkn) {

  
   this.httpOptions.headers = this.httpOptions.headers.set('access-token','Bearer ' + tkn);

    try {
      return this.http.get(this.serviceUrl + 'pruebagetProtegida',this.httpOptions);
    } catch (ex) {
      console.log(ex);
    }

  }




  public ejecuta(data) {


    return this.http.post(this.serviceUrl + 'EjecutaConsulta/', data);


  }

  //trae token
  public autentifica(data) {

    return this.http.post(this.serviceUrl + 'autentificar/', data);

  }



}
