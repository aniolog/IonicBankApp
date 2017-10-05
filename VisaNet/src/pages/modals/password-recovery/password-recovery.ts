import { Component } from '@angular/core';
import {ViewController,LoadingController,ToastController } from 'ionic-angular';
import {TranslateService} from "ng2-translate";
import {UserService} from "../../../services/user-service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseComponent} from "../../base-component";

/*
  Generated class for the PasswordRecovery page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-password-recovery',
  templateUrl: 'password-recovery.html'
})
export class PasswordRecovery extends BaseComponent {

  email:string;
  personalId:string;
  recoverValidator:any

  constructor(private viewCtrl:  ViewController,private loadingCtrl:LoadingController,private translateService:TranslateService,private formBuilder:FormBuilder,private service:UserService,private myToastCtrl:ToastController) {
    super(myToastCtrl);
    this.email="";
    this.personalId="";

    this.recoverValidator = formBuilder.group({
        emailValidator: ['', Validators.compose([Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/), Validators.required])],
        personalIdValidator: ['', Validators.compose([Validators.required])],
    });

  }

  ionViewDidLoad() {
    
  }



  close(){
     this.viewCtrl.dismiss();
  }

  recover(){
    this.translateService.get("LABEL_LOADING").subscribe(
      (message)=>{
          let recoverLoader=this.loadingCtrl.create({ content: message});
          recoverLoader.present();
          this.service.recoverPassword(this.email,this.personalId).subscribe(
            (res)=>{
              this.translateService.get("ALERT_SUCCESSFULLPASSWORDREQ").subscribe(
                (message)=>{
                  recoverLoader.dismiss();
                  this.viewCtrl.dismiss();
                  this.showToast(message,"center");
                }
              );
            },(err)=>{
              recoverLoader.dismiss();
              this.viewCtrl.dismiss();
              throw err;
            }
          );

          
      });
 
  
  }

}
