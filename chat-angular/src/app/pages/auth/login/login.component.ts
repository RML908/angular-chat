import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Member} from "../../../models/member";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import  {users, channels} from "../../../../assets/data" ;
import {Observable, Subscription} from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

   loginForm!: FormGroup;
   users:any;
   // currentUser: any;
   firstName?:string;
   subscriptions:  Subscription[] = [];
   loading:boolean = false;
   @Output() currentUserEmit = new EventEmitter();
   user: typeof users;
   userId:any;
  constructor(
              private fb: FormBuilder,
              private userService: UserService,
              private route:Router
              ) {
    this.user = users
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required]
    })
    // this.getUsers()

  }
    // getUsers(){
    // this.userService.getUsers()
    //   .subscribe(users =>
    //     this.users = users)
    //   console.log(this.users);
    // }

   get form(){return this.loginForm.controls}

  onSubmit(){
    if(this.loginForm.valid){
      this.loading = true
    const {firstName, lastName} = this.loginForm.value
      let currentUser = this.user.find((user: { firstName: string; }) => user.firstName == firstName.toString())
      this.user = this.user.filter((user: { firstName: string; }) => user.firstName !== firstName.toString())
      if(currentUser){
        this.route.navigate(['/chat'],{state:{data:currentUser}})

      }
      else {console.warn(`The firstName:${firstName}: didn't match${currentUser}`)
        }
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
