export class Member {
   id:number;
   firstName: string;
   lastName: string;
   image:null;
   roomId: {
    "1": "room-3",
    "2": "room-5",
    "3": "room-6"
  }

  // @ts-ignore
  constructor({id,firstName, lastName, image, roomID}) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.image = image
    this.roomId = roomID
  }
}
