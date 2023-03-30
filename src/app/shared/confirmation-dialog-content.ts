import {Component, Input} from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'confirmation-dialog-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{confirmationBoxTitle}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{confirmationMessage}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close(true)">Sim</button>
      <button type="button" class="btn btn-secondary" (click)="activeModal.close(false)">Não</button>
    </div>
  `
})
export class ConfirmationDialogContent {
  @Input() confirmationBoxTitle: string;
  @Input() confirmationMessage: string;

  constructor(public activeModal: NgbActiveModal) {}


}
