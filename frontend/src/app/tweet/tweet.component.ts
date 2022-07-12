import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TweetResponsePayload } from '../home-page/tweet-response.payload';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  @Input() tweet: TweetResponsePayload;
  @Input() footer: Boolean = true;
  @Input() counters: Boolean = false;

 
  constructor(private router: Router) { 
    this.tweet = {
      id: 0,
      firstName: "",
      lastName: "",
      username: "",
      duration: "",
      tweetText: "",
      replyCounter: 0,
      retweetCounter: 0,
      likeCounter: 0,
    
      }
      
      
  }

  ngOnInit(): void {
  }

 


  goToTweet(tweetId: number){
    this.router.navigateByUrl("/tweet/" + tweetId);
  }
}
