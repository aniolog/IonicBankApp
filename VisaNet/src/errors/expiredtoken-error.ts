import {NovoError} from "../errors/novo-error";


export class ExpiredTokenError extends NovoError{

    constructor(){
        super("Expired token error",-130);
    }

}