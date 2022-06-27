import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { RankingClientesLive } from "../live/models/rankingClientesLive";
import { RelatorioPorCategoria } from "../live/models/relatorioPorCategoria";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})

export class ResumoLiveService extends BaseService  {
  private baseURL = this.urlServiceV1 + 'api/Relatorios';
  public carregarRelatorio: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private httpClient: HttpClient) {
    super();
  }

  RelatorioPorCategoria(idLive: string): Observable<RelatorioPorCategoria[]> {
    return this.httpClient.get<RelatorioPorCategoria[]>(this.baseURL + '/PorCategoria/' + idLive, this.ObterAuthHeaderJson()).pipe(
      catchError(this.errorHandler));
  }

  RankingClientesLive(idLive: string): Observable<RankingClientesLive[]> {
    return this.httpClient.get<RankingClientesLive[]>(this.baseURL + '/RankingCliente/' + idLive, this.ObterAuthHeaderJson()).pipe(
      catchError(this.errorHandler));
  }

}
