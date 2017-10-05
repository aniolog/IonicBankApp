import {NovoError} from "../errors/novo-error";


export class SuspendedUserError extends NovoError{

    constructor(){
        super("Supended user error",-35);
    }

}