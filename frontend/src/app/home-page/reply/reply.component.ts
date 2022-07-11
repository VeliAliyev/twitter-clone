import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TweetRequestPayload } from '../tweet-request.payload';
import { TweetResponsePayload } from '../tweet-response.payload';
import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  @Input() tweet: TweetResponsePayload;
  overlay:BehaviorSubject<boolean>;
  replyPayload: TweetRequestPayload; 
  replyForm: FormGroup;
  
  constructor(private tweetService: TweetService, private router: Router) {
    this.overlay=new BehaviorSubject(false);
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
      this.replyPayload = {
        text: "",
        tweetId: 0,
        type: ""
      }
  
      this.replyForm = new FormGroup({
        text: new FormControl("")
      })
  }

  ngOnInit(): void {
    
  }
  
  reply(){
    this.replyPayload.text = this.replyForm.get("text")?.value;
    this.replyPayload.tweetId = this.tweet.id;
    this.replyPayload.type = "REPLY";
    const self = this;
    this.tweetService.tweet(this.replyPayload).subscribe({
      next(response){console.log(response)},
      complete(){
        self.replyForm.reset();
        self.router.navigateByUrl("tweet/" + self.tweet.id);
      },
      error(error){console.log(error)}
    });
  }

  hideOverlay(event:Event){
    if((event.target as HTMLElement).classList.contains("overlay"))
      this.overlay.next(false);
  
  }

  showOverlay(){
    this.overlay.next(true);
  }

}


