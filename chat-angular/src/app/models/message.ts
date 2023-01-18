import {Member} from "./member";

export class Message {
  message: string;
  createdAt: Date;
  sender: Member

  // @ts-ignore
  constructor({message, createAt, sender}){
    this.message = message;
    this.createdAt = createAt;
    this.sender = sender;
  }
}

