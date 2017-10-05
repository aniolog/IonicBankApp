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


export class ErrorFactory{

    static getErrorByCode(code:number):NovoError{

        if(code==-911){
            return new DataBaseError();
        }else if (code==-267){
            return new UnblockedCardError();
        }else if (code==-266){
            return new BlockedCardError();
        }else if (code==-241){
            return new InvalidParameterError();
        }else if (code==-199){
            return new NoUpdatedPassword();
        }else if (code==-194){
            return new ExpiredTemporalPasswordError();
        }else if (code==-186){
            return new UnrecoveredPasswordError();
        }else if (code==-185){
            return new ExpiredPasswordError();
        }else if (code==-173){
            return new UnsendedEmailError();
        }else if (code==-150){
            return new EmptyListError();
        }else if (code==-134){
            return new DecryptError();
        }else if (code==-133){
            return new NonExistingTokenError();
        }else if (code == -130){
            return new ExpiredTokenError();
        }else if (code==-125){
            return new ExpiredCardError();
        }else if (code==-61){
            return new InvalidTokenError();
        }else if (code == -35){
            return new SuspendedUserError();
        }else if (code==-33){
            return new GeneralError();
        }else if (code==-15){
            return new NoRecordsError();
        }else if (code==-8){
            return new UnactiveUserError();
        }else if (code==-1){
            return new InvalidCredentialError();
        }
        return new NovoError("UnhandleError",-9999);
    }

}