import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioRequest } from 'src/app/models/usuario-request';
import jwt_decode from 'jwt-decode';


import { AESEncryptDecryptService } from 'src/app/services/aesencrypt-decrypt.service';
import { BaseRequest } from '../models/base-request';
@Injectable({
    providedIn: 'root'
  })

export class sessionStorageUtils {

    private _AESEncryptDecryptService = new AESEncryptDecryptService();

    public obterUsuario(): Usuario {
        let usuario = new Usuario;
        let token = this.obterTokenUsuario();

        if (token) {
            let decoded = jwt_decode<BaseRequest>(token);
            usuario = decoded.Data.Usuario;
        }

        return usuario;
    }


    public obterUsuarioRequest(): UsuarioRequest {
        let usuarioRequest = new UsuarioRequest;
        const token = this.obterTokenUsuario();

        if (token) {
            const decoded = jwt_decode<BaseRequest>(token);
            usuarioRequest = decoded.Data;
            //usuarioRequest.VacinacaoExterior = true;
        }


        return usuarioRequest;
    }



    public obterTokenUsuario(): string {
        return sessionStorage.getItem('usuario-token')??'';
    }

    public salvarTokenUsuario(token: string) {
        sessionStorage.setItem('usuario-token', token);
    }
    public obterUsuariosPerfis() {
        let dadosString: string = sessionStorage.getItem('todos-usuarios-perfis')??'';
        let decryptDados: string = '';

        if (dadosString)
            decryptDados = this._AESEncryptDecryptService.decrypt(dadosString);

        let dadosCache: any = JSON.parse(decryptDados);
        return dadosCache;
        //return sessionStorage.getItem('todos-usuarios-perfis');

    }

    public salvarUsuario(user: string) {
        sessionStorage.setItem('usuario-autenticado', JSON.stringify(user));
    }

    public getTokenExpirationDate(token: string): Date|null {
        const decoded = jwt_decode<any>(token);

        if (decoded.exp === undefined) return null;

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    public isTokenExpired(token?: string): boolean {
        if (!token) token = this.obterTokenUsuario();
        if (!token) return true;

        const date = this.getTokenExpirationDate(token);
        if (date === undefined || date === null) return false;
        return !(date.valueOf() > new Date().valueOf());
    }

    public limpar_sessao() {
        sessionStorage.clear();
        sessionStorage.clear();
    }
}
