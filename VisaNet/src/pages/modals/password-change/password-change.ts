import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,ViewController,LoadingController } from 'ionic-angular';
import {BaseComponent} from "../../base-component";
import {TranslateService} from "ng2-translate";
import {UserService} from "../../../services/user-service";
import {InvalidPasswordError} from "../../../errors/invalidpassword-error";
import {Md5} from 'ts-md5/dist/md5';
import{Page1} from "../../page1/page1";




/*
  Generated class for the PasswordChange page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-password-change',
  templateUrl: 'password-change.html'
})
export class PasswordChange extends BaseComponent {
  newPassword:string;
  tempPassword:string;
  confirmationPassword:string;
  checkPasswordMsg:string;
  checkPasswordClass:string;
  checkPassworValidation:boolean;

  

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastController:ToastController,
  private translateService:TranslateService,private service:UserService,private viewCtrl:ViewController,private loadingController:LoadingController) {
    super(toastController);
    this.newPassword="";
    this.tempPassword="";
    this.checkPassworValidation=false;
    this.confirmationPassword="";
 
  }

  checkConfirmation(){
    if(this.confirmationPassword==this.newPassword){

    }
    else{

    }
  }

  checkNewPassword(){
    try{
      this.service.checkPassword(this.newPassword);
      this.checkPasswordMsg="";
       this.translateService.get("ALERT_VALID").subscribe(
         (message)=>{
           this.checkPasswordMsg=message;
           this.checkPasswordClass="success";
           this.checkPassworValidation=true;
         });
    }catch(ex){
      if(ex instanceof InvalidPasswordError){
        let realError= ex as InvalidPasswordError;
        this.translateService.get(realError.getTranslateKey()).subscribe(
          (message)=>{
            this.checkPasswordMsg=message;
            this.checkPasswordClass="alert";
            this.checkPassworValidation=false;
        });
      }else {
        throw ex;
      }

    }
  }



  changePassword(){
    let hashedNewPassword=Md5.hashStr(this.newPassword) as string;
    let hashedTempPassword=Md5.hashStr(this.tempPassword) as string;
    this.translateService.get("LABEL_LOADING").subscribe((message)=>{
        let loader = this.loadingController.create({
          content: message
        }); 
        loader.present();
        this.service.changePassword(hashedNewPassword,hashedTempPassword).subscribe(
          (response)=>{
            this.viewCtrl.dismiss();
            this.navCtrl.setRoot(Page1);
            loader.dismiss();

          },
          (error)=>{
            this.viewCtrl.dismiss();
            loader.dismiss();
            throw error;
          });
    });

  }

}
