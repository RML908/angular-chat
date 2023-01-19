import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "stream-chat";
import {Member} from "../../../models/member";
import {UserService} from "../../../services/user.service";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder,
              private member:UserService

  ) {
    this.createForm()

  }

   createForm(): void{
    this.signupForm = this.fb.group({
      firstName:['', [Validators.required]],
      lastName:['', [Validators.required]],
    })
   }

   submit(data:any) {
     console.log("submit",data);
     this.member.usersignUp(data)
    const {firstName, lastName } = this.signupForm.value
     console.warn(`First Name: ${firstName}, Last Name : ${lastName}`)
   }

  ngOnInit(): void {
  }

}
