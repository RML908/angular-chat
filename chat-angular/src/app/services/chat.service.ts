import { Injectable } from '@angular/core';
import {BehaviorSubject, concatMap, filter, Observable, take} from "rxjs";
import {io, Socket} from "socket.io-client";
import {UserService} from "./user.service";
import {Member} from "../models/member";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket: Socket;
  url = 'http://localhost:3000';
  message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private userService:UserService) {
    this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
  }
    joinRoom(data:any): void{
    this.socket.emit('join', data);
    console.log("Room", data)
    }

  //   sendMessage(message: any){
  //   return this.userService.currentUser.pipe(
  //     filter((user) => !!user),
  //     take(1),
  //     concatMap((user) => {
  //       const data ={
  //         user: user!.firstName,
  //         message,
  //       };
  //       return [`user:${user!.id}`]
  //     })
  //   )
  //   this.socket.emit('message', message);
  // }
  sendMessage(message: any){
    this.socket.emit(message)
  }
    getNewMessage  ():Observable<any>  {
      return new Observable<{ user: string, message: string }>(observer => {
        this.socket.on('new message', (data) => {
          observer.next(data);
        });
        return () =>{
          this.socket.disconnect();
        }
      });
  };
    getStorage(){
      const storage: any = localStorage.getItem('chats');
      return storage ? JSON.parse(storage) : [];
    }

    setStorage(data: any){
      localStorage.setItem('chats', JSON.stringify(data))
    }
}
