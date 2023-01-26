import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/auth/login/login.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'login', loadChildren: () => import('./pages/auth/login/login.module')
      .then(m => m.LoginModule)
  },
  {
    path: 'chat', loadChildren:() => import('./pages/chat/chat.module')
      .then(m => m.ChatModule)
  },
  // {
  //   path: 'navbar', loadChildren:() => import('./shared-components/shared.module')
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
