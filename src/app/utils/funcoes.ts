import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })

export class FuncoesUtils {

  constructor(private currencyPipe : CurrencyPipe){}

  public keyPressNumbers(event: any): boolean {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

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

  public paginate<Type> (array: Type[], pageSize: number, pageNumber: number): Type[] {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }


  errorHandler(error: HttpErrorResponse) {
    console.log(error)
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('Um erro ocorreu:', error.error.message);
    } else {
        if (error.status === 401) {
            location.href = '#/login';
            return throwError('Acesso não autorizado!')
        } else if (error.status === 403) {
            location.href = '#/';
            return throwError('Não tem acesso a funcionalidade!')
        } else if (error.status === 400) {
            if (error.error) {
                if (error.error[Object.keys(error.error)[0]].value)
                    return throwError(error.error[Object.keys(error.error)[0]].value);

                return throwError('Algo de errado aconcetou. Por favor tente novamente!');
            } else {
                return throwError(error);
            }
        }
    }
    // return an observable with a user-facing error message
    return throwError('Algo de errado aconcetou. Por favor tente novamente!');
}
}
