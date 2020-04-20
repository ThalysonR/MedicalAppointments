import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RoutePaths } from "./routes";
import { LoggedoutComponent } from "./pages/loggedout/loggedout.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoggedInGuard } from "ngx-auth-firebaseui";

const routes: Routes = [
  { path: "", redirectTo: RoutePaths.Home, pathMatch: "full" },
  {
    path: RoutePaths.LoggedOut,
    component: LoggedoutComponent,
  },
  {
    path: RoutePaths.Home,
    component: HomeComponent,
    canActivate: [LoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
