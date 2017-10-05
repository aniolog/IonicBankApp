import { Component,ViewChild,ElementRef,trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, NavParams,ViewController,Events } from 'ionic-angular';
/*
  Generated class for the WidthdrawModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-widthdraw-modal',
  templateUrl: 'widthdraw-modal.html',
   animations: [
 
    trigger('fade', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('visible <=> invisible', animate('400ms linear'))
    ]),
 
 
  ]
})
export class WidthdrawModal {

  amount:number=0;
  stepIndex=1;
  fadeInputState:String="visible";
  fadeQrState:String="invisible";
  card: any={};
  balance:  string="-";
  qrInfo:String="";
  code:String="";
  withdrawType:Boolean=false;

  constructor(public viewCtrl: ViewController,public navCtrl: NavController,
              public navParams: NavParams,public events:Events) {
    this.card=this.navParams.get("card");
    this.balance=this.navParams.get("balance");

  }


   close(){
   this.viewCtrl.dismiss();
  }

  stepForward(){
    this.stepIndex++;
    if(this.stepIndex==2){
       this.code=this.makeid();
       this.fadeInputState = (this.fadeInputState == 'visible') ? 'invisible' : 'visible';  
       this.fadeQrState = (this.fadeQrState == 'invisible') ? 'visible' : 'visible';  
       this.withdrawType =(this.amount %1 === 0)&&(this.amount%10===0);
       this.qrInfo=JSON.stringify({
            "amount":this.amount,
            "date":new Date(),
            "token":this.code,
            "phoneNumber"	:"+58 424-1364415",
            "firstName"	:"Jose Luis",
            "lastName"	:"Olarte"

       });
      }else if (this.stepIndex==3){
          this.viewCtrl.dismiss();
          this.card.movements.unshift({
              concepto:"Retiro de dinero",
              fecha:new Date(),
              signo:"-",
              monto:Number(this.amount),
              type:2,
              balance:this.card.balance
          });
          this.card.balance-=Number(this.amount)+0.3;
          this.events.publish('movement:created');
      }

  }

   makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }


}
