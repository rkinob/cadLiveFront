import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/product/models/categoria';
import { ProdutoService } from 'src/app/services/product.service';
import { FuncoesUtils } from 'src/app/utils/funcoes';
import { CategoriaModalCreateEditComponent } from '../categoria-modal-create-edit/categoria-modal-create-edit.component';

@Component({
  selector: 'app-categoria-lista',
  templateUrl: './categoria-lista.component.html',
  styleUrls: ['./categoria-lista.component.css']
})
export class CategoriaListaComponent implements OnInit {
  currentCategory: Category | null = null;
  categorias: Category[] ;

  currentIndex = -1;
  productName = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private produtoService: ProdutoService,
              private funcoesUtils: FuncoesUtils,
              private modalService: NgbModal) { }

  novaCategory():void {
    const modalRef = this.modalService.open(CategoriaModalCreateEditComponent, {size: 'lg' });

    modalRef.result.then((data) => {
      // on close
      if(data) {
        this.retrieveCategory();
      }
    }, (reason) => {
      // on dismiss
    });
  }

  ngOnInit(): void {
    this.retrieveCategory();

  }
  private paginate (array: Category[], pageSize: number, pageNumber: number) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveCategory();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveCategory();
  }

  retrieveCategory(): void {
   // const params = this.getRequestParams(this.productName, this.page, this.pageSize);

    this.produtoService.readAllCategories()
    .subscribe(
      response => {
        // = response;
        this.categorias = this.funcoesUtils.paginate(response, this.pageSize,  this.page) ;
        this.count = response.length;

      },
      error => {

      });
  }
  excluirCategory(categoria: Category): void {
  }

  editarCategory(categoria: Category): void {
    const modalRef = this.modalService.open(CategoriaModalCreateEditComponent,  { size: 'lg'  });
    modalRef.componentInstance.categoria = categoria;

    modalRef.result.then((data) => {
      // on close
      if(data) {
        this.retrieveCategory();
      }
    }, (reason) => {
      // on dismiss
    });

  }

  incluirCategory(): void {
    const modalRef = this.modalService.open(CategoriaModalCreateEditComponent, {size: 'lg' });

    modalRef.result.then((data) => {
      // on close
      if(data) {
        this.retrieveCategory();
      }
    }, (reason) => {
      // on dismiss
    });
  }
}