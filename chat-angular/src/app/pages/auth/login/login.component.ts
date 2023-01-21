import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Member} from "../../../models/member";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import  {users, channels} from "../../../../assets/data" ;
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   loginForm!: FormGroup;
   users:Member[] = []

  constructor(
              private fb: FormBuilder,
              private userService: UserService,
              private route:Router
              ) {
  }

    getUsers(){
    this.userService.getUsers()
      .subscribe(users => this.users = users)
    }
   get form(){return this.loginForm.controls}

    onSubmit(){
    if(this.loginForm.invalid){
      return;
    }
    this.userService.login(this.form['firstName'].value, this.form['lastName'].value)
      .pipe(first()).subscribe( data =>{this.route.navigate(['/chat'])
      }, error =>  {
      console.log(error);
    })
    }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
         firstName:['', Validators.required],
         lastName:['', Validators.required]
       })


  }


}
