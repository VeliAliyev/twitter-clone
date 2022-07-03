import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SignUpPayload } from './sign-up.payload';
import { usernameValidator } from './username.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  signUpPayload: SignUpPayload;
  constructor(private authService: AuthService, private router: Router, ) {

     this.signUpForm = new FormGroup({
       firstName: new FormControl("", Validators.required),
       lastName: new FormControl("", Validators.required),
       username: new FormControl("", {
         validators: [Validators.required],
         asyncValidators: [usernameValidator(this.authService)],
         updateOn: "blur"
       }),
       email: new FormControl("", [Validators.required, Validators.email]),
       password: new FormControl("", Validators.required)
     });

    this.signUpPayload = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    }
   }

  ngOnInit(): void {
  }

  signUp(){
    this.signUpPayload.firstName = this.signUpForm.get('firstName')?.value;
    this.signUpPayload.lastName = this.signUpForm.get('lastName')?.value;
    this.signUpPayload.username = this.signUpForm.get('username')?.value;
    this.signUpPayload.email = this.signUpForm.get('email')?.value;
    this.signUpPayload.password = this.signUpForm.get('password')?.value;
    const self = this;
    this.authService.signUp(this.signUpPayload).subscribe({
      next(response){
        self.router.navigate(['/sign-in'], {queryParams:{registered : 'true'}});
      },
      complete(){},
      error(error){
        console.log(error);
      }
    })
  }

  get username(){
    return this.signUpForm.controls['username'];
  }

}
