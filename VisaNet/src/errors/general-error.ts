import {NovoError} from "../errors/novo-error";


export class GeneralError extends NovoError{

    constructor(){
        super("General error",-33);
    }

}