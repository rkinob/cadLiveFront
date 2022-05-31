import { CommonModule, CurrencyPipe } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ProdutoDetailsComponent } from './product-details/product-details.component';
import { ProdutoListComponent } from './product-list/product-list.component';
import { RouterModule } from "@angular/router";
import { ProdutoRoutes } from "./product.routing";
import { NgxPaginationModule } from "ngx-pagination";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProdutoModalCreateEditComponent } from './product-modal-create-edit/product-modal-create-edit.component';
import { CurrencyFormatterDirective } from "../shared/currency-formatter.directive";

import {LOCALE_ID} from '@angular/core';


@NgModule({
  declarations: [
    ProdutoDetailsComponent,
    ProdutoListComponent,
    ProdutoModalCreateEditComponent,
    CurrencyFormatterDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(ProdutoRoutes),
    NgxPaginationModule,
    NgbModule
  ],
  entryComponents:[
    ProdutoModalCreateEditComponent
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

export class ProdutoModule {}