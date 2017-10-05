import {NovoError} from "../errors/novo-error";


export class InvalidParameterError extends NovoError{

    constructor(){
        super("Invalid parameter error",-241);
    }

}