import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignupRoutingModule} from "./signup-routing.module";
import {SignUpComponent} from "./sign-up.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared-components/shared.module";



@NgModule({
  declarations: [
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
   SignUpComponent
  ]
})
export class SignupModule { }
