import { Component, OnInit } from '@angular/core';
import { LiveService } from 'src/app/services/live.service';
import { FuncoesUtils } from 'src/app/utils/funcoes';
import { Live } from '../models/live';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {
  currentLive: Live | null = null;
  lives: Live[] ;
  currentIndex = -1;
  productName = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private liveService: LiveService,
              private funcoesUtils: FuncoesUtils) { }

  novaLive():void {

  }

  ngOnInit(): void {
    this.retrieveLive();
  }
  private paginate (array: Live[], pageSize: number, pageNumber: number) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveLive();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveLive();
  }

  retrieveLive(): void {
   // const params = this.getRequestParams(this.productName, this.page, this.pageSize);

    this.liveService.BuscarTodas()
    .subscribe(
      response => {
        // = response;
        this.lives = this.funcoesUtils.paginate(response, this.pageSize,  this.page) ;
        this.count = response.length;

      },
      error => {

      });
  }
}
