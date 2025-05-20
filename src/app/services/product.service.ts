import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from '../product/models/produto';
import { PaginatedList } from '../models/paginated-list';
import { BaseService } from './base.service';
import { BaseResponse } from '../product/models/base-response';
import { catchError } from 'rxjs/operators';
import { Category } from '../product/models/categoria';



@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService  {
  private baseURL = this.urlServiceV1 + 'api/Produto';
  private baseURLCat = this.urlServiceV1 + 'api/Categoria';
public idProdutoPai: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private httpClient: HttpClient) {
    super();
  }

  readAllCategories(): Observable<any> {
    return this.httpClient.get<BaseResponse>(this.baseURLCat + '/ListarCategorias', this.ObterAuthHeaderJson());
  }


  readAll(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(this.baseURL + '/ListarProdutos', this.ObterAuthHeaderJson());
  }

  read(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${id}`, this.ObterAuthHeaderJson());
  }

  create(product: Produto): Observable<Produto> {
    return this.httpClient.post<Produto>(this.baseURL + '/incluir', JSON.stringify(product), this.ObterAuthHeaderJson())
    .pipe(catchError(this.errorHandler));
  }

  update(product: Produto): Observable<Produto> {
    return this.httpClient.put<Produto>(this.baseURL + '/alterar', JSON.stringify(product), this.ObterAuthHeaderJson());
  }

  delete(id: string): Observable<Produto> {
    return this.httpClient.delete<Produto>(`${this.baseURL}/${id}`, this.ObterAuthHeaderJson());
  }

  searchByName(params: any, name: string): Observable<any> {
    return this.httpClient.get<any>(this.baseURL + '/ListarProdutosPorDescricao/' + name, this.ObterAuthHeaderJson());
  }
 searchByProdutoPai(produtoPaiId: string): Observable<any> {
    return this.httpClient.get<any>(this.baseURL + '/ListarProdutosVinculados/' + produtoPaiId, this.ObterAuthHeaderJson());
  }
  createCategoria(categoria: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.baseURLCat + '/incluir', JSON.stringify(categoria), this.ObterAuthHeaderJson())
    .pipe(catchError(this.errorHandler));
  }

  updateCategoria(categoria: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.baseURLCat + '/alterar', JSON.stringify(categoria), this.ObterAuthHeaderJson());
  }

  inativarCategoria(categoria: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.baseURLCat + '/inativar', JSON.stringify(categoria), this.ObterAuthHeaderJson());
  }

}

