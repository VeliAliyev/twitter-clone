import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  payload: FormData;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.payload = new FormData;
    this.payload.append("username", this.authService.getUsername());
  }

  getUser(username: string): Observable<User>{
    return this.http.get<User>("http://localhost:8080/user/" + username);
  }

  getBannerPicture(username: string){
    return this.http.get("http://localhost:8080/user/banner-picture/get/" + username,  { responseType: 'blob' });
  }

  getProfilePicture(username: string){
    return this.http.get("http://localhost:8080/user/profile-picture/get/" + username,  { responseType: 'blob' });
  }

  saveBannerPicture(bannerPicture: File){
    this.payload.append("bannerPicture", bannerPicture, bannerPicture.name);
    return this.http.post("http://localhost:8080/user/banner-picture/save", this.payload);
  }
  
  saveProfilePicture(profilePicture: File){
    this.payload.append("profilePicture", profilePicture, profilePicture.name);
    return this.http.post("http://localhost:8080/user/profile-picture/save", this.payload);
  
  }

  editProfile(payload: any){
    console.log(payload)
    return this.http.post("http://localhost:8080/user/edit-profile", payload)
  }

}
