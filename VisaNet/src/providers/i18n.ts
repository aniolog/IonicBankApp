import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http,ConnectionBackend,RequestOptions,Request,RequestOptionsArgs,Response,Headers } from '@angular/http';
import {CryptoService} from '../../novoCrypto2';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

/*
  Generated class for the Language provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class I18nProvider {
  baseUrl:string="http://172.24.16.188:8080/cpo/movil/i18n.jso";
  offlinePath:string="./assets/i18n.json";
  
  crypto:CryptoService;
  constructor(public http: Http) {

     this.crypto=new CryptoService("MTIzNDU2NzgxMjM0NTY3OA==");
     
  }

  getOnlineLanguage():Observable<Response>{
    return this.http.get(this.baseUrl).map(
      (res)=>{
        return this.decrypt(res.text());
      },(error)=>{
        console.log(error);
      });
  }

  getOfflineLanguage():Observable<Response>{
    return this.http.get(this.offlinePath).map(
      (res)=>{
       return res.json();
      },(error)=>{
        console.log(error);
      });
  }


  decrypt(languagesPkg:string):any{
    console.log(this.crypto.decrypt(languagesPkg));
    return JSON.parse(this.crypto.decrypt(languagesPkg));

  }
}
