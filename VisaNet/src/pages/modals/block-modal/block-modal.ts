import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the BlockModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-block-modal',
  templateUrl: 'block-modal.html'
})
export class BlockModal {

  status:boolean;
  statusPin:String;
  card:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public vwCtrl:ViewController) {
    this.status=this.navParams.get("status");
    this.card=this.navParams.get("card");
    console.log(this.card);
    this.statusPin="";

  }

  changeStatus(){
    this.vwCtrl.dismiss({'status':!this.status});
  }

  close(){
    this.vwCtrl.dismiss();
  }

}
