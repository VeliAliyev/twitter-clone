import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRequest } from '../payloads/request/post';
import { PostResponse } from '../payloads/response/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(private http: HttpClient) { }
  
  
  tweet(payload: PostRequest) {
    return this.http.post("http://localhost:8080/posts/create", payload);
  }
  
  getRepliesForTweet(tweetId: number): Observable<Array<PostResponse>>{
    return this.http.get<Array<PostResponse>>("http://localhost:8080/posts/replies-for-tweet/" + tweetId);
  }
  
  getTweetsByUsername(username: string): Observable<Array<PostResponse>>{
    return this.http.get<Array<PostResponse>>("http://localhost:8080/posts/tweets-by-username/" + username);
  }
  
  getRetweetsByUsername(username: string): Observable<Array<PostResponse>> {
    return this.http.get<Array<PostResponse>>("http://localhost:8080/posts/retweets-by-username/" + username);
  }
  
  getRepliesByUsername(username: string): Observable<Array<PostResponse>> {
    return this.http.get<Array<PostResponse>>("http://localhost:8080/posts/replies-by-username/" + username);
  }
  
  getLikesByUsername(username: string): Observable<Array<PostResponse>> {
    return this.http.get<Array<PostResponse>>("http://localhost:8080/posts/liked-by-username/" + username);
  }
  
  getAll(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>("http://localhost:8080/posts");
  }
}
