import {NovoError} from "../errors/novo-error";


export class NonExistingTokenError extends NovoError{

    constructor(){
        super("Non existing token error",-133);
    }

}