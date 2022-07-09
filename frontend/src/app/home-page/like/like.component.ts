import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TweetResponsePayload } from '../tweet-response.payload';
import { TweetService } from '../tweet.service';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart }  from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  @Input() tweet: TweetResponsePayload;
  isLiked: BehaviorSubject<boolean>;
  faHeart = faHeart;
  faSolidHeart = faSolidHeart;
  constructor(private tweetService: TweetService, private router: Router) {

    this.isLiked = new BehaviorSubject(false);

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
    
    console.log("TWEET ID LIKED : "+this.tweet.id);
    const self = this;
    this.tweetService.isLiked(this.tweet.id).subscribe(isLiked=>{self.isLiked.next(isLiked);
    console.log(isLiked)});
  }


  like(tweetId: number){
    const self = this;
    this.tweetService.like(tweetId).subscribe({
      next(response){console.log(response)},
      complete(){
        self.tweetService.getTweet(tweetId).subscribe(tweet=>{self.tweet.likeCounter = tweet.likeCounter;});
        self.tweetService.isLiked(tweetId).subscribe(isLiked=>self.isLiked.next(isLiked));
        
        self.router.navigateByUrl(self.router.url);
      },
      error(error){console.log(error)}
    })
  }

}
