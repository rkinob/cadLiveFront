import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../product/models/produto';
import { PaginatedList } from '../models/paginated-list';
import { BaseService } from './base.service';
import { BaseResponse } from '../product/models/base-response';

const baseURL = 'http://localhost:5000/api/Produtos';
const baseURLCat = 'http://localhost:5000/api/Categorias';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService  {

  constructor(private httpClient: HttpClient) {
    super();
  }

  readAllCategories(): Observable<any> {
    return this.httpClient.get<BaseResponse>(baseURLCat, this.ObterAuthHeaderJson());
  }


  readAll(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(baseURL, this.ObterAuthHeaderJson());
  }

  read(id: number): Observable<any> {
    return this.httpClient.get(`${baseURL}/${id}`, this.ObterAuthHeaderJson());
  }

  create(product: Produto): Observable<Produto> {
    return this.httpClient.post<Produto>(baseURL + '/incluir', product, this.ObterAuthHeaderJson());
  }

  update(id: number, product: Produto): Observable<Produto> {
    return this.httpClient.put<Produto>(baseURL + '/alterar', product, this.ObterAuthHeaderJson());
  }

  delete(id: number): Observable<Produto> {
    return this.httpClient.delete<Produto>(`${baseURL}/${id}`, this.ObterAuthHeaderJson());
  }

  searchByName(params: any, name: string): Observable<PaginatedList<Produto[]>> {
    return this.httpClient.get<PaginatedList<Produto[]>>(baseURL + '/' + name, this.ObterAuthHeaderJson());
  }
}

