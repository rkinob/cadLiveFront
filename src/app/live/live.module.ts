import { CommonModule, CurrencyPipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID} from '@angular/core';
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { LiveListComponent } from "./live-list/live-list.component";
import { LiveModalCreateComponent } from "./live-modal-create/live-modal-create.component";
import { LiveRoutes } from "./live.routing";

@NgModule({
  declarations: [
    LiveListComponent,
    LiveModalCreateComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(LiveRoutes),
    NgxPaginationModule,
    NgbModule
  ],
  entryComponents:[
    LiveModalCreateComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CurrencyPipe,
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
     {
        provide: LOCALE_ID,
        useValue: "pt-BR"
    }

  ]
})


export class LiveModule {}
