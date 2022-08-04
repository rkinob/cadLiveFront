import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/product/models/categoria';
import { LiveService } from 'src/app/services/live.service';
import { ProdutoService } from 'src/app/services/product.service';
import { FuncoesUtils } from 'src/app/utils/funcoes';
import { Live } from '../models/live';
import { LiveNovoProduto } from '../models/liveNovoProduto';

@Component({
  selector: 'app-live-incluir-produto',
  templateUrl: './live-incluir-produto.component.html',
  styleUrls: ['./live-incluir-produto.component.css']
})
export class LiveIncluirProdutoComponent implements OnInit {
  @Input() product: LiveNovoProduto;
  @Input() idLive: Live;
  titulo_modal: string = 'Editar Produto';
  categories: Category[] = [];
  constructor(public activeModal: NgbActiveModal,
              private _fb: FormBuilder,
              private productService: ProdutoService,
              private liveService: LiveService,
              private toastr: ToastrService,
              public _funcoesUtils: FuncoesUtils,
              public currencyPipe: CurrencyPipe,
              private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.carregarCategories();
    this.carregarForm(this.product);
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
    preco: ['', [Validators.required, Validators.pattern(/^[+-]?([0-9]+\,?[0-9]*|\,[0-9]+)$/)]],

  });

  public idProduto = this.formProduto.controls.id;
  public codigo = this.formProduto.controls.codigo;
  public descricao = this.formProduto.controls.descricao;
  public especificacao = this.formProduto.controls.especificacao;
  public ativo = this.formProduto.controls.ativo;
  public categoriaId = this.formProduto.controls.categoriaId;
  public preco = this.formProduto.controls.preco;

  public carregarForm(product: LiveNovoProduto) {

    if(this.product) {
      this.idProduto.setValue(this.product.id);
      this.codigo.setValue(this.product.codigo);
      this.descricao.setValue(product.descricao);
      this.especificacao.setValue(product.especificacao);
      this.ativo.setValue(product.ativo);
      this.categoriaId.setValue(product.categoria.id);
      this.preco.setValue(this.currencyPipe.transform(product.preco, 'BRL', '', '1.2-2'));
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

  public salvar(): void {

    if (this.formValido()) {
      if (this.product?.id)
        this.idProduto.setValue(this.product.id);

      let product = this.formProduto.value;
      product.preco = this._funcoesUtils.parsePotentiallyGroupedFloat(product.preco.toString());
      product.precoCusto = 0;///this._funcoesUtils.parsePotentiallyGroupedFloat(product.precoCusto.toString());
      product.idLive = this.idLive;

      product.ativo = 1;
      this.addProduto(product);

    }

  }

  public addProduto(product: LiveNovoProduto) {
    this.spinner.show();
    this.liveService.incluirProdutoLive(product)
      .subscribe(
        next => {
          this.toastr.success("Produto incluído na live com sucesso!");
          this.activeModal.close(true);
        },
        error => {
          this.toastr.error(error);
          this.activeModal.close(false);
        },
        () => {
          this.spinner.hide();
        }

      );
  }

 /* public updateProduto(product: LiveNovoProduto) {
    this.productService.update( product)
      .subscribe(
        next => {
          console.log(next);
          this.toastr.success("Produto alterado com sucesso!");
          this.activeModal.close(true);
        }
      );
  }*/


}
