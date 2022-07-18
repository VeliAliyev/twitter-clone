import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PostResponse } from 'src/app/payloads/response/post';
import { AuthService } from 'src/app/services/auth.service';
import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-bookmark-page',
  templateUrl: './bookmark-page.component.html',
  styleUrls: ['./bookmark-page.component.css']
})
export class BookmarkPageComponent implements OnInit {

  tweets: Array<PostResponse>;
  navigationSubscription;
  constructor(private bookmarkService: BookmarkService, private authService: AuthService, private router: Router) { 
    this.tweets = new Array();
    this.bookmarkService.getBookmarks(this.authService.getUsername()).subscribe(bookmarks => this.tweets = bookmarks);
    
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      
      if(event instanceof NavigationEnd){
        this.router.navigated = false;
      }
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

}
