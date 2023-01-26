import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatRoutingModule} from "./chat-routing.module";
import {ChatComponent} from "./chat.component";
import {SharedModule} from "../../shared-components/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NavbarComponent } from "../../shared-components/navbar/navbar.component";



@NgModule({
    declarations: [
        ChatComponent,



    ],
    exports: [
        ChatComponent,
    ],
    imports: [
        CommonModule,
        ChatRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule

    ]
})
export class ChatModule { }
