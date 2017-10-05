import { ErrorHandler } from '@angular/core';
import {TranslateService} from "ng2-translate";
import {NovoError} from "../errors/novo-error"; 
import {BlockedCardError} from "../errors/blockedcard-error";
import {DataBaseError} from "../errors/database-error";
import {DecryptError} from "../errors/decrypt-error"; 
import {EmptyListError} from "../errors/emptylist-error";
import {ExpiredCardError} from "../errors/expiredcard-error";
import {ExpiredPasswordError} from "../errors/expiredpassword-error";
import {ExpiredTemporalPasswordError} from "../errors/expiredtemporalpassword-error";
import {ExpiredTokenError} from "../errors/expiredtoken-error";
import {GeneralError} from "../errors/general-error";
import {InvalidCredentialError} from "../errors/invalidcredentials-error";
import {InvalidParameterError} from "../errors/invalidparameters-error";
import {InvalidTokenError} from "../errors/invalidtoken-error";
import {NonExistingTokenError} from "../errors/nonexistingtoken-error";
import {NoRecordsError} from "../errors/norecords-error";
import {NoUpdatedPassword} from "../errors/notnuptadedpassword-error";
import {SuspendedUserError} from "../errors/suspendeduser-error";
import {UnactiveUserError} from "../errors/unactiveuser-error";
import {UnblockedCardError} from "../errors/unblockedcard-error";
import {UnrecoveredPasswordError} from "../errors/unrecoverdpassword-error";
import {UnsendedEmailError} from "../errors/unsendedemail-error";
import {ToastController} from 'ionic-angular';



export class NovoErrorHandler implements ErrorHandler{

    constructor(private translateService:TranslateService,private toastCtrl:ToastController){
      
    }

    handleError(err: any): void {
    var translateKey="";
    var position="bottom";
    if(err instanceof DataBaseError){
        translateKey="ALERT_DATABASERROR";
    }
    if(err instanceof UnblockedCardError){
         translateKey="ALERT_UNBLOCKEDCARDERROR";
    }
    if(err instanceof BlockedCardError){
         translateKey="ALERT_BLOCKEDCARDERROR";
    }
    if(err instanceof InvalidParameterError){
         translateKey="ALERT_INVALIDPARAMETERERROR";
    }
    if(err instanceof NoUpdatedPassword){
         translateKey="ALERT_NOUPDATEDPASSWORD";
    }
    if(err instanceof ExpiredTemporalPasswordError){
         translateKey="ALERT_EXPIREDTEMPORALPASSWORDERROR";
    }
    if(err instanceof UnrecoveredPasswordError){
        console.log("aqui");
         translateKey="ALERT_UNRECOVEREDPASSWORDERROR";
    }
    if(err instanceof ExpiredPasswordError){
         translateKey="ALERT_EXPIREDPASSWORDERROR";
    }
    if(err instanceof UnsendedEmailError){
         translateKey="ALERT_UNSENDEDEMAILERROR";
    }
    if(err instanceof EmptyListError){
         translateKey="ALERT_EMPTYLISTERROR";
    }
    if(err instanceof DecryptError){
         translateKey="ALERT_DECRYPTERROR";
    }
    if(err instanceof NonExistingTokenError){
         translateKey="ALERT_NONEXISTINGTOKENERROR";
    }
    if(err instanceof ExpiredTokenError){
         translateKey="ALERT_EXPIREDTOKENERROR";
    }   
    if(err instanceof ExpiredCardError){
         translateKey="ALERT_EXPIREDCARDERROR";
    }
    if(err instanceof InvalidTokenError){
         translateKey="ALERT_INVALIDTOKENERROR";
    }
    if(err instanceof SuspendedUserError){
         translateKey="ALERT_SUSPENDEDUSERERROR";
    }   
    if(err instanceof GeneralError){
         translateKey="ALERT_GENERALERROR";
    }
    if(err instanceof NoRecordsError){
         translateKey="ALERT_NORECORDSERROR";
    }
    if(err instanceof UnactiveUserError){
         translateKey="ALERT_UNACTIVEUSERERROR";
    }
    if(err instanceof InvalidCredentialError){
         translateKey="ALERT_INVALIDCREDENTIALERROR";
    }
    if(!(err instanceof NovoError)){
         translateKey="ALERT_NOVOERROR";
    }

    this.translateService.get(translateKey).subscribe(
      (translatedMessage)=>{

          this.translateService.get("LABEL_OK").subscribe(
              (okLabel)=>{
                console.log(translatedMessage);
                console.log(err);
                let toast = this.toastCtrl.create({
                    message: translatedMessage,
                    duration: 5000,
                    position:position,
                    showCloseButton:true,
                    closeButtonText:okLabel

                });
                toast.present();

              }
          );



    });


    }
    

}