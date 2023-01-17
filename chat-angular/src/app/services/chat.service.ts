import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {io} from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  socket = io('http://localhost:3000');

    sendMessage(message: any){
    this.socket.emit('message', message);
  }

  getNewMessage = () => {
      this.socket.on('message', (message) =>{
        this.message$.next(message);
      });

      return this.message$.asObservable();
  };

}