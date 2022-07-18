import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpPayload } from 'src/app/payloads/request/sign-up';
import { AuthService } from 'src/app/services/auth.service';
import { usernameValidator } from 'src/app/validators/username';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  payload: SignUpPayload;
  constructor(private authService: AuthService, private router: Router,) {

    this.form = new FormGroup({
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

    this.payload = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    }
  }

  ngOnInit(): void {
  }

  signUp() {
    this.payload.firstName = this.form.get('firstName')?.value;
    this.payload.lastName = this.form.get('lastName')?.value;
    this.payload.username = this.form.get('username')?.value;
    this.payload.email = this.form.get('email')?.value;
    this.payload.password = this.form.get('password')?.value;
    const self = this;
    this.authService.signUp(this.payload).subscribe({
      complete() {
        self.router.navigate(['/sign-in'], { queryParams: { registered: 'true' } });
      },
      error(error) {
        console.log(error);
      }
    })
  }

  get username() {
    return this.form.controls['username'];
  }

}
