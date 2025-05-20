

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
  selector: 'app-produtos-vinculados',
  templateUrl: './produtos-vinculados.component.html',
  styleUrls: ['./produtos-vinculados.component.css']
})
export class ProdutosVinculadosComponent implements OnInit {

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

  ngAfterViewInit() {
  setTimeout(() => this.retrieveProdutos());
}


  ngOnInit(): void {
    this.carregou = false;

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


  retrieveProdutos(): void {

  // Redefine produtos e count antes de iniciar a requisição
  this.products = [];


  this.productService.searchByProdutoPai(this.idProdutoPai).subscribe({
    next: (response) => {
      // Atrasamos a atualização para depois da detecção de mudanças
      setTimeout(() => {
        this.products = response;
        this.carregou = this.products.length > 0;
      });
    },
    error: (err) => {
      console.error(err);
    }
  });
}



}
