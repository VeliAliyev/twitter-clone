import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RetweetResponsePayload } from './retweet/retweet-response.payload';
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

  retweet(tweetId: number){
    return this.http.post("http://localhost:8080/tweet/retweet", {tweetId: tweetId});
  }

  quote(quotePayload: TweetRequestPayload) {
    return this.http.post("http://localhost:8080/tweet/post", quotePayload);
  }

  // getRetweets(): Observable<Array<RetweetResponsePayload>>{
  //   return this.http.get<Array<RetweetResponsePayload>>("http://localhost:8080/tweet/retweets");
  // }

  // getRetweetsForTweet(tweetId: number): Observable<Array<RetweetResponsePayload>>{
  //   return this.http.get<Array<RetweetResponsePayload>>("http://localhost:8080/tweet/retweets-for-tweet/" + tweetId);
  // }

  // getTweets(): Observable<Array<TweetResponsePayload>>{
  //   return this.http.get<Array<TweetResponsePayload>>("http://localhost:8080/tweet/tweets");
  // }

  getRepliesForTweet(tweetId: number): Observable<Array<TweetResponsePayload>>{
    return this.http.get<Array<TweetResponsePayload>>("http://localhost:8080/tweet/replies-for-tweet/" + tweetId);
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
