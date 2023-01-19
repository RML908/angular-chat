import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Member} from "../../../models/member";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
              private fb: FormBuilder,
              private user: UserService,
              private route:Router
              ) {
    this.createForm()
  }

   createForm(): void {
    this.loginForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required]
    })
   }

   submit(data:Member): void {
    this.user.userLogin(data)
     // if(data){
     //   this.route.navigate(['/'])
     // }
    const{firstName, lastName} = this.loginForm.value
     console.log(`FirstName: ${firstName}, lasName: ${lastName}`);
   }


  ngOnInit(): void {
  }


}
