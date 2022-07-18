import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../landing-page/auth.service';
import { User } from '../user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  saveProfilePicture(profilePicture: File) {

    const fd = new FormData();
    fd.append("profilePicture", profilePicture, profilePicture.name);
    fd.append("username", this.authService.getUsername());

    return this.http.post("http://localhost:8080/user/profilePicture/save", fd);
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>("http://localhost:8080/user/" + username);
  }

  getProfilePicture(username:string): Observable<any> {
    return this.http.get("http://localhost:8080/user/profilePicture/get/" + username,  { responseType: 'blob' });
  }
  getBannerPicture(username:string): Observable<any> {
    return this.http.get("http://localhost:8080/user/bannerPicture/get/" + username,  { responseType: 'blob' });
  }

  saveBannerPicture(bannerPicture: File) {

    const fd = new FormData();
    fd.append("bannerPicture", bannerPicture, bannerPicture.name);
    fd.append("username", this.authService.getUsername());

    return this.http.post("http://localhost:8080/user/bannerPicture/save", fd);
  }
}
