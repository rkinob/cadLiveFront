

import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FuncoesUtils } from 'src/app/utils/funcoes';
import { LiveService } from 'src/app/services/live.service';
import { LiveCliente } from 'src/app/live/models/liveCliente';
@Component({
  selector: 'app-live-cliente-modal-create-edit',
  templateUrl: './live-cliente-modal-create-edit.component.html',
  styleUrls: ['./live-cliente-modal-create-edit.component.css']
})
export class LiveClienteModalCreateEditComponent implements OnInit {

  @Input() cliente: LiveCliente;
  titulo_modal: string = 'Editar Categoria';

  constructor(public activeModal: NgbActiveModal,
              private _fb: FormBuilder,
              private clienteService: LiveService,
              private toastr: ToastrService,
              public _funcoesUtils: FuncoesUtils,
              public currencyPipe: CurrencyPipe,
              private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.carregarForm(this.cliente);
  }

  formLiveCliente = this._fb.group({
    id: [''],
    nome: ['', [Validators.required]]
 //   ativo: ['']
  });

  public id = this.formLiveCliente.controls.id;
  public nome = this.formLiveCliente.controls.nome;

  public carregarForm(cliente: LiveCliente) {

    if(this.cliente) {
      this.id.setValue(cliente.id);
      this.nome.setValue(cliente.nome);
      this.titulo_modal = "Editar Cliente";
    }
    else {
      this.id.setValue(null);
      this.titulo_modal = "Incluir Cliente";
    }

  }


  private formValido() {
    if (!this.formLiveCliente.valid)
      return false;
    return true
  }

  public salvar(): void {

    if (this.formValido()) {
      if (this.cliente?.id)
        this.id.setValue(this.cliente.id);

      let cliente = this.formLiveCliente.value;
      cliente.ativo = 1;
      if (this.cliente?.id) {
        this.updateLiveCliente(cliente);
      }
      else {
        cliente.ativo = 1;
        this.addLiveCliente(cliente);
      }
    }
  }

  public addLiveCliente(cliente: LiveCliente) {
    this.spinner.show();
    this.clienteService.addCliente(cliente)
      .subscribe(
        next => {
          this.toastr.success("Cliente incluído com sucesso!");
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

  public updateLiveCliente(cliente: LiveCliente) {
    this.spinner.show();
    this.clienteService.updateCliente( cliente)
      .subscribe(
        next => {
          console.log(next);
          this.toastr.success("Cliente alterado com sucesso!");
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

}
