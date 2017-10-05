import { Component } from '@angular/core';
import {NavController, NavParams, ModalController,ToastController} from 'ionic-angular';
import {ServiceModal} from "../modals/service-modal/service-modal";
import {TranslateService} from "ng2-translate";
import {BaseComponent} from "../base-component";
import { Events } from 'ionic-angular';

/*
  Generated class for the Services page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-services',
  templateUrl: 'services.html'
})
export class ServicesPage extends BaseComponent {

  displayCard:any={};
  balance:Number=0;
  payments:Array<any>;
  total=0;


  constructor(public navCtrl: NavController, public navParams: NavParams,private modalCtrl: ModalController,
  private myToastCtrl:ToastController, private translateService:TranslateService,public events: Events) {
    super(myToastCtrl);
    this.displayCard=navParams.get("card");
    this.displayCard.balace=navParams.get("balance");
    this.payments=[];
  }

  openServiceModal(){
    let modal = this.modalCtrl.create(ServiceModal);
    modal.onDidDismiss((response)=>{
      if(response){
        if(response.amount>0){
          this.payments.unshift(response);
          this.getTotal();
        }
      }
    });
    modal.present();
  }

  getTotal(){
    this.total=0;
    this.payments.forEach(element => {
      this.total+=element.amount;
    });

  }

  makeTransaction(){
        this.translateService.get("ALERT_SUCCESS").subscribe((message)=>{
                this.showToast(message,"bottom");
                this.displayCard.movements.unshift(
                  {
                      concepto:"Pago de servicios",
                      fecha:new Date(),
                      signo:"-",
                      monto:this.total,
                      type:3,
                      balance:this.displayCard.balance
                  }


                );
                this.displayCard.balance-=this.total;
                this.events.publish('movement:created');
                this.navCtrl.pop();
          });
  }


}
