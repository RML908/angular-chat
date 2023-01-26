import {AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import { users}  from 'src/assets/data';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit, AfterViewChecked  {
  @ViewChild('scrollMe')  myScrollContainer?: ElementRef<any>;
  roomId:string = '';
  storageArray:any[] = [];
  users$: any ;
  currentUser: any ;
  selectedUser:any;


  messageArray: { user:string, message:string }[] = [];
  messageText: string = '';


  constructor( private chatService: ChatService,
               private userService: UserService,
               private route: ActivatedRoute,
               )
  {
  }


  ngOnInit(): void {
    this.currentUser = history.state.data
    this.getUsersFiltet()

    this.chatService.getMessage().subscribe(
      (
      data:{
      user:string,
      room: string,
      message: string
      }) => {
        if(this.roomId){
        setTimeout(() => {
          this.storageArray = this.chatService.getStorage();
          const storeIndex =  this.storageArray
            .findIndex((storage:any) => storage.roomId == this.roomId);
          this.messageArray = this.storageArray[storeIndex].chats;
        },500)
        }
      });
    this.getUsername()
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
}

  getUsername() {
    return JSON.parse(localStorage.getItem('currentUser')!);
  }

  selectUserHandler(id:any){
    this.selectedUser = this.users$.filter((user:any) => user.id === id);

    this.roomId = this.selectedUser[0]?.roomId[this.currentUser.id].toString();
    this.messageArray = [];

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage:any) => storage.roomId === this.roomId);

    if(storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }
    this.join(this.currentUser.firstName, this.roomId);
  }

  join(username:string, roomId:any ):void{
    this.chatService.joinRoom({user:username , room:roomId});
  }

  sendMessage(): void {
    this.chatService.sendMessage({
      user: this.currentUser.firstName,
      room: this.roomId,
      message: this.messageText
    });

    this.storageArray = this.chatService.getStorage();

    const storeIndex = this.storageArray
      .findIndex((storage:any) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.storageArray[storeIndex].chats.push({
        user: this.currentUser.firstName,
        message: this.messageText
      });
    }
    else
    {
      const updateStorage = {
        roomId: this.roomId,
        chats: [{
          user: this.currentUser.firstName,
          message: this.messageText
        }]
      };

      this.storageArray.push(updateStorage);
    }
    this.chatService.setStorage(this.storageArray);
    this.messageText = '';
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer!.nativeElement.scrollTop = this.myScrollContainer?.nativeElement.scrollHeight;
    } catch(err) { }
}
  keyUp(event:any){
   let element;
   if(event.code == null){
     return;
   }else{
     this.sendMessage()
    element = event.target.nextElementSibling;

   }

  }
  getUsersFiltet(){
    this.users$ = users.filter((user:any) => user.id !== this.currentUser.id)
  }


 }

