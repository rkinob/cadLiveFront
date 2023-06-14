import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResumoLiveService } from 'src/app/services/resumolive.service';
import { RankingClientesLive } from '../../models/rankingClientesLive';
import { RelatorioPorCategoria } from '../../models/relatorioPorCategoria';

@Component({
  selector: 'app-live-resumo',
  templateUrl: './live-resumo.component.html',
  styleUrls: ['./live-resumo.component.css']
})
export class LiveResumoComponent implements OnInit, OnDestroy {

  relatorioPorCategoria: RelatorioPorCategoria[];
  rankingClientes: RankingClientesLive[];
  @Input() idLive: string;
  currentIndex: number;
  subCarregarRelatorio: Subscription;

  constructor(private resumoLiveService: ResumoLiveService) { }

  ngOnDestroy(): void {
    this.subCarregarRelatorio.unsubscribe();
  }

  ngOnInit(): void {
    this.subCarregarRelatorio = this.resumoLiveService.carregarRelatorio.subscribe(a => {
      if(a) {
        this.obterRelatorioCategoria();
        this.obterRankingClientes();


      }
    });

  }

  obterRelatorioCategoria(): void {
    this.resumoLiveService.RelatorioPorCategoria(this.idLive).subscribe(rel => {this.relatorioPorCategoria = rel; this.resumoLiveService.relatorioPorCategoriaBs.next(this.relatorioPorCategoria); });
  }

  obterRankingClientes(): void {
    this.resumoLiveService.RankingClientesLive(this.idLive).subscribe(  rel => {this.rankingClientes = rel ; this.resumoLiveService.rankingClientesBs.next(this.rankingClientes); });
  }

}
