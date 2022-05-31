import { Component } from '@angular/core';
import { sessionStorageUtils } from './utils/sessionStorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Loja da Flor';
  constructor(private _sessionStorageUtils: sessionStorageUtils) { }

  public getUsuarioEstaLogado(): boolean
  {
    return this._sessionStorageUtils.usuarioEstaLogado();
  }

}
