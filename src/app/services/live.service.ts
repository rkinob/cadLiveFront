import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Live } from "../live/models/live";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})

export class LiveService extends BaseService  {
  private baseURL = this.urlServiceV1 + 'api/Live';


  constructor(private httpClient: HttpClient) {
    super();
  }


  BuscarTodas(): Observable<Live[]> {
    return this.httpClient.get<Live[]>(this.baseURL + '/BuscarTodas', this.ObterAuthHeaderJson());
  }

}
