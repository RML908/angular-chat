import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatRoutingModule} from "./chat-routing.module";
import {ChatComponent} from "./chat.component";
import {SharedModule} from "../../shared-components/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule { }
