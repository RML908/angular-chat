import {EventEmitter, Injectable} from '@angular/core';
import {users, channels}  from '../../assets/data'
import {Member} from "../models/member";
import {BehaviorSubject, Observable, tap} from "rxjs";


@Injectable({
  providedIn: 'root'
})


export class UserService {

  users: any = {users};
  members: string | undefined;
  user?: Object;
  invalidUserAuth = new EventEmitter<boolean>(false);
  usersUrl = 'api/users';
  currentUserSubject: BehaviorSubject<Member | null>;
  currentUser: Observable<Member | null>;


  constructor()
  {
    const currentUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<Member |null>
    (JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }



 get userValue(): any {
    return this.currentUserSubject.value
 }




      // TODO: This comment for int future works for login and serve the socket engie
  // login(firstName:string, lastName:string): Observable<any>{
  //   return this.http.post<any>(this.usersUrl,{firstName,lastName})
  //     .pipe(map(({res}) => {
  //       let user: any = {
  //         firstName: firstName,
  //         lastName:  lastName,
  //
  //       };
  //       this.socketService.setupSocketConnection(firstName,lastName)
  //       localStorage.setItem('currentUser', JSON.stringify(user))
  //
  //       // @ts-ignore
  //       this.currentUser = localStorage.getItem('currentUser', JSON.stringify(user));
  //       console.log(this.currentUser);
  //       this.currentUserSubject.next(user)
  //
  //       return user;
  //
  //       })
  //     );
  // }

  //  usersignUp(data:any){
  //   this.http.post('./assets/db.json/users',data,{observe:'response'})
  //     .subscribe((result) =>{
  //       if(result){
  //         localStorage.setItem('member', JSON.stringify(result.body))
  //         this.router.navigate(['/'])
  //       }
  //     })
  //  }



  // getById(id:any):Observable<Member> {
  //   const url =`${this.usersUrl}/${id}`
  //   return this.http.get<Member>(url).pipe(
  //   tap(_ => console.log(`id==${id}`))
  //   );
  // }

// getUsers(): Observable<any>{
//  return this.http.get<any>(this.usersUrl)
// .pipe(
//  tap(result => localStorage.setItem('result', JSON.stringify(result)))
//   )
//   }
// }

//  userAuthReload(){
//   if(localStorage.getItem('currentUser')){
//     this.router.navigate(['/'])
//   }
// }

}

