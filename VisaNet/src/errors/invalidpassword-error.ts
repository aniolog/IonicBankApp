import {NovoError} from "../errors/novo-error";


export class InvalidPasswordError extends NovoError{
   
    constructor(message:string,private translateKey:string){
        super(message,-999);
    }

    getTranslateKey():string{
        return this.translateKey;
    }
}