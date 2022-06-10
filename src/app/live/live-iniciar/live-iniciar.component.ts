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
  clientes: LiveCliente[];
  constructor(private liveService: LiveService, private toastr: ToastrService, public currencyPipe: CurrencyPipe,
    public _funcoesUtils: FuncoesUtils) { }
  clientesCombo: any = [];
  selectedCliente: any;


atualizarClientes(): void {
  this.liveService.BuscarTodosClientes().subscribe(cliente =>  {
    //this.clientes = cliente;
    this.clientesCombo = [];
    cliente.forEach(cli => {
      //this.clientesCombo.push({id: cli.id, name: cli.nome});
      this.clientesCombo = [...this.clientesCombo, {id: cli.id, name: cli.nome}];
      this.selectedCliente =  {id: cli.id, name: cli.nome};
      this.dadosLive(this.live.idLive);

    });
    //this.clientesCombo = [...this.clientesCombo, {id: null, name:"Sem Cliente"}];
  });
}

dadosLive(idLive: string): void {
  this.liveService.ConsultarLive(idLive).subscribe(live => {
    this.live = live;
  });
}

ngOnInit(): void {
   this.live = history.state;
   console.log(this.live );
   this.atualizarClientes();
}

  NovoCliente(cliente: any, liveItem: LiveItem ): void {
    //console.log(cliente);
    if(cliente.value != '') {

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
        // console.log(error);
         this.toastr.error(error);

       });
    }


  }
  incluirProduto() {

  }
  atualizarCliente(event: any, liveItem: LiveItem) {
    let clienteId = null;

    if(event?.id)
    {
      clienteId = event?.id;
    }

    if(liveItem.idCliente != clienteId || (clienteId == null && liveItem.idCliente != '' ) ) {

        liveItem.idCliente = clienteId;
        this.liveService.atualizarCliente(liveItem).subscribe(cliente => {
          console.log(cliente);
          this.toastr.success("Cliente atualizado com sucesso!");
        },
        error => {
          // console.log(error);
           this.toastr.error(error);

         });
      }



  }

  atualizarPreco(event: any, liveItem: LiveItem) {
    console.log(event.target);
    let valor = event.target.value;
    if(valor) {
      valor = valor.replace('R$', '');
      valor = valor.replace(/\s/g, '');
      valor = this._funcoesUtils.parsePotentiallyGroupedFloat(valor.toString());

      liveItem.preco = valor;
      this.liveService.atualizarProduto(liveItem).subscribe(item => {
        console.log(item);
        this.toastr.success("Preço atualizado com sucesso!");
      },
      error => {
         this.toastr.error(error);
       });
    }

  }

}
