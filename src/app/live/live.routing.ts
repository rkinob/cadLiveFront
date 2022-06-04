import { Routes } from "@angular/router";
import { AuthGuard } from "../authorization/auth.guard";
import { LiveIniciarComponent } from "./live-iniciar/live-iniciar.component";
import { LiveListComponent } from "./live-list/live-list.component";
import { LiveModalCreateEditComponent } from "./live-modal-create-edit/live-modal-create-edit.component";

export const LiveRoutes: Routes = [
  { path: '', redirectTo: 'lives', pathMatch: 'full' },
  { path: 'lives', component: LiveListComponent , canActivate: [AuthGuard]},
  { path: 'live/itens', component: LiveIniciarComponent , canActivate: [AuthGuard]},
  { path: 'create', component: LiveModalCreateEditComponent, canActivate: [AuthGuard] }
];
