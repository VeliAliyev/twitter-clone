import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OverlayForm } from 'src/app/overlay-form';
import { PostResponse } from 'src/app/payloads/response/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-tweet-page',
  templateUrl: './tweet-page.component.html',
  styleUrls: ['./tweet-page.component.css']
})
export class TweetPageComponent extends OverlayForm implements OnInit {

  replies: Array<PostResponse>;
  isFocus: Boolean = false;
  navigationSubscription;

  constructor(private router: Router, private postService: PostService) { 
    super();
    //https://medium.com/ableneo/how-to-pass-data-between-routed-components-in-angular-2306308d8255
    this.tweet = history.state.data;
    console.log(history.state.data);
    this.replies = new Array();

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
    this.postService.getRepliesForTweet(this.tweet.id).subscribe(response => this.replies = response);
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  focus(status: boolean){
    this.isFocus = status;
  }

  reply(){

    this.payload = {
      text: this.form.get("text")?.value,
      tweetId: this.tweet.id,
      type: "REPLY"
    }

    const self = this;
    this.postService.tweet(this.payload).subscribe({
      complete(){
        self.form.reset();
        self.router.navigate(["/tweet/" + self.tweet.id], {state: {data: self.tweet}});
      },
      error(error){console.log(error)}
    });
  }
}