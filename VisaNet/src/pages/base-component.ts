import {ToastController} from 'ionic-angular';
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



export class BaseComponent{

    constructor(private toastCtrl:ToastController){
    }


    showToast(toastMessage:string,toastPosition:string){

         let toast = this.toastCtrl.create({
              message: toastMessage,
              duration: 3000,
              position:toastPosition
        });
        toast.present();
    }

}