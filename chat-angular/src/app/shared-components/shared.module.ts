import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { NavbarComponent } from './navbar/navbar.component';
import { ChatComponent } from '../pages/chat/chat.component';
import { AppModule } from '../app.module';

@NgModule({
  declarations: [
    NavbarComponent,

  ],
  imports: [
    CommonModule,

  ],
  exports: [
    NavbarComponent
  ],
})
export class SharedModule {}
