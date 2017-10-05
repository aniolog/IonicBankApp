import { Injectable } from '@angular/core';
import {NovoHttp} from "../providers/novo-http";
import 'rxjs/add/operator/map';

/*
  Generated class for the Catalog provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CatalogService {

  constructor(private http: NovoHttp) {
  }

  getCatalog(){
     let reqBody:any={
          "idOperation":"2",
          "className":"com.novo.objects.TOs.UsuarioTO",
          "userName":"",
          "idUsuario":"",
          "logAccesoObject": {
                    "userName": "",
                    "sessionId": "",
                    "canal": "CPOMobile",
                    "modulo": "dashboard",
                    "funcion": "dashboard",
                    "operacion": "consulta",
                    "RC": 0,
                    "dttimesstamp": new Date()
                    }
          ,
          "token":"" 
      } 
     return this.http.makeRequest(reqBody);
  }


  getDetail(cardNumber:string){
      let reqBody:any={
          "idOperation":"3",
          "noTarjeta":cardNumber,
          "className":"com.novo.objects.TOs.TarjetaTO",
          "id_ext_per":this.http.getUserId(),
          "userName":"",
          "idUsuario":"",
          "logAccesoObject": {
                    "userName": "",
                    "sessionId": "",
                    "canal": "CPOMobile",
                    "modulo": "dashboard",
                    "funcion": "dashboard",
                    "operacion": "consulta",
                    "RC": 0,
                    "dttimesstamp": new Date()
                    }
          ,
          "token":"" 
      } 
     return this.http.makeRequest(reqBody); 
  }


   getBalance(cardNumber:string){
      let reqBody:any={
          "idOperation":"8",
          "noTarjeta":cardNumber,
          "className":"com.novo.objects.TOs.TarjetaTO",
          "id_ext_per":this.http.getUserId(),
          "userName":"",
          "idUsuario":"",
          "logAccesoObject": {
                    "userName": "",
                    "sessionId": "",
                    "canal": "CPOMobile",
                    "modulo": "dashboard",
                    "funcion": "dashboard",
                    "operacion": "consulta",
                    "RC": 0,
                    "dttimesstamp": new Date()
                    }
          ,
          "token":"" 
      } 
     return this.http.makeRequest(reqBody); 
  }



}
