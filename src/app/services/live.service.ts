import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Live } from "../live/models/live";
import { LiveCliente } from "../live/models/liveCliente";
import { LiveItem } from "../live/models/liveItem";
import { LiveItemNovoCliente } from "../live/models/liveNovoCliente";
import { LiveNovoProduto } from "../live/models/liveNovoProduto";
import { LiveStatus } from "../live/models/liveStatus";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})

export class LiveService extends BaseService  {
  private baseURL = this.urlServiceV1 + 'api/Live';
  private baseURLCliente = this.urlServiceV1 + 'api/Cliente';


  constructor(private httpClient: HttpClient) {
    super();
  }

  BuscarTodosClientes(): Observable<LiveCliente[]> {
    return this.httpClient.get<LiveCliente[]>(this.baseURLCliente + '/BuscarTodos', this.ObterAuthHeaderJson()).pipe(
      catchError(this.errorHandler)
  );;
  }

  BuscarTodosStatus(): Observable<LiveStatus[]> {
    return this.httpClient.get<LiveStatus[]>(this.baseURL + '/ListarStatus', this.ObterAuthHeaderJson());
  }
  BuscarTodas(): Observable<Live[]> {
    return this.httpClient.get<Live[]>(this.baseURL + '/BuscarTodas', this.ObterAuthHeaderJson());
  }
  ConsultarLive(idLive: string): Observable<Live> {
    return this.httpClient.get<Live>(this.baseURL + '/BuscarPorId/' + idLive, this.ObterAuthHeaderJson());
  }

  create(live: Live): Observable<Live> {
    return this.httpClient.post<Live>(this.baseURL + '/incluir', JSON.stringify(live), this.ObterAuthHeaderJson())
    .pipe(catchError(this.errorHandler));
  }

  update(live: Live): Observable<Live> {
    return this.httpClient.put<Live>(this.baseURL + '/alterar', JSON.stringify(live), this.ObterAuthHeaderJson()).pipe(
            catchError(this.errorHandler)
        );
  }

  atualizarCliente(liveItem: LiveItem): Observable<LiveItem> {
    return this.httpClient.put<LiveItem>(this.baseURL + '/atualizarcliente', JSON.stringify(liveItem), this.ObterAuthHeaderJson()).pipe(
      catchError(this.errorHandler));
  }

  inativarItem(liveItem: LiveItem): Observable<LiveItem> {
    return this.httpClient.put<LiveItem>(this.baseURL + '/inativaritem', JSON.stringify(liveItem), this.ObterAuthHeaderJson()).pipe(
      catchError(this.errorHandler));
  }

  atualizarProduto(liveItem: LiveItem): Observable<LiveItem> {
    return this.httpClient.put<LiveItem>(this.baseURL + '/atualizarpreco', JSON.stringify(liveItem), this.ObterAuthHeaderJson()).pipe(
      catchError(this.errorHandler));
  }

  incluirClienteLive(liveItem: LiveItemNovoCliente): Observable<LiveItemNovoCliente> {
    return this.httpClient.put<LiveItemNovoCliente>(this.baseURL + '/incluirClienteLiveItem', JSON.stringify(liveItem), this.ObterAuthHeaderJson()).pipe(
      catchError(this.errorHandler));
  }

  incluirProdutoLive(liveItem: LiveNovoProduto): Observable<LiveNovoProduto> {
    console.log(liveItem);
    return this.httpClient.post<LiveNovoProduto>(this.baseURL + '/incluirProduto', JSON.stringify(liveItem), this.ObterAuthHeaderJson()).pipe(
      catchError(this.errorHandler)
  );;
  }


}
