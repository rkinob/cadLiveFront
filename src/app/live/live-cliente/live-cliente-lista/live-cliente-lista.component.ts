import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LiveCliente } from 'src/app/live/models/liveCliente';

import { FuncoesUtils } from 'src/app/utils/funcoes';
import { LiveClienteModalCreateEditComponent } from '../live-cliente-modal-create-edit/live-cliente-modal-create-edit.component';
import { LiveService } from 'src/app/services/live.service';

@Component({
  selector: 'app-live-cliente-lista',
  templateUrl: './live-cliente-lista.component.html',
  styleUrls: ['./live-cliente-lista.component.css']
})
export class LiveClienteListaComponent implements OnInit {
  currentLiveCliente: LiveCliente | null = null;
  LiveClientes: LiveCliente[] ;

  currentIndex = -1;
  productName = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private clienteService: LiveService,
              private funcoesUtils: FuncoesUtils,
              private modalService: NgbModal,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  novaLiveCliente():void {
    const modalRef = this.modalService.open(LiveClienteModalCreateEditComponent, {size: 'lg' });

    modalRef.result.then((data) => {
      if(data) {
        this.retrieveLiveCliente();
      }
    }, (reason) => {
      // on dismiss
    });
  }

  ngOnInit(): void {
    this.retrieveLiveCliente();

  }
  private paginate (array: LiveCliente[], pageSize: number, pageNumber: number) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveLiveCliente();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveLiveCliente();
  }

  retrieveLiveCliente(): void {
    this.spinner.show();
    this.clienteService.BuscarTodosClientes()
    .subscribe(
      response => {
        this.LiveClientes = this.funcoesUtils.paginate(response, this.pageSize,  this.page) ;
        this.count = response.length;

      },
      error => {

      },
      () => {
        this.spinner.hide()
      });
  }
  /*
  excluirLiveCliente(LiveCliente: LiveCliente): void {
    if(confirm("Tem certeza de que deseja excluir?")) {
      this.clienteService.inativarLiveCliente(LiveCliente)
    .subscribe(
      response => {
        this.retrieveLiveCliente();
        this.toastr.success("LiveCliente excluída com sucesso!");
      },
      error => {
        this.toastr.error(error);
      },
      () => {
        this.spinner.hide()
      });
    }

  }*/

  editarLiveCliente(cliente: LiveCliente): void {
    const modalRef = this.modalService.open(LiveClienteModalCreateEditComponent,  { size: 'lg'  });
    modalRef.componentInstance.cliente = cliente;

    modalRef.result.then((data) => {
      // on close
      if(data) {
        this.retrieveLiveCliente();
      }
    }, (reason) => {
      // on dismiss
    });

  }

  incluirLiveCliente(): void {
    const modalRef = this.modalService.open(LiveClienteModalCreateEditComponent, {size: 'lg' });

    modalRef.result.then((data) => {
      if(data) {
        this.retrieveLiveCliente();
      }
    }, (reason) => {
      // on dismiss
    });
  }
}
