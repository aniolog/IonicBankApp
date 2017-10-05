import {NovoError} from "../errors/novo-error";


export class ExpiredTemporalPasswordError extends NovoError{

    constructor(){
        super("Expired temporal password error",-194);
    }

}