import { Component, Input, OnInit } from '@angular/core';
import { TweetResponsePayload } from '../tweet-response.payload';

@Component({
  selector: 'app-retweet',
  templateUrl: './retweet.component.html',
  styleUrls: ['./retweet.component.css']
})
export class RetweetComponent implements OnInit {
  @Input() tweet: TweetResponsePayload;
  constructor() {
    this.tweet = {
      id: 0,
      firstName: "",
      lastName: "",
      username: "",
      duration: "",
      tweetText: "",
      replyCounter: 0,
      retweetCounter: 0,
      likeCounter: 0
      }
   }

  ngOnInit(): void {
  }
  retweet(){
    console.log("Retweet")
    document.getElementById('myDropdown')!.classList.toggle("show");
  }
}
