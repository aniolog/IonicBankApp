import {NovoError} from "../errors/novo-error";


export class UnactiveUserError extends NovoError{

    constructor(){
        super("Unactive user error",-8);
    }

}