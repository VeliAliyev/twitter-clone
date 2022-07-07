import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TweetRequestPayload } from './tweet-request.payload';
import { TweetResponsePayload } from './tweet-response.payload';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private http: HttpClient) { }

  tweet(payload: TweetRequestPayload){
    return this.http.post("http://localhost:8080/tweet/post", payload);
  }

  getAllTweets(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:8080/tweet/tweets");
  }

  getAll(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:8080/tweet/all");
  }

  getTweet(tweetId: number): Observable<TweetResponsePayload>{
    return this.http.get<TweetResponsePayload>("http://localhost:8080/tweet/" + tweetId);
  }

  like(tweetId: number){
    return this.http.post("http://localhost:8080/tweet/like", {tweetId: tweetId})
  }

  isLiked(tweetId: number):Observable<boolean>{
    return this.http.post<boolean>("http://localhost:8080/tweet/isLiked", {tweetId: tweetId});
  }

  

}
