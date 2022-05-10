import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProdutoService } from 'src/app/services/product.service';
import { Category } from '../models/categoria';
import { Produto } from '../models/produto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  public categories: Category[];
  public titulo: string;
  public mensagem: string;
  public product: Produto;

  ngOnInit(): void {
    this.carregarCategories();
  }

  constructor(private _fb: FormBuilder,
              private productService: ProdutoService
              ) {


  }


  public carregarCategories() {
    this.productService.readAllCategories().subscribe(cat => this.categories = cat);
  }

  formProduto = this._fb.group({
    nome: ['', [Validators.required]],
    especificacao: ['', [Validators.required]],
    ativo: [''],
    categoriaId: ['']
  });

  public Name = this.formProduto.controls.nome;
  public Specification = this.formProduto.controls.especificacao;
  public Active = this.formProduto.controls.ativo;
  public CategoryId = this.formProduto.controls.categoriaId;

  public carregarForm(product: Produto) {
    this.Name.setValue(product.nome);
    this.Specification.setValue(product.especificacao);
    this.Active.setValue(product.active);
    this.CategoryId.setValue(product.categoria);
  }

  private formValido() {

    if (!this.formProduto.valid)
      return false;

    return true
  }

  public salvar(): void {

/*
    if (this.formValido()) {
      let imunobiologico = this.formImunobiologico.value
      imunobiologico.IdImunobiologico = this.imunobiologico?.IdImunobiologico;
      imunobiologico.DoseUnica = this.DoseUnica.value ? 1 : 0;

      if (this.imunobiologico?.IdImunobiologico)
        this.atualizarImunobiologico(imunobiologico);
      else
        this.cadastrarImunobiologico(imunobiologico);

    } else {
      this.btnSlvDbd = false;
      this.hideSpinner();
    }
    */
  }


}
