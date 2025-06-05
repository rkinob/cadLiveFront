import { CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from 'src/app/services/product.service';
import { FuncoesUtils } from 'src/app/utils/funcoes';
import { Produto } from '../models/produto';
import { ReajustePreco } from '../models/reajustePreco';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reajustar-preco',
  templateUrl: './reajustar-preco.component.html',
  styleUrls: ['./reajustar-preco.component.css']
})
export class ReajustarPrecoComponent implements OnInit {
 @Input() product: Produto;
 titulo_modal: string = 'Reajustar Preço';
  constructor(public activeModal: NgbActiveModal,
                private _fb: FormBuilder,
                private productService: ProdutoService,
                private toastr: ToastrService,
                public _funcoesUtils: FuncoesUtils,
                private modalService: NgbModal,
                public currencyPipe: CurrencyPipe,
                private spinner: NgxSpinnerService,
              private cd: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.carregarForm(this.product);
    //this.productService.obterValorCustoProduto(this.product.codigo).subscribe (preco => {console.log(preco); this.preco.setValue(preco)});
  }

  formProduto = this._fb.group({
    id: [''],
    codigo: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    justificativa: ['', [Validators.required]],
    preco: ['', [Validators.required, Validators.pattern(/^[+-]?([0-9]+\,?[0-9]*|\,[0-9]+)$/)]]
  });

  public idProduto = this.formProduto.controls.id;
  public codigo = this.formProduto.controls.codigo;
  public descricao = this.formProduto.controls.descricao;
  public justificativa = this.formProduto.controls.justificativa;
  public preco = this.formProduto.controls.preco;

  public carregarForm(product: Produto) {

      this.idProduto.setValue(this.product.id);
      this.codigo.setValue(this.product.codigo);
      this.descricao.setValue(product.descricao);


      this.titulo_modal = "Editar Produto";


  }

  private formValido() {

    if (!this.formProduto.valid)
      return false;

    return true
  }

  public salvar(): void {

    if (this.formValido()) {
      this.idProduto.setValue(this.product.id);

      let reajustePreco = new ReajustePreco();

      let product = this.formProduto.value;
      reajustePreco.preco = this._funcoesUtils.parsePotentiallyGroupedFloat(product.preco.toString());
      reajustePreco.justificativaAlteracao = product.justificativa;
      reajustePreco.idProduto = this.product.id;


      this.updateProduto(reajustePreco);



    }

  }

  public updateProduto(reajustePreco: ReajustePreco) {
    this.productService.reajustarPreco( reajustePreco)
      .subscribe(
        next => {
          //console.log(next);
          this.productService.precoProduto.next(reajustePreco.preco);
          this.toastr.success("Produto reajustado com sucesso!");
          this.activeModal.close(true);
        }
      );
  }

}
