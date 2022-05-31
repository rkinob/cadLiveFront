import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UsuarioService } from "../services/usuario.service";
import { sessionStorageUtils } from "../utils/sessionStorage";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  public sessionStorageUtils = new sessionStorageUtils();

  constructor(private router: Router,
              private _usuarioService: UsuarioService    ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const currentUser = this.sessionStorageUtils.obterUsuario();

      if (!currentUser) {

          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
      }

      if (!this.sessionStorageUtils.isTokenExpired()) {

          return true;

      }


      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
  }

}
