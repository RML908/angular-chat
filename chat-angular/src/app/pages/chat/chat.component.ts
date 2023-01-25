import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import { users}  from 'src/assets/data';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit, AfterViewInit {
  roomId:any = []   ;
  newMessage: string ='';
  messageArray: { user:string, message:string }[] = []
  storageArray:any[''] = '';
  users$: any= {};
  selectedUser:any;
  id:any;
  @Input()currentUser: any ;
  currentUserId: any;
  logedUser:any;
  messageText: string = '';


  constructor( private chatService: ChatService,
               private userService: UserService,
               private route: ActivatedRoute,
               )
  {
     // this.users$ = users
  }

  ngOnInit(): void {
    this.users$ = users
    this.currentUser = history.state.data

    this.chatService.getNewMessage().subscribe(
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
      // this.messageList.push(message);
        }
      });
    this.getUsername()
  }


  ngAfterViewInit(){

  }
  getUsername() {
    return JSON.parse(localStorage.getItem('currentUser')!);
  }


  returnUsers(){
    for(let i=0; i<this.users$.length; i++){
      return this.users$ = this.users$[i]
    }
  }

  // getUsers(){
  //   this.userService.getUsers().subscribe(data =>{
  //     this.users = data[0]
  //     console.log(this.users);
  //   })
  //
  //
  // }

  selectUserHandler(id:any){
    this.selectedUser = this.users$.filter((user: { id: any; }) => user.id === id);
    console.log(this.selectedUser);
    console.log(this.selectedUser);
    console.log(typeof this.roomId);
    this.roomId = this.selectedUser[0]?.roomId[this.currentUser.id];

    this.messageArray = [];

    this.storageArray = this.chatService.getStorage();
    console.log(this.storageArray);
    const storeIndex = this.storageArray
      .findIndex((storage:any) => storage.roomId === this.roomId);
    console.log(storeIndex);
    if(storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
      console.log(this.messageArray);
    }
    this.join(this.currentUser.firstName, this.roomId);
  }

  join(username:string, roomId:any ):void{
    this.chatService.joinRoom({user:username , room:roomId});
  }

  // sendMessage(message: string, clientId:string): void {
  //   this.socketService.sendMessage(message, clientId)
  //
  //
  //   this.storageArray = this.chatService.getStorage();
  //   const storeIndex = this.storageArray
  //     .findIndex((storage: { roomId: any; }) => storage.roomId === this.roomId);
  //
  //   if (storeIndex > -1) {
  //     this.storageArray[storeIndex].chats.push({
  //       user: this.logedUser.firstName,
  //       message: this.newMessage
  //     });
  //   } else {
  //     const updateStorage = {
  //       roomId: this.roomId,
  //       chats: [{
  //         user: this.logedUser.firstName,
  //         message: this.newMessage
  //       }]
  //     };
  //
  //     this.storageArray.push(updateStorage);
  //   }
  //
  //   this.chatService.setStorage(this.storageArray);
  //   this.newMessage = '';
  // }

  sendMessage(): void {
   let firstName = this.currentUser.firstName
    console.log(firstName);
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
    console.log(this.messageArray);
    this.chatService.setStorage(this.storageArray);
    this.messageText = '';
  }

  keyUp(event:any){
   let element;
   if(event.code == null){
     return;
   }else{
     // this.sendMessage(selectedUser.id,selectedUser.message)
    element = event.target.nextElementSibling;
      element.focus();
   }
  }
 }
