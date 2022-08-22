import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {DetailComponent} from "./components/detail/detail.component";
import {AuthGuard} from "./_helpers/auth.guard";

const routes: Routes = [
  { path: '', component: HomepageComponent }, // default component
  { path: 'login', component: LoginComponent },
  { path: 'detail/:id/:mode', component: DetailComponent, canActivate: [AuthGuard]},

  // otherwise redirect to homepage
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
