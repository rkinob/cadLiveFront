import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Injectable({
    providedIn: 'root'
  })

export class FuncoesUtils {

  constructor(private currencyPipe : CurrencyPipe){}



  public numberCheck (args: any): boolean {
   if (args.key === 'e' || args.key === '+' || args.key === '-' ) {
     return false;
   } else {
     return true;
   }}

   public parsePotentiallyGroupedFloat(stringValue: string): number {
    stringValue = stringValue.trim();
    var result = stringValue.replace(/[^0-9]/g, '');
    if (/[,\.]\d{2}$/.test(stringValue)) {
        result = result.replace(/(\d{2})$/, '.$1');
    }
    return parseFloat(result);
}

  public  unformatValue(valor: string): string {
    console.log(valor);
    valor = valor.replace(/./g, '');
    console.log(valor);
    valor = valor.replace(/,/g, '.');
    console.log(valor);
    return valor;
  }

}
