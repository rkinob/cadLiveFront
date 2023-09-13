import { Routes } from "@angular/router";
import { AuthGuard } from "../authorization/auth.guard";
import { LiveIniciarComponent } from "./live-iniciar/live-iniciar.component";
import { LiveListComponent } from "./live-list/live-list.component";
import { LiveModalCreateEditComponent } from "./live-modal-create-edit/live-modal-create-edit.component";
import { LiveIniciarResolver } from "./resolvers/live-iniciar.resolver";
import { LiveClienteListaComponent } from "./live-cliente/live-cliente-lista/live-cliente-lista.component";

export const LiveRoutes: Routes = [
  { path: '', redirectTo: 'lives', pathMatch: 'full' },
  { path: 'lives', component: LiveListComponent , canActivate: [AuthGuard] },
  { path: 'live/itens/:id', component: LiveIniciarComponent , canActivate: [AuthGuard], resolve: {live: LiveIniciarResolver}},
  { path: 'create', component: LiveModalCreateEditComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: LiveClienteListaComponent , canActivate: [AuthGuard]},
];
