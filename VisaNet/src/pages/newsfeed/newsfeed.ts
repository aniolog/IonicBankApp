import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NewsfeedDetailPage} from '../newsfeed-detail/newsfeed-detail';

/*
  Generated class for the Newsfeed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-newsfeed',
  templateUrl: 'newsfeed.html'
})
export class NewsfeedPage {

  ads:Array<any>=new Array<any>();



  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ads=[
      {
        "title":"voygo ad",
        "body":"voygo ad's body",
        "image":"assets/image/voygo.png",
        "fullImage":"assets/image/voygo-detail.png",
        "arrival":"now"
      },
      {
        "title":"cpo ad",
        "body":"cpo ad's body",
        "image":"assets/image/cpo.png",
        "fullImage":"assets/image/cpo-detail.png",
        "arrival":"1h"
      },
      {
        "title":"pichincha ad",
        "body":"pichincha ad's body",
        "image":"assets/image/pichincha.png",
        "fullImage":"assets/image/pichincha-detail.png",
        "arrival":"3h"
      }
      
      ];

  }

  openDetail(ad:any){
    this.navCtrl.push(NewsfeedDetailPage,ad);
  }

}
