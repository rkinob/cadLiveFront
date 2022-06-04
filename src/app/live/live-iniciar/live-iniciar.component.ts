import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LiveService } from 'src/app/services/live.service';
import { Live } from '../models/live';

@Component({
  selector: 'app-live-iniciar',
  templateUrl: './live-iniciar.component.html',
  styleUrls: ['./live-iniciar.component.css']
})
export class LiveIniciarComponent implements OnInit {
  live: Live;
  currentIndex = -1;
  constructor(private liveService: LiveService) { }

  ngOnInit(): void {
    console.log(history.state);
    this.live = history.state;
    /*this.route.data.subscribe(data => {
      this.live = data['live'];
      console.log(this.live);
    });*/
  }

  incluirProduto() {

  }

}
