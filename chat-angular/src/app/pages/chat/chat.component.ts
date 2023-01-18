import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  newMessage?: string;
  messageList: string[] =[]

  constructor( private chatService: ChatService,
               private userService: UserService
               ) {

  }

  ngOnInit(): void {
    this.chatService.getNewMessage().subscribe((message:string) => {
      this.messageList.push(message);

    });
    console.log("users",this.userService.users);
  }
 sendMessage(){
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
 }


}
