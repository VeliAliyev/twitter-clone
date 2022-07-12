import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TweetResponsePayload } from '../home-page/tweet-response.payload';
import { TweetService } from '../home-page/tweet.service';
import { AuthService } from '../landing-page/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  url: string;
  tweets: Array<TweetResponsePayload>;
  username: string;
  navigationSubscription;
  constructor(private router: Router, private tweetService: TweetService, private authService: AuthService) {
    this.url = this.router.url;
    this.tweets = new Array();
    this.username = this.authService.getUsername();
    
    this.navigationSubscription = this.router.events.subscribe((event: any)=>{
      if(event instanceof NavigationEnd){
        if(this.router.url === "/profile/tweets"){
          this.fetchTweets();
        }
        else if(this.router.url === "/profile/retweets"){
          this.fetchRetweets();
        }
        else if(this.router.url === "/profile/replies"){
          this.fetchReplies();
        }

        else if(this.router.url === "/profile/likes"){
          this.fetchLikes();
        }

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

  fetchTweets(){
    const self = this;
    this.tweetService.getTweetsByUsername(this.username).subscribe(response=>self.tweets = response);
  }

  fetchRetweets(){
    const self = this;
    this.tweetService.getRetweetsByUsername(this.username).subscribe(response=>self.tweets = response);
  }

  fetchReplies(){
    const self = this;
    this.tweetService.getRepliesByUsername(this.username).subscribe(response=>self.tweets = response);
  }

  fetchLikes(){
    const self = this;
    this.tweetService.getLikesByUsername(this.username).subscribe(response=>self.tweets = response);
  }
}
