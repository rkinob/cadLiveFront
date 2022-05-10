import { Routes } from "@angular/router";
import { ProdutoCreateComponent } from "./product-create/product-create.component";
import { ProdutoDetailsComponent } from "./product-details/product-details.component";
import { ProdutoListComponent } from "./product-list/product-list.component";

export const ProdutoRoutes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProdutoListComponent },
  { path: 'products/:id', component: ProdutoDetailsComponent },
  { path: 'create', component: ProdutoCreateComponent }
];
