import { HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { sessionStorageUtils } from "src/app/utils/sessionStorage";
import { environment } from "../../environments/environment";
import { throwError } from "rxjs";

@Injectable({
    providedIn: "root"
})

export abstract class BaseService {
    protected urlServiceV1: string = environment.apiUrlv1;
    protected sessionStorageUtils = new sessionStorageUtils();

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=utf-8',
                'access-control-allow-origin': 'http://localhost:5000/',
                'Accept':'application/json;charset=utf-8',
            })
        };
    }

    protected ObterAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'bearer ' + this.sessionStorageUtils.obterTokenUsuario(),
                'access-control-allow-origin': 'http://localhost:5000/',
                'Accept':'application/json;charset=utf-8',
                'TKP': '0'
                //'Authorization': `Bearer ${this._sessionStorageUtils.obterTokenUsuario()}`
            })
        };
    }



    protected errorHandler(error: HttpErrorResponse) {
        console.log(error)
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('Um erro ocorreu:', error.error.message);
        } else {
            if (error.status === 401) {
                location.href = '/login';
                return throwError('Acesso não autorizado ou sessão expirou. Por favor faça o login novamente!')
            } else if (error.status === 403) {
                location.href = '/';
                return throwError('Não tem acesso a funcionalidade!')
            } else if (error.status === 400) {
                if (error.error) {
                    if (error.error[Object.keys(error.error)[0]].value)
                        return throwError(error.error[Object.keys(error.error)[0]].value);

                    return throwError('Algo de errado aconteceu. Por favor tente novamente!');
                } else {
                    return throwError(error);
                }
            }
        }
        // return an observable with a user-facing error message
        return throwError('Algo de errado aconteceu. Por favor tente novamente!');
    }
}
