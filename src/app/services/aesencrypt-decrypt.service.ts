import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class AESEncryptDecryptService {

  // Declare this key and iv values in declaration
private key = CryptoJS.enc.Utf8.parse('73799c50-9d2a-49');
private iv = CryptoJS.enc.Utf8.parse('9a-8f9d-6414d959');

// Methods for the encrypt and decrypt Using AES
public encrypt(value : string) {

  //CryptoJS.enc.Utf8.parse(JSON.stringify(value))
    var encrypted = CryptoJS.AES.encrypt(value, this.key, {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    //this.decrypt(encrypted);
    return encrypted;
}

public decrypt(textToDecrypt : string) {
    var decrypted = CryptoJS.AES.decrypt(textToDecrypt, this.key, {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}

  /*
  --FORMA ANTIGA DE CRYPTOJS
  secretKey = "73799c50-9d2a-499a-8f9d-6414d9592c3c";

  constructor() { }

  public encrypt(value : string) : string{
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  public decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
*/

}
