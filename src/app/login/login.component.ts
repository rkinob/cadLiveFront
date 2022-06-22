import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/login-request';
import { UsuarioRequest } from '../models/usuario-request';
import { UsuarioService } from '../services/usuario.service';
import jwt_decode from 'jwt-decode';
import { BaseRequest } from '../models/base-request';
import { sessionStorageUtils } from '../utils/sessionStorage';
import { ToastrService } from 'ngx-toastr';
import { BaseResponse } from '../product/models/base-response';
import { Usuario } from '../models/usuario';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = this._fb.group({
    login: ['', [Validators.required]],
    senha: ['', [Validators.required]],
  });

  login = this.formLogin.controls.login;
  senha = this.formLogin.controls.senha;

  constructor(private _router: Router,
              private _fb: FormBuilder,
              private _usuarioService: UsuarioService,
              private _sessionStorageUtils: sessionStorageUtils,
              private toastr: ToastrService) { }

  ngOnInit(): void {


  }

  public getErrorMessageLogin() {
    let loginCtrl = this.login;

    if (loginCtrl.hasError('required')) {
      return 'Informe o Código de Acesso';
    }

    if (loginCtrl.hasError('minlength')) {
      return 'Informação inválida';
    }

    return '';
  }

  public getErrorMessageSenha() {
    if (this.senha.hasError('required')) {
      return 'Informe a senha!';
    }
    return '';
  }


  public entrar() {
    console.log(this.formLogin.valid);
    if (this.formLogin.valid) {
      this._usuarioService.verificarUsuario(this.login.value, this.senha.value).subscribe(
        next => {

          //if (!loginRequest.ValidationSummary) {
            const token = next.token;
            //const decoded = jwt_decode<Usuario>(token);
           // const data: UsuarioRequest = decoded.Data;   ;
            this._sessionStorageUtils.salvarTokenUsuario(token);

            // redirect to home
            this._router.navigate(['/products']);

        },
        error => {
          console.log(error);
          this.toastr.error(error);
        },
        () => {

        });

    }
  }

}
