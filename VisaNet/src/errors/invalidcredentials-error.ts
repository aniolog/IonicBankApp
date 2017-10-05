import {NovoError} from "../errors/novo-error";


export class InvalidCredentialError extends NovoError{

    constructor(){
        super("Invalid credential error",-1);
    }

}