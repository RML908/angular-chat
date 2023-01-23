import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Member} from "../../../models/member";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import  {users, channels} from "../../../../assets/data" ;
import {first} from "rxjs/operators";
import {Observable, Subscription} from "rxjs";
import {User} from "stream-chat";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

   loginForm!: FormGroup;
   users:any;
   currentUser: any;
   firstName?:string;
   subscriptions:  Subscription[] = [];
   loading:boolean = false;
   user:any
   userId:any;
  constructor(
              private fb: FormBuilder,
              private userService: UserService,
              private route:Router
              ) {
  }
  ngOnInit(): void {
     this.userId = this.userService.currentUser.subscribe(data =>{
       console.log(data?.id);
     })
    this.loginForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required]
    })
    this.getUsers()

  }
    getUsers(){
    this.userService.getUsers()
      .subscribe(users =>
        this.users = users)
    }
   get form(){return this.loginForm.controls}

  onSubmit(){
    if(this.loginForm.valid){
      this.loading = true
    const {firstName, lastName} = this.loginForm.value
    this.subscriptions.push(
      this.userService.login(firstName, lastName,).subscribe(success => {
      if(success){
        let id =
        this.route.navigate(['/chat'])
      }else {
        console.warn("failed to login")
      }
      })
    )
  }
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
    // onSubmit(){
    //
    // if(this.loginForm.invalid){
    //   return;
    // }
    // this.userService.login(this.form['firstName'].value, this.form['lastName'].value)
    //
    //   .pipe(first()).subscribe( {
    //    next: (data:Member) =>  (this.currentUser = data),
    //   error: (err) => console.log(err),
    //   complete:() => ("completed")
    //   })
    //   this.currentUser = this.users.find((user: { firstName: any; }) => user.firstName === this.form['firstName'].value)
    //   this.users = this.users.filter((user: { firstName: any; }) => user.firstName !== this.form['firstName'].value)
    //
    //   if(this.currentUser){
    //     console.log(this.currentUser);
    //     console.log("current user")
    //   }else{
    //     ('something wrong')
    //   }
    // }



}
