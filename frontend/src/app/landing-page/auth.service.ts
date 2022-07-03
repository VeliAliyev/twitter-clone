import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { map, Observable } from 'rxjs';
import { SignInRequestPayload } from './sign-in/sign-in-request.payload';
import { SignInResponsePayload } from './sign-in/sign-in-response.payload';
import { SignUpPayload } from './sign-up/sign-up.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
   
   }

  signUp(payload:SignUpPayload) : Observable<any>{
    return this.http.post<any>("http://localhost:8080/api/auth/sign-up", payload);
  }

  signIn(payload:SignInRequestPayload) : Observable<SignInResponsePayload>{
    const self = this;
    return this.http.post<SignInResponsePayload>("http://localhost:8080/api/auth/sign-in", payload).pipe<SignInResponsePayload>(
      map(response=>{
        self.localStorage.store("accessToken", response.accessToken);
        self.localStorage.store("refreshToken", response.refreshToken);
        self.localStorage.store("username", response.username);
        return response;
      })
    )
    
  }

  findAllUsernames() : Observable<String[]>{
    return this.http.get<String[]>("http://localhost:8080/api/auth/usernames");
  }

}
