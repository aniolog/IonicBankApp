import {NovoError} from "../errors/novo-error";


export class BlockedCardError extends NovoError{

    constructor(){
        super("Blocked card error",-267);
    }

}