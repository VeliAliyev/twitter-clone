import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../user-model';
import { SignInRequestPayload } from './sign-in/sign-in-request.payload';
import { SignInResponsePayload } from './sign-in/sign-in-response.payload';
import { SignUpPayload } from './sign-up/sign-up.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private _username: BehaviorSubject<string> = new BehaviorSubject<string>(this.getUsername());
  public username: Observable<string> = this._username.asObservable();

  constructor(private http: HttpClient, private localStorage: LocalStorageService, private router: Router) {
   
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
        self.localStorage.store("isLoggedIn", true);
        this._username.next(response.username);
        return response;
      })
    )
    
  }

  findAllUsernames() : Observable<String[]>{
    return this.http.get<String[]>("http://localhost:8080/api/auth/usernames");
  }

  getAccessToken(){
    return this.localStorage.retrieve("accessToken");
  }

  refreshAccessToken(): Observable<any>{
    return this.http.post("http://localhost:8080/api/auth/refresh-token", {
      refreshToken: this.localStorage.retrieve("refreshToken"),
      username: this.localStorage.retrieve("username")
    })
  }

  getUsername(){
    return this.localStorage.retrieve("username");
  }

  isLoggedIn(){
    return this.localStorage.retrieve("isLoggedIn");
  }

  logout(){
    const self = this;
    return this.http.post("http://localhost:8080/api/auth/logout", {username: this.getUsername(), refreshToken: this.localStorage.retrieve("refreshToken")}).subscribe({complete(){

      self.localStorage.clear('accessToken');
      self.localStorage.clear('refreshToken');
      self.localStorage.clear('username');
      self.localStorage.store('isLoggedIn', false);
      self._username.next("");
      self.router.navigateByUrl("");
    }});
  }

}
