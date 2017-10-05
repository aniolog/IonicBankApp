import { Component } from '@angular/core';
import { NavParams,ViewController } from 'ionic-angular';

/*
  Generated class for the FilterModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filter-modal',
  templateUrl: 'filter-modal.html'
})
export class FilterModal {

  options:any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {

      this.options=this.navParams.get("options");
      console.log(this.options);
      
  }

  filter(){
    this.viewCtrl.dismiss({"options":this.options});
  }

  changeToRecent(recentFilter:boolean){
    this.options.recent=recentFilter;
  }


}
