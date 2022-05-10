import { NgModule } from '@angular/core';
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

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent
      ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    ProdutoModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
