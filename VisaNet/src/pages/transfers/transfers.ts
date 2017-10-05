import { Component } from '@angular/core';
import {NavController, NavParams,LoadingController,Platform,ModalController,ToastController,PopoverController,Events} from 'ionic-angular';
import {TranslateService} from "ng2-translate";
import {BaseComponent} from "../base-component";
import {AccountersModal} from "../modals/accounters-modal/accounters-modal";
import {MessageService} from "../../services/message-service";


/*
  Generated class for the Transfers page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-transfers',
  templateUrl: 'transfers.html'
})
export class TransfersPage extends BaseComponent{

  card: any={};
  balance:  string="-";
  accounters: Array<any>=[];
  amount:Number=0;
  transferType:boolean;

  


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private loadingController: LoadingController,private modalCtrl: ModalController,
              private translateService:TranslateService,private myToastCtrl:ToastController,
              public popoverCtrl: PopoverController, private events:Events, private messageService:MessageService) {
    super(myToastCtrl);
    this.card=this.navParams.get("card");
    this.balance=this.navParams.get("balance");
    this.transferType=this.navParams.get("type");
  }

  openAccounterModal(){
    let modal = this.modalCtrl.create(AccountersModal,{type:this.transferType});
    modal.onDidDismiss((response)=>{
    if(response.amount>0){
      let adder;
      console.log(response);
      this.accounters.forEach(element => {
        if(element.displayName==response.accounter.to){
          adder=element;
        }
      });
      if(adder==null){
          var formatter=response.accounter;
          formatter.amount=response.amount;
          this.accounters.push(formatter);
      }else{
          adder.amount+=response.amount;
      }
    }
      
    });
    modal.present();
  }

 delete(element:any){
   this.accounters.splice(this.accounters.indexOf(element),1);

 }

  getTotal(){
    let total=0;
    this.accounters.forEach((accounter)=>{
      total+=accounter.amount;
    });
    return total;
  }

  makeid():string{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  goToDashBoard(){
    
    this.accounters.forEach(accounter => {
      console.log(accounter);
      if(!this.transferType){
          this.messageService.sendEmail(accounter,this.makeid()).subscribe(()=>{
            console.log("lo envie");
          },(error)=>{
              console.log(JSON.stringify(error));
          });
      }else{
          this.messageService.sendSMS(accounter,this.makeid());
      }
    
    });

  

    this.translateService.get("ALERT_SUCCESS").subscribe((message)=>{
        this.showToast(message,"bottom");
        this.card.movements.unshift({
            concepto:(!this.transferType)?"Transferencia":"Envío de dinero",
            fecha:new Date(),
            signo:"-",
            monto:this.getTotal()+(0.3*this.accounters.length),
            type:(!this.transferType)?4:1,
            balance:this.card.balance
        });
        this.card.balance-=this.getTotal()+(0.30*this.accounters.length);
        this.navCtrl.pop();
        this.events.publish('movement:created');
     });
  }
  

}
