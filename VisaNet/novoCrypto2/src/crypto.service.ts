import {Injectable} from '@angular/core';
import * as CryptoJS from '../node_modules/crypto-js';


@Injectable()
export class CryptoService {

  private Key: string;


  constructor(Key: string) {
    this.Key=CryptoJS.enc.Base64.parse(Key).toString(CryptoJS.enc.Utf8);
  }

  setKey(Key: string){
    this.Key=CryptoJS.enc.Base64.parse(Key).toString(CryptoJS.enc.Utf8);
  }

  encrypt (message:string):string{
    
    
      var keyHex = CryptoJS.enc.Utf8.parse(this.Key);
      var iv = new Uint16Array(0);
      var ivHex = CryptoJS.enc.Hex.parse(CryptoJS.enc.Utf8.parse(iv).toString(CryptoJS.enc.Hex));
      var encrypted = CryptoJS.AES.encrypt(message, keyHex, { iv: ivHex, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
      return encrypted.toString();
 
  }


  decrypt (message:string):string{
    
      var keyHex = CryptoJS.enc.Utf8.parse(this.Key);
      var iv = new Uint16Array(0);
      var ivHex = CryptoJS.enc.Hex.parse(CryptoJS.enc.Utf8.parse(iv).toString(CryptoJS.enc.Hex));
      var options = {
        mode: CryptoJS.mode.CBC, 
        padding: CryptoJS.pad.Pkcs7,
        iv: ivHex
      };
      var decrypted = CryptoJS.AES.decrypt( {
        ciphertext: CryptoJS.enc.Base64.parse(message)
      }, keyHex, options);	  
      return decrypted.toString(CryptoJS.enc.Utf8);

  }

}
