import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetweetService {
  
  constructor(private http: HttpClient) { }
  
  retweet(tweetId: number) {
    return this.http.post("http://localhost:8080/retweets/retweet", {tweetId: tweetId});
  }

  isRetweeted(tweetId: number): Observable<boolean>{
    return this.http.post<boolean>("http://localhost:8080/retweets/is-retweeted", {tweetId: tweetId});
  }
}
