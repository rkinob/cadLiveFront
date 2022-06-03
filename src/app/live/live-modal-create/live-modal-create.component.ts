import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LiveService } from 'src/app/services/live.service';
import { FuncoesUtils } from 'src/app/utils/funcoes';
import { Live } from '../models/live';

@Component({
  selector: 'app-live-modal-create',
  templateUrl: './live-modal-create.component.html',
  styleUrls: ['./live-modal-create.component.css']
})
export class LiveModalCreateComponent implements OnInit {
  @Input() product: Live;
  titulo_modal: string = 'Criar Live';

  constructor(public activeModal: NgbActiveModal,
              private _fb: FormBuilder,
              private liveService: LiveService,
              private toastr: ToastrService,
              public _funcoesUtils: FuncoesUtils
              ) {}

  ngOnInit(): void {

  }

}
