import {NovoError} from "../errors/novo-error";


export class DecryptError extends NovoError{

    constructor(){
        super("Decrypting error",-134);
    }

}