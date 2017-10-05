import {NovoError} from "../errors/novo-error";


export class UnrecoveredPasswordError extends NovoError{

    constructor(){
        super("Unrecovered password error",-186);
    }

}