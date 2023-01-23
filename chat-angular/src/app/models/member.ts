export class Member {
   id:number;
   firstName: string;
   lastName: string;
   image:null;
   roomId: {
      "1": string,
      "2": string,
      "3": string
  }

  // @ts-ignore
  constructor({id,firstName, lastName, image, roomId}) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.image = image
    this.roomId = roomId
  }
}
