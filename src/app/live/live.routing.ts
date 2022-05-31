import { Routes } from "@angular/router";
import { AuthGuard } from "../authorization/auth.guard";
import { LiveListComponent } from "./live-list/live-list.component";
import { LiveModalCreateComponent } from "./live-modal-create/live-modal-create.component";

export const LiveRoutes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'lives', component: LiveListComponent , canActivate: [AuthGuard]},
  { path: 'create', component: LiveModalCreateComponent, canActivate: [AuthGuard] }
];
