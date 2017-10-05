import { Component } from '@angular/core';
import { ViewController , NavParams,PopoverController,ModalController,LoadingController} from 'ionic-angular';
import {AccounterModal} from "../../modals/accounter-modal/accounter-modal"
import {TranslateService} from "ng2-translate"

/*
  Generated class for the AccountersModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-accounters-modal',
  templateUrl: 'accounters-modal.html'
})
export class AccountersModal {

  accounters:Array<any>;
  selectedAccounter:any;
  amount:string;
  transacctionType:Boolean;
  filterVal:String="";



  constructor(public viewCtrl: ViewController , public navParams: NavParams,
              private mdlCtrl:ModalController,private loadingController: LoadingController,
              private translateService:TranslateService) {
    this.transacctionType= navParams.get("type");
    this.accounters= [];

  }

  isSelected(Accounter:any){
    return (this.selectedAccounter==null)?false:(this.selectedAccounter.account==Accounter.account);
  }

  select(Accounter:any){
    this.selectedAccounter=Accounter;
  }

  close(accounter:any,amount:string){
    console.log(amount);
    let amountFormatter=(typeof amount !== "undefined")?parseInt(amount):0;
    this.viewCtrl.dismiss({"accounter":accounter,"amount":amountFormatter});
 }

 openAccountersPopover(event:any){
    let modal = this.mdlCtrl.create(AccounterModal);
    modal.onDidDismiss((response)=>{
      console.log(response)
      if((typeof response !== "undefined")){
           this.accounters.unshift(response);
           this.selectedAccounter=response;
          
      }
    });
    modal.present();
 }



 
 
 cancelFiltering(){
     if(this.transacctionType){
      //  this.getAllContacts();
     }

 }

}
