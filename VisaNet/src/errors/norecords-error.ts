import {NovoError} from "../errors/novo-error";


export class NoRecordsError extends NovoError{

    constructor(){
        super("No records error",-15);
    }

}