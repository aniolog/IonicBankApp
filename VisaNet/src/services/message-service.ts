import {Injectable } from '@angular/core';
import {Http,RequestOptionsArgs,Headers,RequestOptions,Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {SMS} from "ionic-native";
import 'rxjs/add/operator/map';

/*
  Generated class for the EmailProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MessageService {



  commonHeaders:Headers; 
  commonOptions:RequestOptions;

  


  constructor(public http: Http) {
    this.commonHeaders=   new Headers({ 
      'country': 'Ec',
      'channel':'MiVecino',
      'Content-Type':"application/json" ,
      'Access-Control-Allow-Origin':"*"});
    this.commonOptions =  new RequestOptions({ headers: this.commonHeaders });
  }


  sendEmail(accounter:any,code:string):Observable<Response>{
    let baseUrl:string="https://72.46.255.110:8010/notification/1.0/mail/send";
    return this.http.post(baseUrl,{
          "recipients": [accounter.email], 
          "subject": "Envío de dinero", 
          "senderName": "mivecino@novopayment.com", 
          "bodyMail": this.makeMessage(accounter,code,true), 
          "processName": "Envío de dinero "
      },this.commonOptions).map((response:Response)=>{  
         return response.json();
    });
    
  }



  sendSMS(accounter:any,code:string){
    SMS.send(accounter.phone,this.makeMessage(accounter,code,false)).then(()=>{
      console.log("a");
    },(error)=>{
      console.log(JSON.stringify(error));
    });
  }


  makeMessage(accounter:any,code:string,type:Boolean):string{


    let formatedAmount:string =  accounter.amount.toLocaleString(undefined, {maximumFractionDigits:1});

    let htmlBody="<p>Estimado(a) $to$"+
              "Jose Luis Olarte te ha enviado $$formatedAmount$."+
              " Puedes retirar tu dinero en cualquier ATM del Banco Pichincha o a trav&eacutes de un Corresponsal No Bancario Mi Vecino presentando el siguiente c&oacutedigo $code$.</p>";

    let smsBody="Estimado(a) $to$,"+
              "Jose Luis Olarte te ha enviado $$formatedAmount$."+
              " Puedes retirar tu dinero en cualquier ATM del Banco Pichincha o a través de un Corresponsal No Bancario Mi Vecino presentando el siguiente código: $code$.";


    let body= (type)? htmlBody:smsBody;
    
    body = body.replace("$to$",accounter.displayName);
    body = body.replace("$formatedAmount$",formatedAmount);
    body = body.replace("$code$",code);
    return body;

  }






}
