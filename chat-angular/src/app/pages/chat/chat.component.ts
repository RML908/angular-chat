import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {UserService} from "../../services/user.service";
import {Member} from "../../models/member";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
  roomId?: any | string ;
  newMessage: string ='';
  messageArray:{user: string, message: string}[] = []
  storageArray:any[''] = '';
  users: Member[] =[];
  id:any
  currentUser: Subscription ;
  selectedUser?:any | string;
  logedUser:any;


  constructor( private chatService: ChatService,
               private userService: UserService,
               private route: ActivatedRoute
               ) { this.currentUser = new Subscription;

  }

  ngOnInit(): void {
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
    this.getUsers()
    this.getUsername()
  }
  public userList =
    [
      {
        "id": 1,
        "firstName": "Bill",
        "lastName": "White",
        "image": "assets/users/Bill.png",
        "roomId": {
          "2": "room-1",
          "3": "room-2",
          "4": "room-3"
        }
      },
      {
        "id": 2,
        "firstName": "John",
        "lastName": "Red",
        "image": "assets/users/John.png",
        "roomId": {
          "1": "room-1",
          "3": "room-4",
          "4": "room-5"
        }
      },
      {
        "id": 3,
        "firstName": "Albert",
        "lastName": "Black",
        "image": "assets/users/Albert.png",
        "roomId": {
          "1": "room-2",
          "2": "room-4",
          "4": "room-6"
        }
      },
      {
        "id": 4,
        "firstName": "Steve",
        "lastName": "Brown",
        "image": "assets/users/Steve.png",
        "roomId": {
          "1": "room-3",
          "2": "room-5",
          "3": "room-6"
        }
      }
    ]
  getUsername() {
    return JSON.parse(localStorage.getItem('currentUser')!).firstName;
  }

  getUsers(){
    this.userService.getUsers().subscribe(data =>{
      this.users = data[0]
    })


  }

  selectUserHandler(firstName?:string){
    console.log(firstName);
    this.selectedUser = this.userList.find(user =>
      user.firstName  == firstName);
    this.roomId = this.selectedUser?.roomId[this.logedUser.firstName];
    console.log(this.roomId);
    this.messageArray = [];

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage:any) => storage.roomId === this.roomId);
    if(storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }
    this.join(this.logedUser.firstName, this.roomId);
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({user: username, room: roomId})
  }

  sendMessage(): void {
    this.chatService.sendMessage({
      user: this.logedUser.firstName,
      room: this.roomId,
      message: this.newMessage
    });

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage: { roomId: any; }) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.storageArray[storeIndex].chats.push({
        user: this.logedUser.firstName,
        message: this.newMessage
      });
    } else {
      const updateStorage = {
        roomId: this.roomId,
        chats: [{
          user: this.logedUser.firstName,
          message: this.newMessage
        }]
      };

      this.storageArray.push(updateStorage);
    }

    this.chatService.setStorage(this.storageArray);
    this.newMessage = '';
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
