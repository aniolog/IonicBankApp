import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,Platform,ModalController,ToastController,App} from 'ionic-angular';
import {PasswordChange} from "../modals/password-change/password-change";
import {HomePage} from "../home/home";
import {Page1} from "../page1/page1";
import {UserService} from "../../services/user-service";
import {Md5} from 'ts-md5/dist/md5';
import {PasswordRecovery} from "../modals/password-recovery/password-recovery";
import {BaseComponent} from "../base-component";
import {NovoError} from "../../errors/novo-error";
import {TranslateService} from "ng2-translate";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[UserService]
})
export class LoginPage extends BaseComponent {

  username:string;
  password:string;
 

  constructor(public navCtrl: NavController, public navParams: NavParams,private service:UserService,
              private loadingController: LoadingController,private modalCtrl: ModalController,
              private translateService:TranslateService,private myToastCtrl:ToastController,private app: App) {
    super(myToastCtrl);
    this.username="";
    this.password="";
    this.app._setDisableScroll(false);
    
  }

  login(){
    this.navCtrl.setRoot(Page1);
    /*
    this.translateService.get("LABEL_LOADING").subscribe((message)=>{

      
          let loader = this.loadingController.create({
            content: message
          }); 
          loader.present();
          let hashedPassword=Md5.hashStr(this.password) as string;
          this.service.login(this.username,hashedPassword).subscribe(
            (response:any)=>{
              console.log(response);
              this.service.setToken(response.token);
              this.service.setUserFullName(response.primerNombre,response.primerApellido);
              this.service.setUsername(response.logAccesoObject.userName);
              this.service.setUserId(response.idUsuario);
              this.service.setCryptoKey(response.keyUpdate);
              this.service.setCountry(response.codPais);

              if(("passwordTemp" in response)&&(response.passwordTemp=="1")){
                  let changeModal = this.modalCtrl.create(PasswordChange);
                  changeModal.present();
              }else{
                 this.navCtrl.setRoot(Page1);
              }
             

              loader.dismiss();
            },
            (error:NovoError)=>{
                loader.dismiss(error);
                throw error;
            }
          );


    });*/
  
  }


  passwordRecovery(){

    let modal = this.modalCtrl.create(PasswordRecovery);
    modal.present();

  }


}
