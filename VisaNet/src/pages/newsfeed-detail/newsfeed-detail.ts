import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the NewsfeedDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-newsfeed-detail',
  templateUrl: 'newsfeed-detail.html'
})
export class NewsfeedDetailPage {
  title:String=null;
  fullImage:String=null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title=navParams.get("title");
    this.fullImage=navParams.get("fullImage");
    console.log(this.fullImage);
  }


}
