import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostResponse } from '../payloads/response/post';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  
  constructor(private http: HttpClient) { }
  
  isBookmarked(tweetId: number): Observable<boolean>{
    return this.http.post<boolean>("http://localhost:8080/bookmarks/is-bookmarked", {tweetId: tweetId});
  }
  
  bookmark(tweetId: number){
    return this.http.post("http://localhost:8080/bookmarks/bookmark", {tweetId: tweetId})
  }
  
  getBookmarks(username: string): Observable<Array<PostResponse>> {
    return this.http.get<Array<PostResponse>>("http://localhost:8080/bookmarks/" + username);
  }
}
