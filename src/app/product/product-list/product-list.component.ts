import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from 'src/app/services/product.service';
import { ConfirmationDialogContent } from 'src/app/shared/confirmation-dialog-content';
import { Produto } from '../models/produto';
import { ProdutoModalCreateEditComponent } from '../product-modal-create-edit/product-modal-create-edit.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  currentProduto: Produto | null = null;
  products: Produto[] ;
  currentIndex = -1;
  productName = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];



  constructor(private productService: ProdutoService,
              private modalService: NgbModal,
              private toastr: ToastrService
           ) { }
  editarProduto(product: Produto): void {
    const modalRef = this.modalService.open(ProdutoModalCreateEditComponent,  { size: 'lg'  });
    modalRef.componentInstance.product = product;

    modalRef.result.then((data) => {
      // on close
      if(data) {
        this.retrieveProdutos();
      }
    }, (reason) => {
      // on dismiss
    });

  }

  incluirProduto(): void {
    const modalRef = this.modalService.open(ProdutoModalCreateEditComponent, {size: 'lg' });

    modalRef.result.then((data) => {
      // on close
      if(data) {
        this.retrieveProdutos();
      }
    }, (reason) => {
      // on dismiss
    });
  }

  ngOnInit(): void {
    this.retrieveProdutos();
  }

  public excluirProduto(product: Produto): void {

    const modalRef = this.modalService.open(ConfirmationDialogContent);
    modalRef.componentInstance.confirmationBoxTitle = 'Exclusão de produto';
    modalRef.componentInstance.confirmationMessage = 'Deseja realmente excluir o produto?';

    modalRef.result.then((confirmaExclusao) => {
      if(confirmaExclusao) {
        this.productService.delete(product.id).subscribe(confirmacao => {
            this.toastr.success("Produto excluído com sucesso");
        });
      }
    });

  }
  getRequestParams(searchName: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchName) {
      params[`Name`] = searchName;
    }

    if (page) {
      params[`PageNumber`] = page ;
    }

    if (pageSize) {
      params[`PageSize`] = pageSize;
    }

    return params;
  }

  private paginate (array: Produto[], pageSize: number, pageNumber: number) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }


  retrieveProdutos(): void {
    const params = this.getRequestParams(this.productName, this.page, this.pageSize);

    this.productService.searchByName(params, this.productName)
    .subscribe(
      response => {
        // = response;
        console.log(response);
        this.products = this.paginate(response, this.pageSize,  this.page) ;
        this.count = response.length;

      },
      error => {

      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveProdutos();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveProdutos();
  }



  searchProduto(): void {
    this.page = 1;
    this.retrieveProdutos();
  }


}
