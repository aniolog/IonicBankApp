import {NovoError} from "../errors/novo-error";


export class DataBaseError extends NovoError{

    constructor(){
        super("Database error",-911);
    }

}