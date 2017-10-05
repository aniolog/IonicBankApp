import { Injectable } from '@angular/core';
import {NovoHttp} from "../providers/novo-http";
import 'rxjs/add/operator/map';
import {InvalidPasswordError} from "../errors/invalidpassword-error";

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {

    letterValidator:RegExp = /[A-z]/; // Almenos una letra
    capitalLetterValidator:RegExp = /[A-Z]/; // Una letra mayuscula
    NumberValidator:RegExp = /((\w|[!@#$%])*\d(\w|[!@#$%])*\d(\w|[!@#$%])*\d(\w|[!@#\$%])*(\d)*)/; // De 1 a 3 numeros
    Number2Validator:RegExp = /\d{1}/;
    consecutiveValidator:RegExp = /(.)\1{2,}/; // No puede tener mas de 3 caracteres consecutivos
    especialValidator :RegExp = /([!@\*\-\?¡¿+\/.,_#])/; // Debe tener almenos una caracter especial
    lowBalanceAmount=0;



  constructor(private http: NovoHttp) {  
      
  }



  makeLetterAvatar(name:String){
    if(name.length>0){
      var splittedName=name.split(' ');
      var letterAvatar=splittedName[0][0].toUpperCase();
      if(splittedName.length>3){
          letterAvatar=letterAvatar+" "+splittedName[2][0].toUpperCase();
      }
    
    }
    return letterAvatar;

  }

  setLowBalanceAmount(amount:any){
    this.lowBalanceAmount=amount;
  }

  getLowBalanceAmount(){
    return this.lowBalanceAmount;
  }



  login(username:string,passphrase:string){

    let reqBody:any={
          "idOperation":"1",
          "className":"com.novo.objects.TOs.UsuarioTO",
          "userName":username,
          "password":passphrase,
          "logAccesoObject": {"userName": username,
                    "sessionId": "",
                    "canal": "CPOMobile",
                    "modulo": "login",
                    "funcion": "login",
                    "operacion": "login",
                    "RC": 0,
                    "dttimesstamp": new Date()
                    }
          ,
          "token":"" 
    } 
    return this.http.makeRequest(reqBody);
  }

   logout(){

    let reqBody:any={
          "idOperation":"desconectarUsuario",
          "className":"com.novo.objects.TOs.UsuarioTO",
          "logAccesoObject": {
                    "sessionId": "",
                    "canal": "CPOMobile",
                    "modulo": "login",
                    "funcion": "logout",
                    "operacion": "logout",
                    "RC": 0,
                    "dttimesstamp": new Date()
                    }
          
    } 
    return this.http.makeRequest(reqBody);
  }

  getUserData(){
       let reqBody:any={
          "idOperation":"30",
          "className":"com.novo.objects.TOs.UsuarioTO",
          "logAccesoObject": {
                    "sessionId": "",
                    "canal": "CPOMobile",
                    "modulo": "login",
                    "funcion": "logout",
                    "operacion": "logout",
                    "RC": 0,
                    "dttimesstamp": new Date()
                    }
          
    } 
    return this.http.makeRequest(reqBody);


  }

   recoverPassword(userEmail:string,personalId:string){
       let reqBody:any={
          "idOperation":"23",
          "className":"com.novo.objects.TOs.UsuarioTO",
          "id_ext_per":personalId,
          "email":userEmail,
          "logAccesoObject": {
                    "userName":"USERNAME",
                    "sessionId": "",
                    "canal": "CPOMobile",
                    "modulo": "usuario",
                    "funcion": "clave",
                    "operacion": "recuperar",
                    "RC": 0,
                    "dttimesstamp": new Date()
                    }
          
    } 
    return this.http.makeRequest(reqBody);


  }


  changePassword(passphrase:string,oldPassphrase:string){

    let reqBody:any={
          "idOperation":"25",
          "className":"com.novo.objects.TOs.UsuarioTO",
          "password":passphrase,
          "passwordOld":oldPassphrase,
          "passwordOld4":oldPassphrase.toUpperCase(),
          "logAccesoObject": {
                    "sessionId": "",
                    "canal": "CPOMobile",
                    "modulo": "usuario",
                    "funcion": "clave",
                    "operacion": "actualizar",
                    "RC": 0,
                    "dttimesstamp": new Date()
                    }
          
    } 
    return this.http.makeRequest(reqBody);
  }




  checkPassword(password:string):boolean{

    if ((password.length<8)||(password.length>15)){
      throw new InvalidPasswordError("the password needs to have 8 character at minimun and 15 at maximun lenght","ALERT_BADPASSWORDLENGTH");
    }else if  (!(this.letterValidator.test(password))){
       throw new InvalidPasswordError("the password needs to contain at least a letter","ALERT_PASSWORDNOTCOTAINTLETTER");
    }else if  (!(this.capitalLetterValidator.test(password))){
      throw new InvalidPasswordError("the password needs to contain at least a capaital letter","ALERT_PASSWORDNOTCONTAINCLETTER");
    }else if  ((this.consecutiveValidator.test(password))){
      throw new InvalidPasswordError("the password needs to contain at least a three consecutive numbers","ALERT_PASSWORDNOTCONSECUTIVENUMS");
    }else if  (!(this.especialValidator.test(password))){
      throw new InvalidPasswordError("the password needs to contain at least an especial character","ALERT_PASSWORDNOTCOTAINESPECIAL");
    }
    return true;
  }





  setToken(token:string){
    this.http.setToken(token);
  }
  setUsername(username:string){
    this.http.setUsername(username);
    this.http.setKeyId(username);
  }

  setUserId(userId:string){
    this.http.setUseId(userId);
  }

  setCryptoKey(key:string){
    this.http.setCryptoKey(key);
  }


  setCountry(country:string){
    this.http.setCountry(country)
  }
  
  setUserFullName(firstName:string,lastName:string){
    this.http.setUserFullName(firstName,lastName);
  }

  getUserFullName():string{
    return this.http.getUserFullName();
  }

  getUserName():string{
    return this.http.getUsername();
  }

  getUserCountry():string{
    return this.http.getUserCountry();
  }
  
  clearData(){
    this.http.clearData();
  }

}
