import {EventEmitter, Injectable} from '@angular/core';
import * as db from '../../assets/db.json'
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  users: any = (db as any).default
  invalidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient,
              private router: Router
  ) { }

  userLogin(data:any){
    this.http.get<any>(`this.users = ${data.email}&password = ${data.password}`,
      {observe:"response"}
    ).subscribe((result) =>{
      if(result && result.body?.length){
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.router.navigate(['/'])
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
