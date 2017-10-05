import {NovoError} from "../errors/novo-error";


export class ExpiredPasswordError extends NovoError{

    constructor(){
        super("Expired password error",-185);
    }

}