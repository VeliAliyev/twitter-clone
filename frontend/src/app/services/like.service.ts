import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  isLiked(tweetId: number): Observable<boolean>{
    return this.http.post<boolean>("http://localhost:8080/likes/is-liked", {tweetId: tweetId});
  }

  like(tweetId: number){
    return this.http.post("http://localhost:8080/likes/like", {tweetId: tweetId})
  }

  getLikeCounter(tweetId: number): Observable<number>{
    return this.http.get<number>("http://localhost:8080/likes/like-counter/" + tweetId)
  }
}
