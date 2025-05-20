import { Routes } from "@angular/router";
import { AuthGuard } from "../authorization/auth.guard";
import { CategoriaListaComponent } from "./categoria/categoria-lista/categoria-lista.component";
import { ProdutoDetailsComponent } from "./product-details/product-details.component";
import { ProdutoListComponent } from "./product-list/product-list.component";
import { ProdutoModalCreateEditComponent } from "./product-modal-create-edit/product-modal-create-edit.component";

export const ProdutoRoutes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProdutoListComponent , canActivate: [AuthGuard], data: {limparProdutos: true}},
  { path: 'products/:id', component: ProdutoDetailsComponent, canActivate: [AuthGuard] },
  { path: 'create', component: ProdutoModalCreateEditComponent, canActivate: [AuthGuard] },
  { path: 'categorias', component: CategoriaListaComponent , canActivate: [AuthGuard]},
];
