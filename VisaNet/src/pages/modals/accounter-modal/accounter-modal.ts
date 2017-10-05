import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { UserService } from '../../../services/user-service';
import {Contacts} from "ionic-native"
import { ActionSheetController } from 'ionic-angular'

/*
  Generated class for the AccounterModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-accounter-modal',
  templateUrl: 'accounter-modal.html'
})
export class AccounterModal {

  letterAvatar="";
  contact:any;
  phoneOptions:Array<any>;
  emailOptions:Array<any>;


  constructor(public viewCtrl: ViewController,public navCtrl: NavController, 
              public navParams: NavParams,public userService:UserService,
              public actionSheetCtrl: ActionSheetController) {

                this.emailOptions=[];
                this.phoneOptions=[];
                this.contact={};
  }

 save(){
    this.viewCtrl.dismiss(this.contact);
 }

 close(){
   this.viewCtrl.dismiss();
 }

 makeLetterAvatar(){
    var name=(this.contact.displayName===null)?this.contact.name.formatted:this.contact.displayName;
    this.letterAvatar=this.userService.makeLetterAvatar(name);
 }


 findContact(){
    let contactsfound
    Contacts.pickContact().then(
      (contactsfound) => {
        this.contact=contactsfound;
        if(this.contact.displayName===null){
          this.contact.displayName=this.contact.name.formatted;
        }
        this.makeLetterAvatar();
        if(this.contact.emails!==null){
              this.contact.email=this.contact.emails[0].value;
              contactsfound.emails.forEach(element => {
                this.emailOptions.push({
                      text: element.value,
                      handler: () => {
                            this.contact.email=element.value;
                      }
                });
            });

        }
        if(this.contact.phoneNumbers!==null){
          this.contact.phone=this.contact.phoneNumbers[0].value;
          contactsfound.phoneNumbers.forEach(element => {
              this.phoneOptions.push({
                    text: element.value,
                    handler: () => {
                          this.contact.phone=element.value;
                    }
              });
          });

          
        }


      },(error)=>{
        this.contact={};
      }
    );


 }


 openPhoneActionSheet(){
  this.actionSheetCtrl.create({
    title: 'Seleccione un teléfono',
     buttons:this.phoneOptions
    }).present();;
 }

  openEmailActionSheet(){
  this.actionSheetCtrl.create({
    title: 'Seleccione un correo',
     buttons:this.emailOptions
    }).present();;
 }

}
