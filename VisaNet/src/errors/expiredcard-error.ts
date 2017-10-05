import {NovoError} from "../errors/novo-error";


export class ExpiredCardError extends NovoError{

    constructor(){
        super("Expired card error",-125);
    }

}