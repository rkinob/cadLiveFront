import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from 'src/app/services/product.service';
import { FuncoesUtils } from 'src/app/utils/funcoes';
import { Category } from '../../models/categoria';

@Component({
  selector: 'app-categoria-modal-create-edit',
  templateUrl: './categoria-modal-create-edit.component.html',
  styleUrls: ['./categoria-modal-create-edit.component.css']
})
export class CategoriaModalCreateEditComponent implements OnInit {

  @Input() categoria: Category;
  titulo_modal: string = 'Editar Category';

  constructor(public activeModal: NgbActiveModal,
              private _fb: FormBuilder,
              private produtoService: ProdutoService,
              private toastr: ToastrService,
              public _funcoesUtils: FuncoesUtils,
              public currencyPipe: CurrencyPipe) {}

  ngOnInit(): void {
    this.carregarForm(this.categoria);
  }



  formCategory = this._fb.group({
    id: [''],
    descricao: ['', [Validators.required]],
    codigo: ['', [Validators.required]],
    ativo: ['']
  });

  public idCategory = this.formCategory.controls.id;
  public descricao = this.formCategory.controls.descricao;
  public codigo = this.formCategory.controls.codigo;

  public carregarForm(categoria: Category) {

    if(this.categoria) {
      this.idCategory.setValue(categoria.id);
      this.descricao.setValue(categoria.descricao);
      this.codigo.setValue(categoria.codigo);
      this.titulo_modal = "Editar Categoria";
    }
    else {
      this.idCategory.setValue(null);
      this.titulo_modal = "Incluir Categoria";
    }

  }


  private formValido() {

    if (!this.formCategory.valid)
      return false;

    return true
  }

  public salvar(): void {

    if (this.formValido()) {
      if (this.categoria?.id)
        this.idCategory.setValue(this.categoria.id);

      let categoria = this.formCategory.value;
      categoria.ativo = 1;
      if (this.categoria?.id) {
        this.updateCategory(categoria);
      }

      else {
        categoria.ativo = 1;
        this.addCategory(categoria);
      }
    }
  }

  public addCategory(categoria: Category) {

    this.produtoService.createCategoria(categoria)
      .subscribe(
        next => {
          console.log(next);
          this.toastr.success("Categoria incluído com sucesso!");
          this.activeModal.close(true);

        },
        error => {
         // console.log(error);
          this.toastr.error(error);
          this.activeModal.close(false);
        }

      );
  }

  public updateCategory(categoria: Category) {
    this.produtoService.updateCategoria( categoria)
      .subscribe(
        next => {
          console.log(next);
          this.toastr.success("Categoria alterado com sucesso!");
          this.activeModal.close(true);
        }
      );
  }

}
