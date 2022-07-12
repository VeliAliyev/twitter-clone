import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TweetRequestPayload } from '../home-page/tweet-request.payload';
import { TweetResponsePayload } from '../home-page/tweet-response.payload';
import { TweetService } from '../home-page/tweet.service';

@Component({
  selector: 'app-tweet-page',
  templateUrl: './tweet-page.component.html',
  styleUrls: ['./tweet-page.component.css']
})
export class TweetPageComponent implements OnInit {
  tweetId: number;
  tweet: TweetResponsePayload;
  isFocus: Boolean = false;
  replies: Array<TweetResponsePayload>;
  replyPayload: TweetRequestPayload; 
  replyForm: FormGroup;
  navigationSubscription;

  constructor(private activatedRoute: ActivatedRoute, private tweetService: TweetService, private router: Router) { 
    this.tweetId = this.activatedRoute.snapshot.params["id"];
    this.tweet = {
      id: this.tweetId,
      firstName: "",
      lastName: "",
      username: "",
      duration: "",
      tweetText: "",
      replyCounter: 0,
      retweetCounter: 0,
      likeCounter: 0,
    }

    this.replies = new Array();
    
    this.replyPayload = {
      text: "",
      tweetId: 0,
      type: ""
    }

    this.replyForm = new FormGroup({
      text: new FormControl("")
    })

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    
    this.navigationSubscription = this.router.events.subscribe((event: any)=>{
      if(event instanceof NavigationEnd){
        this.router.navigated = false;
      }
      
    })

  }

  ngOnInit(): void {
    this.fetchTweetAndReplies();
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  fetchTweetAndReplies(){
    const self = this;
    this.tweetService.getTweet(this.tweetId).subscribe(tweet => self.tweet = tweet);
    this.tweetService.getRepliesForTweet(this.tweetId).subscribe(replies => self.replies = replies);
  }

  focus(status: boolean){
    this.isFocus = status;
  }

  reply(){
    this.replyPayload.text = this.replyForm.get("text")?.value;
    this.replyPayload.tweetId = this.tweetId;
    this.replyPayload.type = "REPLY";
    const self = this;
    this.tweetService.tweet(this.replyPayload).subscribe({
      next(response){console.log(response)},
      complete(){
        self.replyForm.reset();
        self.router.navigateByUrl("tweet/" + self.tweetId);
      },
      error(error){console.log(error)}
    });
  }
}
