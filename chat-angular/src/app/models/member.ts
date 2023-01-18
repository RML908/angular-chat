export class Member {
  id: number;
  firstName: string;
  lastName: string;

  // @ts-ignore
  constructor({id,firstName, lastName}) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
