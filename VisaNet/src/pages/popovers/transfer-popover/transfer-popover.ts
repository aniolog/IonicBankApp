import {Component} from '@angular/core';
import {NavController, NavParams,ViewController,ModalController} from 'ionic-angular';
import {TransfersPage} from "../../transfers/transfers";
import {ServicesPage} from "../../services/services";
import {WidthdrawModal} from "../../modals/widthdraw-modal/widthdraw-modal";


/*
  Generated class for the TransferPopover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-transfer-popover',
  templateUrl: 'transfer-popover.html'
})
export class TransferPopoverPage {

  card:any={};

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public modalCtrl:ModalController) {
    this.card=this.navParams.get("card");
  }


  goToTrans(isBankTransfer:boolean){
    this.navCtrl.push(TransfersPage,{"type":isBankTransfer,"card":this.card,balance:this.navParams.get("balance")}).then((response)=>{
      this.viewCtrl.dismiss();
    });
  }

  goToServices(){
       this.navCtrl.push(ServicesPage,{"card":this.card,balance:this.navParams.get("balance")}).then((response)=>{
        this.viewCtrl.dismiss();

       });
       
  }

  openWidthdraw(){
      let modal = this.modalCtrl.create(WidthdrawModal,{"card":this.card,balance:this.navParams.get("balance")});
      modal.present();
      this.viewCtrl.dismiss();
  
  }

  

}
