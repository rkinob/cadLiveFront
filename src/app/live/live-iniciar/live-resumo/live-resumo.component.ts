import { Component, Input, OnInit } from '@angular/core';
import { ResumoLiveService } from 'src/app/services/resumolive.service';
import { RankingClientesLive } from '../../models/rankingClientesLive';
import { RelatorioPorCategoria } from '../../models/relatorioPorCategoria';

@Component({
  selector: 'app-live-resumo',
  templateUrl: './live-resumo.component.html',
  styleUrls: ['./live-resumo.component.css']
})
export class LiveResumoComponent implements OnInit {

  relatorioPorCategoria: RelatorioPorCategoria[];
  rankingClientes: RankingClientesLive[];
  @Input() idLive: string;
  currentIndex: number;
  constructor(private resumoLiveService: ResumoLiveService) { }

  ngOnInit(): void {
    this.resumoLiveService.carregarRelatorio.subscribe(a => {
      if(a) {
        this.obterRelatorioCategoria();
        this.obterRankingClientes();
      }
    });
    //this.resumoLiveService.
  }

  obterRelatorioCategoria(): void {
    this.resumoLiveService.RelatorioPorCategoria(this.idLive).subscribe(rel => this.relatorioPorCategoria = rel);
  }

  obterRankingClientes(): void {
    this.resumoLiveService.RankingClientesLive(this.idLive).subscribe(rel => this.rankingClientes = rel);
  }

}
