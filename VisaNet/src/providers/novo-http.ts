import { Injectable } from '@angular/core';
import { Http,ConnectionBackend,RequestOptions,Request,RequestOptionsArgs,Response,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {CryptoService} from '../../novoCrypto2';
import {NovoError} from "../errors/novo-error";
import {ErrorFactory} from "../errors/error-factory";

/*
  Generated class for the NovoHttp provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NovoHttp extends Http {

  baseUrl:string="http://72.46.255.110:8005/NovoInterfaceMovilesWS/webresources/movilsInterfaceResource";
  baseKey:string="MTIzNDU2NzgxMjM0NTY3OA==";
  country:string;
  keyId:string="CPONLINE";
  crypto:CryptoService;
  token:string;
  username:string;
  userId:string;
  userFullName:string;



  commonHeaders = new Headers({ 'Content-Type': 'text/plain' });
  commonOptions = new RequestOptions({ headers: this.commonHeaders });







  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
    this.commonHeaders.append("X-Security","ADVANCED");
    this.crypto=new CryptoService(this.baseKey);
    this.country="Global";
    this.token="";
    this.username="";
    this.userId="";
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);        
  }

  makeRequest(body:any):Observable<Response>{
    body.IP="172.24.16.177";
    if(this.token!==""){
      body.token=this.token;
      body.userName=this.username;
      body.idUsuario=this.userId;
      body.logAccesoObject.userName=this.username;
    }
    let encryptedBody={
      data:this.crypto.encrypt(JSON.stringify(body)),
      keyId:this.keyId,
      pais:this.country
    }

    return super.post(this.baseUrl,encryptedBody,this.commonOptions).map(
      (res:any)=>{
        try
        {
          console.log(res);
          let decryptedResponse=JSON.parse(this.crypto.decrypt(res.json().data));
          
          if(decryptedResponse.rc===0){
            return decryptedResponse;
          }else{
            throw  ErrorFactory.getErrorByCode(decryptedResponse.rc);
          }
        }catch(ex)
        {
          if(ex instanceof NovoError){
            throw ex;
          }else{
            throw  ErrorFactory.getErrorByCode(-134);
          }
        }
      }
    );
  }

  changeCountry(country:string){
    this.country=country;
  }

  setCryptoKey(key:string){
    this.crypto.setKey(key);
  }

  addHeader(headerKey:string,headerVal:string){
    this.commonHeaders.append(headerKey,headerVal);
  }

  deleteHeader(headerKey:string){
    this.commonHeaders.delete(headerKey);
  }

  setToken(token:string){
    this.token=token;
  }

  setUsername(username:string){
    this.username=username.toUpperCase();
  }

  setUseId(userId:string){
    this.userId=userId;
  }

  setKeyId(username:string){
    this.keyId=username.toUpperCase();
  }

  setCountry(country:string){
    this.country=country;
  }

  setUserFullName(firstName:string,lastName:string){
    this.userFullName=firstName[0]+". "+lastName;
   
  }

  getUserFullName():string{
    return this.userFullName;
  }

  getUsername():string{
      return this.username;
  }


  getUserId():string{
      return this.userId;
  }

  getUserCountry():string{
    return this.country;
  }

  clearData(){
    
    this.crypto=new CryptoService(this.baseKey);
    this.country="Global";
    this.keyId="CPONLINE";
  }

}
