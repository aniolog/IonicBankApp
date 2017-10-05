import {Component} from '@angular/core';
import {NavController, NavParams,ViewController,LoadingController,ModalController} from 'ionic-angular';
import {TranslateService} from "ng2-translate";
import {UserService} from "../../../services/user-service";
import {PerfilPage} from "../../perfil/perfil";
import {NewsfeedPage} from "../../newsfeed/newsfeed";
import {LoginPage} from "../../login/login";


/*
  Generated class for the DashboardPopover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard-popover',
  templateUrl: 'dashboard-popover.html'
})
export class DashboardPopoverPage {
  userName:string;
  userFullName:string;
  card:any;
  balance:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   private userService:UserService,public viewCtrl: ViewController,
   private service:UserService,private translateService:TranslateService,
   private loadingController: LoadingController,private modalCtrl: ModalController) 
   {
     this.userName=this.userService.getUserName();
     this.userFullName=this.userService.getUserFullName();
     this.card=this.navParams.get("card");
     this.balance=this.navParams.get("balance");

   }

  openProfile(){
    this.navCtrl.push(PerfilPage);
    this.viewCtrl.dismiss();
  }

  logout(){
      this.viewCtrl.dismiss();
      this.translateService.get("LABEL_LOADING").subscribe((message)=>{
        let loader = this.loadingController.create({
            content: message
          }); 
        loader.present();
        this.userService.logout().subscribe(
          (res)=>{
            this.userService.clearData();
            this.navCtrl.pop();
          },
          ()=>{
            this.userService.clearData();
            this.navCtrl.push(LoginPage);
            loader.dismiss();
            
          },
          ()=>{
             loader.dismiss();
          }
        );
      

    });
  }

}
