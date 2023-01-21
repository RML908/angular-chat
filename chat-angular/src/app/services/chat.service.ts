import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {io, Socket} from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket: Socket;
  url = ('http://localhost:3000');
  message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
    this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
  }
    joinRoom(data: any): void{
    this.socket.emit('join', data);
    }

    sendMessage(message: any): void{
    this.socket.emit('message', message);
  }

    getNewMessage = ():Observable<any> => {
      return new Observable<{ user: string, message: string }>(observer => {
        this.socket.on('new message', (message) => {
          observer.next(message);
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
