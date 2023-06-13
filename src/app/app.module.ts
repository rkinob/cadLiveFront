import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutoModule } from './product/product.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import localePt from '@angular/common/locales/pt';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from './services/usuario.service';
import { LiveModule } from './live/live.module';
import { CurrencyFormatterDirective } from './shared/currency-formatter.directive';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ExcelService } from './services/excel.service';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    CurrencyFormatterDirective
      ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    ProdutoModule,
    LiveModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [
    UsuarioService,
    ExcelService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]

})
export class AppModule { }
