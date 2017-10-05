import {NovoError} from "../errors/novo-error";


export class EmptyListError extends NovoError{

    constructor(){
        super("Empty list error",-150);
    }

}