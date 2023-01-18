import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./models/auth/login/login.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'Login', loadChildren: () => import('./models/auth/auth.module')
      .then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
