import { CommonModule, CurrencyPipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID} from '@angular/core';
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { LiveListComponent } from "./live-list/live-list.component";
import { LiveRoutes } from "./live.routing";
import { LiveModalCreateEditComponent } from './live-modal-create-edit/live-modal-create-edit.component';
import { LiveIniciarComponent } from './live-iniciar/live-iniciar.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { LiveIncluirProdutoComponent } from './live-incluir-produto/live-incluir-produto.component';
import { LiveIniciarResolver } from "./resolvers/live-iniciar.resolver";
import { LiveResumoComponent } from './live-iniciar/live-resumo/live-resumo.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    LiveListComponent,
    LiveModalCreateEditComponent,
    LiveIniciarComponent,
    LiveIncluirProdutoComponent,
    LiveResumoComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(LiveRoutes),
    NgxPaginationModule,
    NgSelectModule,
    NgbModule,
    NgxSpinnerModule
  ],
  entryComponents:[
    LiveModalCreateEditComponent,
    LiveIncluirProdutoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CurrencyPipe,
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
     {
        provide: LOCALE_ID,
        useValue: "pt-BR"
    },
    LiveIniciarResolver

  ]
})


export class LiveModule {}
