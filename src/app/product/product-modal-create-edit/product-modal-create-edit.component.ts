import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoService } from 'src/app/services/product.service';
import { Category } from '../models/categoria';
import { Produto } from '../models/produto';
import { ToastrService } from 'ngx-toastr';
import { FuncoesUtils } from 'src/app/utils/funcoes';
import { CurrencyPipe } from '@angular/common';
import {LOCALE_ID} from '@angular/core';
import { ReajustarPrecoComponent } from '../reajustar-preco/reajustar-preco.component';

@Component({
  selector: 'app-product-modal-create-edit',
  templateUrl: './product-modal-create-edit.component.html',
  styleUrls: ['./product-modal-create-edit.component.css']
 ,
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
    }
]

})
export class ProdutoModalCreateEditComponent implements OnInit {
  @Input() product: Produto;
  titulo_modal: string = 'Editar Produto';
  categories: Category[] = [];
  @Input() idProdutoPai: string;
  constructor(public activeModal: NgbActiveModal,
              private _fb: FormBuilder,
              private productService: ProdutoService,
              private toastr: ToastrService,
              public _funcoesUtils: FuncoesUtils,
              private modalService: NgbModal,
              public currencyPipe: CurrencyPipe,
            private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregarCategories();
    this.carregarForm(this.product);
    this.productService.precoProduto.subscribe(novoPreco => {this.product.preco = novoPreco; this.preco.setValue(this.currencyPipe.transform(novoPreco, 'BRL', '', '1.2-2')); } );
    this.productService.obterValorCustoProduto(this.product.codigo).subscribe (preco => {  this.precoCusto.setValue(this.currencyPipe.transform(preco, 'BRL', '', '1.2-2')); });

  }

  public carregarCategories() {
    this.productService.readAllCategories().subscribe(cat =>  { this.categories = cat; });
  }



  formProduto = this._fb.group({
    id: [''],
    codigo: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    especificacao: ['', [Validators.required]],
    ativo: [''],
    categoriaId: ['',  [Validators.required]],
    precoCusto: ['', [Validators.required, Validators.pattern(/^[+-]?([0-9]+\,?[0-9]*|\,[0-9]+)$/)]],
    preco: ['', [Validators.required, Validators.pattern(/^[+-]?([0-9]+\,?[0-9]*|\,[0-9]+)$/)]],
    produtoPaiId: [''],
    percentualGanho: ['', [Validators.required, Validators.pattern(/^[+-]?([0-9]+\,?[0-9]*|\,[0-9]+)$/)]]

  });

  public idProduto = this.formProduto.controls.id;
  public codigo = this.formProduto.controls.codigo;
  public descricao = this.formProduto.controls.descricao;
  public especificacao = this.formProduto.controls.especificacao;
  public ativo = this.formProduto.controls.ativo;
  public categoriaId = this.formProduto.controls.categoriaId;
  public preco = this.formProduto.controls.preco;
  public precoCusto = this.formProduto.controls.precoCusto;
  public produtoPaiId = this.formProduto.controls.produtoPaiId;
  public percentualGanho = this.formProduto.controls.percentualGanho;
  public carregarForm(product: Produto) {

    if(this.product) {
      this.idProduto.setValue(this.product.id);
      this.codigo.setValue(this.product.codigo);
      this.descricao.setValue(product.descricao);
      this.especificacao.setValue(product.especificacao);
      this.ativo.setValue(product.ativo);
      this.categoriaId.setValue(product.categoria.id);
      this.preco.setValue(this.currencyPipe.transform(product.preco, 'BRL', '', '1.2-2'));
      this.precoCusto.setValue(this.currencyPipe.transform(product.precoCusto, 'BRL', '', '1.2-2'));
      this.produtoPaiId.setValue(product.produtoPaiId);
      this.percentualGanho.setValue(product.prcGanho);

      this.titulo_modal = "Editar Produto";
    }
    else {
      this.idProduto.setValue(null);
      this.titulo_modal = "Incluir Produto";
    }

  }

  private formValido() {

    if (!this.formProduto.valid)
      return false;

    return true
  }
  showProductList = false;

  calcularPreco() {
    const modalRef = this.modalService.open(ReajustarPrecoComponent, {size: 'lg' });
    modalRef.componentInstance.product = this.product;

    modalRef.result.then((data) => {
      // on close


    }, (reason) => {
      // on dismiss
    });
  }
ngAfterViewInit() {
  setTimeout(() => {
    this.showProductList = true;
    this.cd.detectChanges();
  });
}

  incluirProdutoVinculado(): void {
    this.activeModal.close(true);
    const modalRef = this.modalService.open(ProdutoModalCreateEditComponent, {size: 'lg' });
    modalRef.componentInstance.idProdutoPai = this.product.id ;

    modalRef.result.then((data) => {
      // on close


    }, (reason) => {
      // on dismiss
    });
  }

  public salvar(): void {

    if (this.formValido()) {
      if (this.product?.id)
        this.idProduto.setValue(this.product.id);

      let product = this.formProduto.value;
      product.preco = this._funcoesUtils.parsePotentiallyGroupedFloat(product.preco.toString());
      product.precoCusto = this._funcoesUtils.parsePotentiallyGroupedFloat(product.precoCusto.toString());
      product.prcGanho = this._funcoesUtils.parsePotentiallyGroupedFloat(product.percentualGanho.toString());
      if (this.product?.id) {
        this.updateProduto(product);
      }

      else {
        product.ativo = 1;
        product.produtoPaiId = this.idProdutoPai;
        this.addProduto(product);
      }



    }

  }

  public addProduto(product: Produto) {

    this.productService.create(product)
      .subscribe(
        next => {
          console.log(next);
          this.toastr.success("Produto incluído com sucesso!");
          this.activeModal.close(true);

        },
        error => {
         // console.log(error);
          this.toastr.error(error);
          this.activeModal.close(false);
        }

      );
  }

  public updateProduto(product: Produto) {
    this.productService.update( product)
      .subscribe(
        next => {
          console.log(next);
          this.toastr.success("Produto alterado com sucesso!");
          this.activeModal.close(true);
        }
      );
  }


}
