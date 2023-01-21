import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Member} from "../models/member";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
 createDb() {
   const users = [
     [
       {
         id: 1,
         firstName: "Bill",
         lastName: "White",
         image: "assets/users/Bill.png",
         roomId: {
           2: "room-1",
           3: "room-2",
           4: "room-3"
         }
       },
       {
         id: 2,
         firstName: "John",
         lastName: "Red",
         image: "assets/users/John.png",
         roomId: {
           1: "room-1",
           3: "room-4",
           4: "room-5"
         }
       },
       {
         id: 3,
         firstName: "Albert",
         lastName: "Black",
         image: "assets/users/Albert.png",
         roomId: {
           1: "room-2",
           2: "room-4",
           4: "room-6"
         }
       },
       {
         id: 4,
         firstName: "Steve",
         lastName: "Brown",
         image: "assets/users/Steve.png",
         roomId: {
           1: "room-3",
           2: "room-5",
           3: "room-6"
         }
       }
     ]
   ]
    return {users};
  }
genId(users: Member[]):number{
   return users.length > 0 ?Math.max(...users.map(user => user.id)) + 1 :11;
}
  constructor() { }
}
