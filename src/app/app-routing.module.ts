import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '',
    loadChildren: () => import(`./product/product.module`).then(
      module => module.ProdutoModule
    )
  },
  {
    path: '',
    loadChildren: () => import(`./live/live.module`).then(
      module => module.LiveModule
    )
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
