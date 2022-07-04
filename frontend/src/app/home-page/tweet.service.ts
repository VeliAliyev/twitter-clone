import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TweetRequestPayload } from './tweet-request.payload';

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

}
