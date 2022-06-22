import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { LoginRequest } from "../models/login-request";
import { LoginResponse } from "../models/login-response";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root"
})

// usuarioService Class
export class UsuarioService extends BaseService {
  private uri = this.urlServiceV1+`Api/Usuario/`;
  constructor(private http: HttpClient) {
    super()
  }

  public verificarUsuario(login: string, senha: string): Observable<LoginResponse> {

    var body = {

         CdLogin: login,
         Senha: senha

        }

   let url = this.uri + "logar";

    return this.http.post<LoginResponse>(url , body, this.ObterHeaderJson())
        .pipe(
            catchError(this.errorHandler)
        );
  }

}
