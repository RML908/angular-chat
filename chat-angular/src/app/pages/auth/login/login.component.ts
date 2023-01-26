import {Component,OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import  {users} from "../../../../assets/data" ;
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   loginForm!: FormGroup;
   user: typeof users;


  constructor(
              private fb: FormBuilder,
              private route:Router,
              private userService:UserService
              )
  {
    this.user = users
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required]
    })

  }

   get form(){return this.loginForm.controls}

  onSubmit(){
    if(this.loginForm.valid){
    const {firstName, lastName} = this.loginForm.value
      let currentUser = this.user.find((user: { firstName: string; }) => user.firstName == firstName.toString())
      if(currentUser){
        localStorage.setItem('currentUser',JSON.stringify(currentUser))
        this.route.navigate(['/chat'],{state:{data:currentUser}})

      }
      else {console.warn(`The firstName:${firstName}: didn't match${currentUser}`)
        }
    }
  }



}
