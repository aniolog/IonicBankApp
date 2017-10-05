import {NovoError} from "../errors/novo-error";


export class NoUpdatedPassword extends NovoError{

    constructor(){
        super("No updated password error",-199);
    }

}