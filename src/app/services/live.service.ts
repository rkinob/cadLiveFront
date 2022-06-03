import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Live } from "../live/models/live";
import { LiveStatus } from "../live/models/liveStatus";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})

export class LiveService extends BaseService  {
  private baseURL = this.urlServiceV1 + 'api/Live';


  constructor(private httpClient: HttpClient) {
    super();
  }


  BuscarTodosStatus(): Observable<LiveStatus[]> {
    return this.httpClient.get<LiveStatus[]>(this.baseURL + '/ListarStatus', this.ObterAuthHeaderJson());
  }
  BuscarTodas(): Observable<Live[]> {
    return this.httpClient.get<Live[]>(this.baseURL + '/BuscarTodas', this.ObterAuthHeaderJson());
  }

  create(live: Live): Observable<any> {
    return this.httpClient.post<Live>(this.baseURL + '/incluir', JSON.stringify(live), this.ObterAuthHeaderJson())
    .pipe(catchError(this.errorHandler));
  }

  update(live: Live): Observable<Live> {
    return this.httpClient.put<Live>(this.baseURL + '/alterar', JSON.stringify(live), this.ObterAuthHeaderJson());
  }


}
