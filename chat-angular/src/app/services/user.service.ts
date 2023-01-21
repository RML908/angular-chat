import {EventEmitter, Injectable} from '@angular/core';
import {users, channels}  from '../../assets/data'
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Member} from "../models/member";
import {BehaviorSubject, Observable, Subscription, tap} from "rxjs";
import {map} from  "rxjs/operators"

@Injectable({
  providedIn: 'root'
})

export class UserService {

  users: any = {users};
  members: string | undefined;
  user?: Object;
  invalidUserAuth = new EventEmitter<boolean>(false);
  usersUrl = 'api/users';
  currentUser!: Observable<any>;
  currentUserSubject: BehaviorSubject<any>
  constructor(private http: HttpClient,
              private router: Router
  ) { this.currentUserSubject = new BehaviorSubject<Member>
    (JSON.parse(localStorage.getItem('currentUser')!))
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(firstName:string, lastName:string): Observable<any>{
    return this.http.post<any>(this.usersUrl,{firstName,lastName})
      .pipe(map(user =>{
        if(user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user))
          this.currentUserSubject.next(user)
        }
        return user;

        }));


  }


  getCompetitions() {
    return this.http.get('./assets/db.json').subscribe(

      data =>{
        this.user = data
        this.members = JSON.stringify({...data})
      }
    );
  }
   usersignUp(data:any){
    this.http.post('./assets/db.json/users',data,{observe:'response'})
      .subscribe((result) =>{
        if(result){
          localStorage.setItem('member', JSON.stringify(result.body))
          this.router.navigate(['/'])
        }
      })
   }
  getUsers(): Observable<any>{
    return this.http.get<any>(this.usersUrl)
      .pipe(
        tap(result => console.log(result))
      )
      }

  userLogin(data:Member){
    this.http.get<Member>(`./assets/data.ts/?firstName=${data.firstName}&lastName=${data.lastName}`,
      {observe:"response"}
    ).subscribe((result) =>{
      if(result && result.body){
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/chat'])
        this.invalidUserAuth.emit(false)
      }else {
        this.invalidUserAuth.emit(true)
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }

}
