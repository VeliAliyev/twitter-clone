import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { map, tap, Observable } from 'rxjs';
import { SignInRequestPayload } from '../payloads/request/sign-in';
import { SignUpPayload } from '../payloads/request/sign-up';
import { SignInResponsePayload } from '../payloads/response/sign-in';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  constructor(private http: HttpClient, private localStorage: LocalStorageService, private router: Router) { }
  
  signUp(payload: SignUpPayload) {
    return this.http.post("http://localhost:8080/auth/sign-up", payload);
  }
  
  signIn(payload: SignInRequestPayload) {
    const self = this;
    return this.http.post<SignInResponsePayload>("http://localhost:8080/auth/sign-in", payload).pipe<SignInResponsePayload>(
      map(response=>{
        self.localStorage.store("accessToken", response.accessToken);
        self.localStorage.store("refreshToken", response.refreshToken);
        this.localStorage.store('expiresAt', response.expiresAt);
        self.localStorage.store("username", response.username);
        self.localStorage.store("isLoggedIn", true);
        return response;
      })
    )
  }
  
  logout() {
    const self = this;
    return this.http.post("http://localhost:8080/auth/logout", {username: this.getUsername(), refreshToken: this.localStorage.retrieve("refreshToken")}).subscribe({complete(){

      self.localStorage.clear('accessToken');
      self.localStorage.clear('refreshToken');
      self.localStorage.clear('expiresAt');
      self.localStorage.clear('username');
      self.localStorage.store('isLoggedIn', false);
      self.router.navigateByUrl("");
    }});
  }
  
  getUsername(){
    return this.localStorage.retrieve("username");
  }
  
  isLoggedIn() {
    return this.localStorage.retrieve("isLoggedIn");
  }

  refreshAccessToken(): Observable<SignInResponsePayload> {
    return this.http.post<SignInResponsePayload>("http://localhost:8080/auth/refresh-token", {
      refreshToken: this.localStorage.retrieve("refreshToken"),
      username: this.getUsername()
    }).pipe(tap(response=>{
      this.localStorage.store('accessToken', response.accessToken);
      this.localStorage.store('expiresAt', response.expiresAt);
  }))
  }

  getAccessToken() {
    return this.localStorage.retrieve("accessToken");
  }
  
  findAllUsernames(): Observable<String[]> {
    return this.http.get<String[]>("http://localhost:8080/auth/usernames");
  }
}
