import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LiveService } from 'src/app/services/live.service';
import { FuncoesUtils } from 'src/app/utils/funcoes';
import { Live } from '../models/live';
import { LiveStatus } from '../models/liveStatus';

@Component({
  selector: 'app-live-modal-create-edit',
  templateUrl: './live-modal-create-edit.component.html',
  styleUrls: ['./live-modal-create-edit.component.css']
})
export class LiveModalCreateEditComponent implements OnInit {

  @Input() live: Live;
  titulo_modal: string = 'Editar Live';
  liveStatus: LiveStatus[] = [];
  constructor(public activeModal: NgbActiveModal,
              private _fb: FormBuilder,
              private liveService: LiveService,
              private toastr: ToastrService,
              public _funcoesUtils: FuncoesUtils,
              public currencyPipe: CurrencyPipe) {}

  ngOnInit(): void {
    this.carregarStatus();
    console.log(this.live);
    this.carregarForm(this.live);
  }

  public carregarStatus() {
    this.liveService.BuscarTodosStatus().subscribe(status =>  { this.liveStatus = status; });
  }

  formLive = this._fb.group({
    id: [''],
    idStatus: ['', [Validators.required]],
    titulo: ['', [Validators.required]]
  });

  public idLive = this.formLive.controls.id;
  public idStatus = this.formLive.controls.idStatus;
  public titulo = this.formLive.controls.titulo;

  public carregarForm(live: Live) {

    if(this.live) {
      this.idLive.setValue(live.idLive);
      this.idStatus.setValue(live.idStatus);
      this.titulo.setValue(live.titulo);

      this.titulo_modal = "Editar Live";
    }
    else {
      this.idLive.setValue(null);
      this.titulo_modal = "Incluir Live";
    }

  }


  private formValido() {

    if (!this.formLive.valid)
      return false;

    return true
  }

  public salvar(): void {

    if (this.formValido()) {
      if (this.live?.idLive)
        this.idLive.setValue(this.live.idLive);

      let live = this.formLive.value;

      if (this.live?.idLive) {
        this.updateLive(live);
      }

      else {
        live.ativo = 1;
        this.addLive(live);
      }
    }
  }

  public addLive(live: Live) {

    this.liveService.create(live)
      .subscribe(
        next => {
          console.log(next);
          this.toastr.success("Live incluído com sucesso!");
          this.activeModal.close(true);

        },
        error => {
         // console.log(error);
          this.toastr.error(error);
          this.activeModal.close(false);
        }

      );
  }

  public updateLive(live: Live) {
    this.liveService.update( live)
      .subscribe(
        next => {
          console.log(next);
          this.toastr.success("Live alterado com sucesso!");
          this.activeModal.close(true);
        }
      );
  }

}
