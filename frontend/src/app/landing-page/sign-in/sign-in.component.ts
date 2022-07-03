import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { SignInRequestPayload } from './sign-in-request.payload';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  signInForm: FormGroup;
  signInRequestPayload: SignInRequestPayload;
  constructor(private activatedRoute:ActivatedRoute, private toastr: ToastrService, private authService: AuthService, private router: Router) {

    this.signInForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })

    this.signInRequestPayload = {
      username: "",
      password: ""
    }

   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params =>{
      if(params['registered'] !== undefined && params['registered'] === "true"){
        this.toastr.success("Signup Successful");
        console.log("Sign Up Successful");
      }
    })
  }

  signIn(){
    const self = this;
    this.signInRequestPayload.username = this.signInForm.get("username")?.value;
    this.signInRequestPayload.password = this.signInForm.get("password")?.value;
    this.authService.signIn(this.signInRequestPayload).subscribe({
      next(response){
        console.log(response);
        self.router.navigate(["/home"], {queryParams: {signedIn: "true"}});

      },
      complete(){},
      error(error){
        self.toastr.error("Wrong Username or Password");
        console.log(error)
      }
    });
  }
}
