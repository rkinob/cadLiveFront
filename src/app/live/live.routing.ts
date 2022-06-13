import { Routes } from "@angular/router";
import { AuthGuard } from "../authorization/auth.guard";
import { LiveIniciarComponent } from "./live-iniciar/live-iniciar.component";
import { LiveListComponent } from "./live-list/live-list.component";
import { LiveModalCreateEditComponent } from "./live-modal-create-edit/live-modal-create-edit.component";
import { LiveIniciarResolver } from "./resolvers/live-iniciar.resolver";

export const LiveRoutes: Routes = [
  { path: '', redirectTo: 'lives', pathMatch: 'full' },
  { path: 'lives', component: LiveListComponent , canActivate: [AuthGuard] },
  { path: 'live/itens/:id', component: LiveIniciarComponent , canActivate: [AuthGuard], resolve: {live: LiveIniciarResolver}},
  { path: 'create', component: LiveModalCreateEditComponent, canActivate: [AuthGuard] }
];
