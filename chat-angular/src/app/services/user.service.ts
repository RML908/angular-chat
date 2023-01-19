import {EventEmitter, Injectable} from '@angular/core';
import * as db from '../../assets/db.json'
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Member} from "../models/member";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  users: any = (db as any).default
  members: string | undefined
  user?: Object
  invalidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient,
              private router: Router
  ) { this.getCompetitions()}

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

  userLogin(data:Member){
    this.http.get<Member>(`./assets/db.json/?firstName=${data.firstName}&lastName=${data.lastName}`,
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
