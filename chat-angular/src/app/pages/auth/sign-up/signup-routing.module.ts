import {RouterModule, Routes} from "@angular/router";
import {SignUpComponent} from "./sign-up.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {path: '', component:SignUpComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule {}
