import { Component, Input, LOCALE_ID, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LiveService } from 'src/app/services/live.service';
import { Live } from '../models/live';
import { LiveCliente } from '../models/liveCliente';
import { LiveItem } from '../models/liveItem';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { LiveItemNovoCliente } from '../models/liveNovoCliente';
import { CurrencyPipe } from '@angular/common';
import { FuncoesUtils } from 'src/app/utils/funcoes';
import { ActivatedRoute } from '@angular/router';
import { LiveIncluirProdutoComponent } from '../live-incluir-produto/live-incluir-produto.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResumoLiveService } from 'src/app/services/resumolive.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/excel.service';
import { LiveItemExcel } from '../models/liveItemExcel';

@Component({
  selector: 'app-live-iniciar',
  templateUrl: './live-iniciar.component.html',
  styleUrls: ['./live-iniciar.component.css'],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
    }]
})
export class LiveIniciarComponent implements OnInit {
  live: Live;
  currentIndex = -1;
  showResumo: boolean = false;
  clientes: LiveCliente[];
  constructor(private liveService: LiveService,
              private toastr: ToastrService,
              public currencyPipe: CurrencyPipe,
              public _funcoesUtils: FuncoesUtils,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private resumoLiveService: ResumoLiveService,
              private spinner: NgxSpinnerService,
              private _excelService: ExcelService
              ) { }
  clientesCombo: any = [];
  selectedCliente: any;

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.live = data['live'];
      this.atualizarClientes();
      this.resumoLiveService.carregarRelatorio.next(true);
    });
 }

 inativarItem(liveItem: LiveItem): void {

  if(confirm("Tem certeza de que deseja excluir?")) {
    this.liveService.inativarItem(liveItem).subscribe(cli => {
      if(cli) {
        this.atualizarClientes();
        this.toastr.success("item inativado com sucesso!");
      }

    },
    error => {
      this.toastr.error(error);

    });
  }

 }

atualizarClientes(): void {
  this.liveService.BuscarTodosClientes().subscribe(cliente =>  {
    this.clientesCombo = [];
    cliente.forEach(cli => {
      this.clientesCombo = [...this.clientesCombo, {id: cli.id, name: cli.nome}];
      this.selectedCliente =  {id: cli.id, name: cli.nome};
      this.dadosLive(this.live.idLive);

    });
  });
}

dadosLive(idLive: string): void {
  this.liveService.ConsultarLive(idLive).subscribe(live => {
    this.live = live;
    this.resumoLiveService.carregarRelatorio.next(true);
  });
}


  NovoCliente(cliente: any, liveItem: LiveItem ): void {

    if(cliente.value != '') {
      this.spinner.show();
      let liveItemNovoCliente = new LiveItemNovoCliente();
      liveItemNovoCliente.idLive = liveItem.idLive;
      liveItemNovoCliente.idLiveItem = liveItem.idLiveItem;
      liveItemNovoCliente.nomeCliente = cliente.value;
      this.liveService.incluirClienteLive(liveItemNovoCliente).subscribe(cli => {
        if(cli) {
          this.atualizarClientes();
          this.toastr.success("Cliente incluído com sucesso!");
        }

      },
      error => {
        this.toastr.error(error);

       },
       () => { this.spinner.hide(); });
    }


  }

  exportarExcel() {
    let itensArr: LiveItemExcel[] = [] ;

    this.live.liveItems.forEach(item => {
      itensArr.push(new LiveItemExcel({
        codigo: item.codigo,
        categoria: item.nomeCategoria,
        descricao: item.nomeProduto,
        especificacao: item.especificacao,
        nomeCliente: item.nomeCliente,
        preco: item.preco,
        valorPago: item.valorPago
      }));

    });

    this._excelService.exportAsExcelFile(JSON.parse(JSON.stringify(itensArr)), "" )
  }
  incluirProduto() {
    const modalRef = this.modalService.open(LiveIncluirProdutoComponent, {size: 'lg' });
    modalRef.componentInstance.idLive = this.live.idLive;

    modalRef.result.then((data) => {
      // on close
      if(data) {
        this.dadosLive(this.live.idLive);
      }
    }, (reason) => {
      // on dismiss
      console.log(reason)
    });
  }
  atualizarCliente(event: any, liveItem: LiveItem) {
    let clienteId = null;

    if(event?.id)
    {
      clienteId = event?.id;
    }
    else if(event) {
      clienteId = event;
    }

    if(liveItem.idCliente != clienteId || (clienteId == null && liveItem.idCliente != '' ) ) {
      this.spinner.show();
        liveItem.idCliente = clienteId;
        this.liveService.atualizarCliente(liveItem).subscribe(cliente => {
          this.resumoLiveService.carregarRelatorio.next(true);
          this.toastr.success("Cliente atualizado com sucesso!");
        },
        error => {
          // console.log(error);
           this.toastr.error(error);

         },
         () => { this.spinner.hide(); });
      }
  }

  atualizarPreco(event: any, liveItem: LiveItem) {
    let valor = event.target.value;
    if(valor) {
      valor = valor.replace('R$', '');
      valor = valor.replace(/\s/g, '');
      valor = this._funcoesUtils.parsePotentiallyGroupedFloat(valor.toString());
      this.spinner.show();
      liveItem.preco = valor;
      this.liveService.atualizarProduto(liveItem).subscribe(item => {
        this.resumoLiveService.carregarRelatorio.next(true);
        this.toastr.success("Preço atualizado com sucesso!");
      },
      error => {
        this.spinner.hide();
         this.toastr.error(error);
       },
       () => { this.spinner.hide(); });
    }

  }

  atualizarValorPago(event: any, liveItem: LiveItem) {
    let valor = event.target.value;
    if(valor) {
      valor = valor.replace('R$', '');
      valor = valor.replace(/\s/g, '');
      valor = this._funcoesUtils.parsePotentiallyGroupedFloat(valor.toString());
      this.spinner.show();
      liveItem.valorPago = valor;
      this.liveService.atualizarValorPago(liveItem).subscribe(item => {
        this.resumoLiveService.carregarRelatorio.next(true);
        this.toastr.success("Valor Pago atualizado com sucesso!");
      },
      error => {
        this.spinner.hide();
         this.toastr.error(error);
       },
       () => { this.spinner.hide(); });
    }

  }

}
