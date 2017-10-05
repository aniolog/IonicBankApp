import {NovoError} from "../errors/novo-error";


export class UnblockedCardError extends NovoError{

    constructor(){
        super("Unblocked card error",-267);
    }

}