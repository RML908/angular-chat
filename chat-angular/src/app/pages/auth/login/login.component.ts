import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm()
  }

   createForm(): void {
    this.loginForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required]
    })
   }

   submit(): void {
    const{firstName, lastName} = this.loginForm.value
     console.log(`FirstName: ${firstName}, lasName: ${lastName}`);
   }


  ngOnInit(): void {
  }


}
