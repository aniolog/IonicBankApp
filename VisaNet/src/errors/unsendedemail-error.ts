import {NovoError} from "../errors/novo-error";


export class UnsendedEmailError extends NovoError{

    constructor(){
        super("Unsended email error",-173);
    }

}