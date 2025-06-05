import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from 'src/app/services/product.service';
import { ConfirmationDialogContent } from 'src/app/shared/confirmation-dialog-content';
import { Produto } from '../models/produto';
import { ProdutoModalCreateEditComponent } from '../product-modal-create-edit/product-modal-create-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

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
  @Input() idProdutoPai: string;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
sub: Subscription;
carregou = false;


  constructor(private productService: ProdutoService,
              private modalService: NgbModal,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef
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

  ngAfterViewInit() {
  setTimeout(() => this.retrieveProdutos());
}


  ngOnInit(): void {
    this.carregou = false;
  // console.log(this.carregou);
   //his.retrieveProdutos();

/*
    this.sub = this.route
      .data
      .subscribe(v => { this.idProdutoPai = "";}

    );*/


  }

  public excluirProduto(product: Produto): void {

    const modalRef = this.modalService.open(ConfirmationDialogContent);
    modalRef.componentInstance.confirmationBoxTitle = 'Exclusão de produto';
    modalRef.componentInstance.confirmationMessage = 'Deseja realmente excluir o produto?';

    modalRef.result.then((confirmaExclusao) => {
      if(confirmaExclusao) {
        this.productService.delete(product.id).subscribe(confirmacao => {
            this.toastr.success("Produto excluído com sucesso");
            this.retrieveProdutos();
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
  let obsService;


  obsService = this.productService.searchByName(params, this.productName);


  // Redefine produtos e count antes de iniciar a requisição
  this.products = [];
  this.count = 0;
  this.carregou = false;

  obsService.subscribe({
    next: (response) => {
      // Atrasamos a atualização para depois da detecção de mudanças
      setTimeout(() => {
        this.count = response.length;

        this.products = this.paginate(response, this.pageSize, this.page);
        this.carregou = true;
      });
    },
    error: (err) => {
      console.error(err);
    }
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
