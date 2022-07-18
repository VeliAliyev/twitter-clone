import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TweetInput } from '../tweet-input';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent extends TweetInput implements OnInit {

  @Input() footer: Boolean = true;
  @Input() counters: Boolean = false;

  constructor(private router: Router) { 
    super();
  }

  ngOnInit(): void {
  }

  goToTweet(tweetId: number){
    
    this.router.navigate(["/tweet/" + tweetId], {state: {data: this.tweet}});
  }

}
