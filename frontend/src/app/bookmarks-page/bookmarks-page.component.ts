import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TweetResponsePayload } from '../home-page/tweet-response.payload';
import { TweetService } from '../home-page/tweet.service';
import { AuthService } from '../landing-page/auth.service';

@Component({
  selector: 'app-bookmarks-page',
  templateUrl: './bookmarks-page.component.html',
  styleUrls: ['./bookmarks-page.component.css']
})
export class BookmarksPageComponent implements OnInit {

  tweets: Array<TweetResponsePayload>;
  navigationSubscription;
  constructor(private tweetService: TweetService, private authService: AuthService, private router: Router) { 
    this.tweets = new Array();
    this.tweetService.getBookmarks(this.authService.getUsername()).subscribe(bookmarks => this.tweets = bookmarks);
    
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
