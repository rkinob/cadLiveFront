import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
              private _fb: FormBuilder) { }

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

  // entrar function
  public entrar() {
    if (this.formLogin.valid) {
      this._router.navigate(['/home']);
    }
  }

}
