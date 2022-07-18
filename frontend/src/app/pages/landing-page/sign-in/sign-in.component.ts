import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignInRequestPayload } from 'src/app/payloads/request/sign-in';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  payload: SignInRequestPayload;
  constructor(private activatedRoute:ActivatedRoute, private toastr: ToastrService, private authService: AuthService, private router: Router) {

    this.form = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })

    this.payload = {
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
    this.payload.username = this.form.get("username")?.value;
    this.payload.password = this.form.get("password")?.value;
    this.authService.signIn(this.payload).subscribe({
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
