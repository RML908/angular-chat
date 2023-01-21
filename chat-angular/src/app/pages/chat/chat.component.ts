import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {UserService} from "../../services/user.service";
import {Member} from "../../models/member";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
  roomId?: any | string ;
  newMessage: string[]=[];
  messageArray:{user: string, message: string}[] = []
  storageArray:any[''] = '';
  users: Member[] =[];

  showScreen = false;
  currentUser?:any
  selectedUser?:any | string;



  constructor( private chatService: ChatService,
               private userService: UserService,
               ) {}

  ngOnInit(): void {
    this.chatService.getNewMessage().subscribe(
      (
      data:{
      user:string,
      room: string,
      message: string
      }) => {
        setTimeout(() => {
          this.storageArray = this.chatService.getStorage();
          const storeIndex =  this.storageArray
            .findIndex((storage:any) => storage.roomId == this.roomId);
          this.messageArray = this.storageArray[storeIndex].chats;
        },500)
      // this.messageList.push(message);

      });
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsers().subscribe(data =>{
      this.users = data[0]
    })


  }

  selectUserHandler(firstName:string): void{
    this.selectedUser = this.users.find(user =>
      user.firstName  == firstName);
    this.roomId = this.selectedUser?.roomId[this.currentUser.firstName];
    console.log(this.roomId);
    this.messageArray = [];

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage:any) => storage.roomId === this.roomId);
    if(storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }
    this.join(this.currentUser.id, this.roomId);
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({user: username, room: roomId})
  }
  sendMessage(): void {
    this.chatService.sendMessage({
      user: this.currentUser.firstName,
      room: this.roomId,
      message: this.newMessage
    });

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage: { roomId: any; }) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.storageArray[storeIndex].chats.push({
        user: this.currentUser.firstName,
        message: this.newMessage
      });
    } else {
      const updateStorage = {
        roomId: this.roomId,
        chats: [{
          user: this.currentUser.firstName,
          message: this.newMessage
        }]
      };

      this.storageArray.push(updateStorage);
    }

    this.chatService.setStorage(this.storageArray);
    this.newMessage = [''];
  }
  // sendMessage(){
  //   this.chatService.sendMessage(this.newMessage);
  //   this.newMessage = '';
  // }

  keyUp(event:any){
   let element;
   if(event.code == null){
     return;
   }else{
     this.sendMessage()
    element = event.target.nextElementSibling;
      element.focus();
   }
  }
 }
