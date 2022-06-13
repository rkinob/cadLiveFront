import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

import { LiveService } from "src/app/services/live.service";
import { Live } from "../models/live";


@Injectable()
export class LiveIniciarResolver implements Resolve<Live> {
  constructor(
    private liveService: LiveService,
    private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Live> {

      return this.liveService.ConsultarLive(route.params['id']).pipe(
        catchError(error => {
            this.router.navigate(['/home']);
            return of(new Live());
        })
      )  ;
    }

}
