import {BaseError} from "../errors/base-error";

 export class NovoError extends BaseError {
   
    constructor (public message: string,public code:number) {
        super(message);
    }
}
