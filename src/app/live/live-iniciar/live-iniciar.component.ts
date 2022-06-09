import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LiveService } from 'src/app/services/live.service';
import { Live } from '../models/live';
import { LiveCliente } from '../models/liveCliente';
import { LiveItem } from '../models/liveItem';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { LiveItemNovoCliente } from '../models/liveNovoCliente';

@Component({
  selector: 'app-live-iniciar',
  templateUrl: './live-iniciar.component.html',
  styleUrls: ['./live-iniciar.component.css']
})
export class LiveIniciarComponent implements OnInit {
  live: Live;
  currentIndex = -1;
  clientes: LiveCliente[];
  constructor(private liveService: LiveService, private toastr: ToastrService) { }
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
  });
}

dadosLive(idLive: string): void {
  this.liveService.ConsultarLive(idLive).subscribe(live => {
    this.live = live;
  });
}

ngOnInit(): void {
   this.live = history.state;
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

    if(event.id) {
      liveItem.idCliente = event.id;
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

}
