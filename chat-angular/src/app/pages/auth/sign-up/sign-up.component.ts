import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm()
  }

   createForm(): void{
    this.signupForm = this.fb.group({
      firstName:['', [Validators.required]],
      lastName:['', [Validators.required]],
    })
   }

   submit(): void {
    const {firstName, lastName } = this.signupForm.value
     console.warn(`First Name: ${firstName}, Last Name : ${lastName}`)
   }

  ngOnInit(): void {
  }

}
