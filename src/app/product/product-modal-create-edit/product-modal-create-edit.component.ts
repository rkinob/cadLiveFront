import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoService } from 'src/app/services/product.service';
import { Category } from '../models/categoria';
import { Produto } from '../models/produto';
import { ToastrService } from 'ngx-toastr';
import { FuncoesUtils } from 'src/app/utils/funcoes';
import { CurrencyPipe } from '@angular/common';
import {LOCALE_ID} from '@angular/core';

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
  constructor(public activeModal: NgbActiveModal,
              private _fb: FormBuilder,
              private productService: ProdutoService,
              private toastr: ToastrService,
              public _funcoesUtils: FuncoesUtils,
              public currencyPipe: CurrencyPipe) {}

  ngOnInit(): void {
    this.carregarCategories();
    this.carregarForm(this.product);
  }

  public carregarCategories() {
    this.productService.readAllCategories().subscribe(cat =>  { this.categories = cat.lists; });
  }



  formProduto = this._fb.group({
    id: [''],
    Nome: ['', [Validators.required]],
    Especificacao: ['', [Validators.required]],
    Active: [''],
    CategoriaId: ['',  [Validators.required]],
    PrecoCusto: ['', [Validators.required, Validators.pattern(/^[+-]?([0-9]+\,?[0-9]*|\,[0-9]+)$/)]],
    Preco: ['', [Validators.required, Validators.pattern(/^[+-]?([0-9]+\,?[0-9]*|\,[0-9]+)$/)]],

  });

  public IdProduto = this.formProduto.controls.id;
  public Nome = this.formProduto.controls.Nome;
  public Especificacao = this.formProduto.controls.Especificacao;
  public Active = this.formProduto.controls.Active;
  public CategoriaId = this.formProduto.controls.CategoriaId;
  public Preco = this.formProduto.controls.Preco;
  public PrecoCusto = this.formProduto.controls.PrecoCusto;

  public carregarForm(product: Produto) {

    if(this.product) {
      this.Nome.setValue(product.nome);
      this.Especificacao.setValue(product.especificacao);
      this.Active.setValue(product.active);
      this.CategoriaId.setValue(product.categoria.id);
      this.Preco.setValue(this.currencyPipe.transform(product.preco, 'BRL', '', '1.2-2'));
      this.PrecoCusto.setValue(this.currencyPipe.transform(product.precoCusto, 'BRL', '', '1.2-2'));

      this.titulo_modal = "Editar Produto";
    }
    else {
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
        this.IdProduto.setValue(this.product.id);

      let product = this.formProduto.value;
      product.Price = this._funcoesUtils.parsePotentiallyGroupedFloat(product.Price.toString());
      product.CostPrice = this._funcoesUtils.parsePotentiallyGroupedFloat(product.CostPrice.toString());

      console.log(product);
      if (this.product?.id) {

        this.updateProduto(product);
      }

      else
        this.addProduto(product);

    }

  }

  public addProduto(product: Produto) {
    console.log(product);
    this.productService.create(product)
      .subscribe(
        next => {
          console.log(next);
          this.toastr.success("Produto incluído com sucesso!");
          this.activeModal.close(true);

        }
      );
  }

  public updateProduto(product: Produto) {
    this.productService.update(product.id, product)
      .subscribe(
        next => {
          console.log(next);
          this.toastr.success("Produto alterado com sucesso!");
          this.activeModal.close(true);
        }
      );
  }


}
