import { Injectable } from '@angular/core';
import {BehaviorSubject,Observable} from "rxjs";

import {io, Socket} from "socket.io-client";


@Injectable({
  providedIn: 'root'
})

export class ChatService {

  socket: Socket;
  url = 'http://localhost:3000';
  currentUset:any
  message$: BehaviorSubject<string> = new BehaviorSubject('');

  cureentUser:any;

  constructor(
  )
    {
    this.socket = io('http://localhost:3000', {transports:['websocket', 'polling', 'flashsokcet']});

    }


   sendMessage(data:any):void{
    this.socket.emit('join',data);
  }

   joinRoom(data:any): void {
    this.socket.emit('join', data);
    console.log("Room", data)
  }


   getStorage(){
      const storage: any = localStorage.getItem('chats');
      return storage ? JSON.parse(storage) : [];
    }

    setStorage(data: any){
      localStorage.setItem('chats', JSON.stringify(data))
    }

    getNewMessage(): Observable<any> {
    return new Observable<{ user: string, message: string }>(observer => {
      this.socket.on('new message', (data:any) => {
        console.log(data)
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
}
