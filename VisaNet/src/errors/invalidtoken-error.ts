import {NovoError} from "../errors/novo-error";


export class InvalidTokenError extends NovoError{

    constructor(){
        super("Invalid token error",-61);
    }

}